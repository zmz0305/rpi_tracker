/**
 * Created by zmz0305 on 1/16/17.
 */
import React from "react"
import  {connect} from 'react-redux'
import UserDetailLeft from './UserDetailLeft'
import UserDetailRight from './UserDetailRight'

@connect((store) => {
    return {
        users: store.hingeState.users
    }
})

export default class UserDetailContainer extends React.Component {
    render() {
        return (
            <div style={{'height': '100%', 'padding': '0px'}}>
                <div className="container-fluid" style={{'padding': '0px'}}>
                    <div className="rows vertical-align">
                        <UserDetailLeft name={this.props.params.name} />
                        <UserDetailRight name={this.props.params.name} />
                    </div>
                </div>
            </div>

        )
    }
}