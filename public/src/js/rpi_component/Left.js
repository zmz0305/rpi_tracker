/**
 * Created by zmz on 21/09/16.
 */
import React from "react";
import Particle from "../../../bower_components/particle-api-js/dist/particle.min"
import Dial from '../react-dial'
import {connect} from 'react-redux'

@connect((store) => {
    return {
        checkOutAmount: store.hingeState.checkOutAmount
    }
})
export default class Left extends React.Component {
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
                    value={this.props.checkOutAmount}
                    min={0}
                    max={3}
                />

            </div>
        )
    }

}