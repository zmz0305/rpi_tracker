/**
 * Created by zmz0305 on 11/23/16.
 */
import React from 'react'

export default class Card extends React.Component {
    constructor(props){
        super(props);
        this.style = {'height': '120px', 'border':'solid 1px'};
    }

    render(){
        return (
            <div style={this.style}>
                test
            </div>
        )
    }
}