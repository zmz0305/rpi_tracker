/**
 * Created by zmz0305 on 12/2/16.
 */
import React from 'react'
import LoggedInLeft from './LoggedInLeft';
import LoggedInRight from './LoggedInRight'
export default class LoggedInContainer extends React.Component {
    constructor(){
        super();
    }

    render() {
        return (
            <div style={{'height': '100%', 'padding': '0px'}}>
                <div className="container-fluid" style={{'padding': '0px'}}>
                    <div className="rows vertical-align">
                        <LoggedInLeft/>
                        <LoggedInRight />
                    </div>

                </div>
            </div>

        );
    }
}
