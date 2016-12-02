/**
 * Created by zmz0305 on 11/7/16.
 */
import { combineReducers } from "redux"
import hingeState from "./hingeStateReducer"
import userState from "./userInfoReducer"
import { routerReducer } from 'react-router-redux'

export default combineReducers({
    hingeState,
    userState,
    routing:routerReducer
});
