/**
 * Created by zmz0305 on 11/23/16.
 */
import React from 'react'

export default class Card extends React.Component {
    constructor(props){
        super(props);
        this.styleGray = {'background':'#f5f5f5', 'height': '120px', 'border':'solid 1px', 'display': 'flex', 'alignItems':'center', 'justifyContent': 'space-between'};
        this.styleDefault = {'height': '120px', 'border':'solid 1px', 'display': 'flex', 'alignItems':'center', 'justifyContent': 'space-between'};
        this.uprightStyle = {'fontSize': '20px'};
        this.leftStyle = {'fontSize': '39px', 'textAlign': 'center', 'verticalAlign': 'middle', 'paddingLeft': '20px'};
    }

    render(){
        this.style = this.props.gray ? this.styleGray : this.styleDefault;
        return (
            <div style={this.style}>
                <div>
                    <p style={this.leftStyle}>{this.props.name}</p>
                </div>
                <div style={{'float':'right', 'textAlign': 'center', 'paddingRight': '20px'}}>
                    <p style={this.uprightStyle}>checkout</p>
                    <p style={this.uprightStyle}>{this.props.checkoutAmount}</p>
                </div>
            </div>
        )
    }
}