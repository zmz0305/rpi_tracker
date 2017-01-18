/**
 * Created by zmz0305 on 12/2/16.
 */
import React from "react";
import Particle from "../../../bower_components/particle-api-js/dist/particle.min"
import Dial from '../react-dial'
import {connect} from 'react-redux'
import {replace} from 'react-router-redux'

@connect((store) => {
    return {
        valid_timer: store.hingeState.valid_timer
    }
})
export default class LoggedInLeft extends React.Component {
    constructor(props) {
        super(props);
    }

    handleDialChange(newValue) {
        this.setState({dialValue: newValue})
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.valid_timer <= 0){
            this.props.dispatch(replace('/'))
        }
    }

    render() {
        return (
            <div className="col-sm-4 center-block vertical-align" style={{'border': 'solid 1px', 'background': '#f5f5f5', 'height': '480px'}}>
                <Dial
                    value={this.props.valid_timer}
                    min={0}
                    max={10}
                />

            </div>
        )
    }

}
