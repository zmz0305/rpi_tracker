/**
 * Created by zmz on 23/09/16.
 */

import React from "react";
import Card from './Card'
import {connect} from 'react-redux'
import _ from 'lodash'

@connect((store)=>{
    return {
        users: store.hingeState.users
    }
})
export default class Right extends React.Component {
    render() {
        let cards = [];
        _.forEach(this.props.users, (value, key) => {
            cards.push(
                <Card key={key} name={key} checkoutAmount={value.taken.length}></Card>
            )
        })
        return (
            <div className="col-sm-8" style={{'background':'yellow', 'height':'480px', 'padding':'0px', 'overflow': 'auto'}}>
                {cards}
            </div>
        );
    }
}