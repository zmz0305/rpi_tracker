/**
 * Created by zmz on 21/09/16.
 */
import React from "react";
import Subcontainer from './Subcontainer';
import WelcomeScreen from './WelcomeScreen'
import Header from '../rpi_component/Header';
import Alarm from './Alarm';
import IdleLeft from '../rpi_component/IdleLeft'
import IdleRight from '../rpi_component/IdleRight'

import { connect } from "react-redux"
import { monitorLogin, logout, tick } from "../actions/loginActions"
import { fetchHingeStates } from "../actions/hingeStatusActions"
import { monitorHinge } from "../actions/monitorHingeActions"

@connect((store)=>{
    return {
        state: store.hingeState
    }
})
export default class Container extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.dispatch(fetchHingeStates());
        this.props.dispatch(monitorHinge());
        this.props.dispatch(monitorLogin());
        // setInterval(()=>{
        //     console.log(this.props.state.valid_timer);
        //     if(this.props.state.valid_timer < 0){
        //         this.props.dispatch(logout());
        //     }
        //     this.props.dispatch(tick());
        // }, 1000);
    }

    render() {

        return (
            <div style={{'height': '100%', 'padding': '0px'}}>
                <div className="container-fluid" style={{'padding': '0px'}}>
                    <div className="rows vertical-align">
                        <Router history={browerHistory}>
                            <IdleLeft/>
                            <IdleRight />
                        </Router>
                    </div>

                </div>
            </div>

        );
    }
}