/**
 * Created by zmz0305 on 11/7/16.
 */
import props from "../props"
import _ from 'lodash'

export default function reducer (state = {
    status: [], // example: [{id: 1, available: true}]
    users: {"David Koenig" : {name: "David Koenig", taken: []},
        "Jerry Shim": {name: "Jerry Shim", taken: []},
        "John Leech": {name: "John Leech", taken: []},
        "Reena Patel": {name: "Reena Patel", taken: []},
        "Jim Ryan": {name: 'Jim Ryan', taken: []}
    },
    unauthorized: new Set(), // set of unauthorized takeout
    fetching: false,
    fetched: false,
    err: null,
    authorized: false, // current authorized state
    valid_timer: 0, // current logged in countdown timer
    alarm: false, // if alarm is triggered
    user: null, // currently logged in user
    checkoutAmount: 0, // current checked out amount
    checkoutTime: {}, // the time each tool is checked out
    hingeMonitored: false, // if hinge monitor is initialized or not
    loginMonitored: false // if login monitor is initialized or not
}, action) {

    switch (action.type){
        case "FETCH_STATE": {
            return {...state, fetching: true}
        }
        case "FETCH_STATE_PENDING": {
            return {...state, fetching: true};
        }
        case "FETCH_STATE_REJECTED": {
            return {...state, fetching: false, err: action.payload}
        }
        case "FETCH_STATE_FULFILLED": {
            let END_SLOT = 16;
            let res = action.payload.body.return_value;
            let count = 0;
            let hinge_status = new Array(END_SLOT);
            for (let digit = END_SLOT - 1; digit >=0; digit--) {
                let avail = (res&1 === 1);
                if(avail){
                    count += 1;
                }
                hinge_status[digit] = {};
                hinge_status[digit].id = digit;
                hinge_status[digit].available = avail;
                res >>= 1;
            }
            let ret = {
                ...state,
                fetching: false,
                fetched: true,
                checkoutAmount: props.SLOT_AMOUNT - count,
                status: hinge_status,
                err: null
            };
            return ret;
        }
        case "TOOL_REMOVED": {
            let idx = action.payload;
            let newHinge_status = [...state.status];
            let alarm = state.alarm;
            let newCheckOutAmount = state.checkoutAmount + 1;
            let newUnauthorized = new Set(state.unauthorized);
            let newUsers = {...state.users};
            let newCheckoutTime = {...state.checkoutTime};
            newCheckoutTime[idx] = new Date();
            newHinge_status[idx].available = false;
            if(!state.authorized) {
                alarm = true;
                newUnauthorized.add(idx);
            } else {
                let newUser = {...state.users[state.user]};
                newUser.taken = state.users[state.user].taken.concat(idx);
                newUsers[state.user] = newUser;
            }
            let ret = {
                ...state,
                users: newUsers,
                status: newHinge_status,
                alarm: alarm,
                unauthorized:newUnauthorized,
                checkoutAmount: newCheckOutAmount,
                checkoutTime: newCheckoutTime
            };
            return ret;
        }
        case "TOOL_RETURNED": {
            let idx = action.payload;
            let newHinge_status = [...state.status];
            let alarm = state.alarm;
            let newUnauthorized = new Set(state.unauthorized);
            let newCheckOutAmount = state.checkoutAmount - 1;
            let newCheckoutTime = {...state.checkoutTime}
            let newUsers = {...state.users};
            delete newCheckoutTime[idx];
            newHinge_status[idx].available = true;
            if(state.alarm) {
                newUnauthorized.delete(idx);
                if(newUnauthorized.size == 0){
                    alarm = false;
                }
            } else {
                _.forEach(newUsers, (value, key)=>{
                    let i = value.taken.indexOf(idx);
                    if(i != -1){
                        let arr = value.taken;
                        arr.splice(i, 1);
                        value.taken = arr;
                    }
                })


                // let newUser = {...state.users[state.user]};
                // let arr = newUser.taken;
                // let index = arr.indexOf(idx);
                // arr.splice(index, 1);
                // newUser.taken = arr;
                // newUsers[state.user] = newUser;
            }
            return {
                ...state,
                users: newUsers,
                status: newHinge_status,
                alarm: alarm,
                unauthorized: newUnauthorized,
                checkoutAmount: newCheckOutAmount,
                checkoutTime: newCheckoutTime
            };
        }
        case "USER_LOGIN": {
            let data = action.payload;
            let alarm = state.alarm;
            if(!alarm){
                if(state.users[data]){
                    return {
                        ...state,
                        alarm: alarm,
                        authorized: true,
                        user: data,
                        valid_timer: 10
                    }
                }
                console.log('invalid user scanned!');
                return state;

            } else {
                console.log('Cannot login when alarmed!');
            }
        }

        case "TICK": {
            let time = state.valid_timer - 1;
            return {
                ...state,
                valid_timer: time
            }
        }

        case "USER_LOGOUT": {
            return {
                ...state,
                authorized: false,
                user: null
            }
        }

        case "MONITOR_HINGE": {
            return {
                ...state,
                hingeMonitored: true
            }
        }

        case "MONITOR_LOGIN": {
            return {
                ...state,
                loginMonitored: true
            }
        }
    }
    return state;
}
