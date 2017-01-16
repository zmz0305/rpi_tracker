import React from "react";
import IdleLeft from '../rpi_component/IdleLeft'
import IdleRight from '../rpi_component/IdleRight'

import {connect} from "react-redux"
import {monitorLogin, logout, tick} from "../actions/loginActions"
import {fetchHingeStates} from "../actions/hingeStatusActions"
import {monitorHinge} from "../actions/monitorHingeActions"
import { push, replace } from 'react-router-redux'

@connect((store) => {
    return {
        state: store.hingeState
    }
})
export default class Container extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.state.alarm){
            this.props.dispatch(replace('alarm'))
        }
        if(nextProps.state.authorized){
            this.props.dispatch(replace('loggedin'))
        }
    }

    componentDidMount() {
        this.props.dispatch(fetchHingeStates());
        if(! this.props.state.hingeMonitored)
            this.props.dispatch(monitorHinge());
        if(! this.props.state.loginMonitored)
            this.props.dispatch(monitorLogin());
    }

    render() {
        return (
            <div style={{'height': '100%', 'padding': '0px'}}>
                <div className="container-fluid" style={{'padding': '0px'}}>
                    <div className="rows vertical-align">
                        <IdleLeft/>
                        <IdleRight />
                    </div>

                </div>
            </div>

        );
    }
}
/**
 * Created by zmz0305 on 12/2/16.
 */
