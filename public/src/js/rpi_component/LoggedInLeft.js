/**
 * Created by zmz0305 on 12/2/16.
 */
import React from "react";
import Particle from "../../../bower_components/particle-api-js/dist/particle.min"
import Dial from '../react-dial'
import {connect} from 'react-redux'

@connect((store) => {
    return {
        checkoutAmount: store.hingeState.checkoutAmount
    }
})
export default class LoggedInLeft extends React.Component {
    constructor(props) {
        super(props);
    }

    handleDialChange(newValue) {
        this.setState({dialValue: newValue})
    }

    render() {
        return (
            <div className="col-sm-4 center-block vertical-align" style={{'background': 'green', 'height': '480px'}}>
                <Dial
                    value={this.props.checkoutAmount}
                    min={0}
                    max={3}
                />

            </div>
        )
    }

}
