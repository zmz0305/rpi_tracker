/**
 * Created by zmz0305 on 1/16/17.
 */
import React from "react"
import {connect} from 'react-redux'
import Dial from '../react-dial'
import {Link} from 'react-router'

@connect((store) => {
    return {
        users: store.hingeState.users
    }
})
export default class UserDetailLeft extends React.Component {
    render() {
        return (
            <div className="col-sm-4 center-block vertical-align"
                 style={{'border': 'solid 1px', 'background': '#f5f5f5', 'height': '480px'}}>
                <div>
                    <div className="col-sm-12" style={{'marginBottom': '20px'}}>
                        <h2 style={{'textAlign': 'center'}}>{this.props.name}</h2>
                    </div>
                    <div className="col-sm-12">
                        <Dial
                            value={this.props.users[this.props.name].taken.length}
                            min={0}
                            max={3}
                        />
                    </div>
                    <Link to="/">
                        <div className="col-sm-12">
                            <h1 style={{'textAlign': 'center'}}>BACK</h1>
                        </div>
                    </Link>
                </div>
            </div>
        )
    }
}