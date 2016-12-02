/**
 * Created by zmz0305 on 11/7/16.
 */
import axios from "axios"
import props from "../props"
export function fetchHingeStates() {
    return function(dispatch) {
        dispatch({type: "FETCH_STATE"});
        axios.get("http://"+props.SERVER_ADDRESS+"/initState").then((res)=>{
            dispatch({type: "FETCH_STATE_FULFILLED", payload: res.data.data})
        }).catch((err) => {
            dispatch({type: "FETCH_STATE_REJECTED", payload: err});
        });
        // fnPr.then((data) => {
        //     dispatch({type: "FETCH_STATE_FULFILLED", payload: data})
        // }).catch((err)=>{
        //     dispatch({type: "FETCH_STATE_REJECTED", payload: err})
        // });

    }
}
