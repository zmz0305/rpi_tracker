/**
 * Created by zmz0305 on 12/2/16.
 */
import React from "react";
import Card from './Card'
import {connect} from 'react-redux'
import _ from 'lodash'

@connect((store)=>{
    return {
        user: store.hingeState.user
    }
})
export default class LoggedInRight extends React.Component {
    render() {
        return (
            <div className="col-sm-8" style={{'border': 'solid 1px','height':'480px', 'padding':'0px', 'overflow': 'auto', 'textAlign': 'center'}}>
                <div style={{'paddingTop': '180px'}}>
                    <h1>{this.props.user}</h1>
                    <h2>PROCEED TO TAKE TOOLS</h2>
                </div>
            </div>

        );
    }
}