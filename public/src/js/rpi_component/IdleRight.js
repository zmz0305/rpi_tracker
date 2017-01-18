/**
 * Created by zmz on 23/09/16.
 */

import React from "react";
import { Link } from 'react-router'
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
        let gray = false;
        _.forEach(this.props.users, (value, key) => {
            gray = !gray;
            cards.push(
                <Link to={"user/" + key} key={key}>
                    <Card name={key} checkoutAmount={value.taken.length} gray={gray}></Card>
                </Link>
            )
        })
        return (
            <div className="col-sm-8" style={{'height':'480px', 'padding':'0px', 'overflow': 'auto'}}>
                {cards}
            </div>
        );
    }
}