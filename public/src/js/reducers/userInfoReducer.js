/**
 * Created by zmz0305 on 11/20/16.
 */
export default function reducer(state = {
    total_tools_taken: 0,
    users:[{
        name: "David Koenig",
        taken: []
    }, {
        name: "Jerry Shim",
        taken: []
    }, {
        name: "John Leech",
        taken: []
    }, {
        name: "Reena Patel",
        taken: []
    }],
    err: null
}, action){
    switch(action.type){
        case "FETCH_USER_FULFILLED": {
            return {...state}
        }
        case "FETCH_USER_REJECTED": {
            return {...state, err: action.payload}
        }
    }
    return state;
};