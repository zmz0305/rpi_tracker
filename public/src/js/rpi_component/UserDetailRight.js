/**
 * Created by zmz0305 on 1/18/17.
 */
import React from 'react'
import { connect } from 'react-redux'
import Card from './Card'
import p from '../props'

@connect((store) => {
    return {
        users: store.hingeState.users,
        checkoutTime: store.hingeState.checkoutTime
    }
})
export default class UserDetailRight extends React.Component {
    render() {
        this.user = this.props.users[this.props.name];
        let cards = [];
        let gray = false;
        for(let i = 0; i < this.user.taken.length; i++){
            gray = !gray;
            cards.push(
                <Card key={i} name={p.TOOL_NAMES[this.user.taken[i]]} checkoutAmount={this.props.checkoutTime[this.user.taken[i]].toLocaleTimeString()} gray={gray} />
            )
        }

        if(cards.length < 4){
            let l = cards.length;
            for(let j = 0; j < 4 - l; j++) {
                gray = !gray;
                cards.push(
                    <Card name={' '} gray={gray} />
                )
            }
        }

        return (
            <div className="col-sm-8" style={{'height':'480px', 'padding':'0px', 'overflow': 'auto'}}>
                {cards}
            </div>
        );
    }
}