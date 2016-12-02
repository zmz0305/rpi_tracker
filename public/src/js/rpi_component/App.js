/**
 * Created by zmz0305 on 12/2/16.
 */
import React from 'react'
import { Link } from 'react-router';

export default class Card extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div>
                <ul role="nva">
                    <li><Link to="/">Idle</Link></li>
                    <li><Link to="/loggedin">Loggedin</Link></li>
                    <li><Link to="/alarm">Alarm</Link></li>
                </ul>
                {this.props.children}
            </div>
        )
    }
}