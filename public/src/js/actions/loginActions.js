/**
 * Created by zmz0305 on 11/11/16.
 */
import io from "socket.io-client";
import props from "../props"
export function monitorLogin () {
    return function(dispatch) {
        dispatch({type: "MONITOR_LOGIN", payload: null});
        let socket = io.connect(props.SERVER_ADDRESS);
        socket.on('connect', () => {
            let id = socket.io.engine.id;
            console.log('Connect to socket.io: ' + id);
        })

        socket.on('valid_user_detected', (data) => {
            console.log("uesr login: ");
            console.log(data);
            dispatch({type: "USER_LOGIN", payload: data});
        })
    }
}

export function tick() {
    return function(dispatch) {
        dispatch({type: "TICK", payload: null});
    }
}

export function logout(){
    return function(dispatch) {
        dispatch({type: "USER_LOGOUT", payload: null});
    }
}