/**
 * Created by zmz0305 on 12/2/16.
 */
import React from 'react'
import { Link } from 'react-router';
import {connect} from "react-redux"
import {logout, tick} from "../actions/loginActions"


@connect((store) => {
    return {
        state: store.hingeState
    }
})
export default class Card extends React.Component {
    constructor(props){
        super(props);
    }

    componentDidMount() {
        setInterval(()=>{
            console.log(this.props.state.valid_timer);
            if(this.props.state.valid_timer <= 0 && this.props.state.authorized){
                this.props.dispatch(logout());
            }
            this.props.dispatch(tick());
        }, 1000);
    }

    render(){
        return (
            <div>
                {/*<ul role="nva">*/}
                    {/*<li><Link to="/">Idle</Link></li>*/}
                    {/*<li><Link to="/loggedin">Loggedin</Link></li>*/}
                    {/*<li><Link to="/alarm">Alarm</Link></li>*/}
                {/*</ul>*/}
                {this.props.children}
            </div>
        )
    }
}