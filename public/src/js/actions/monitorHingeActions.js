/**
 * Created by zmz0305 on 11/9/16.
 */
import io from "socket.io-client"
import props from "../props"
export function monitorHinge(){
    return function(dispatch) {
        let socket = io.connect(props.SERVER_ADDRESS);
        socket.on('connect', () => {
            let id = socket.io.engine.id;
            console.log('Connect to socket.io: ' + id);
        })

        socket.on('toolReturned', (data) => {
            let idx = Number(data.data);
            console.log('tool returned: ' + idx);
            dispatch({type: "TOOL_RETURNED", payload: idx});
        })

        socket.on('toolRemoved', (data) => {
            let idx = Number(data.data);
            console.log('tool returned: ' + idx);
            dispatch({type: "TOOL_REMOVED", payload: idx});
        })
    }
}