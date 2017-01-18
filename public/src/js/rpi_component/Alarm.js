/**
 * Created by zmz0305 on 12/2/16.
 */
import React from "react";
import {connect} from "react-redux";
import { replace } from "react-router-redux"
import CLAudioPlayer from 'react-cl-audio-player'

@connect((store) => {
    return {
        alarm: store.hingeState.alarm
    }
})
export default class Alarm extends React.Component {
    constructor() {
        super();
        this.style = {
            // background: 'red',
            opacity: 0.8,
            width: '100%',
            height: '100%',
            paddingTop: '10%',
            textAlign: 'center'
        }
        this.songs = [
            {
                url:'http://picosong.com/cdn/f520987077a9b19d739f972dcf878e8d.mp3',
                artist: {
                    name: 'aa',
                    song: 'aaaa'
                }
            }
        ]

    }


    componentWillReceiveProps(nextProps) {
        if(!nextProps.alarm){
            this.props.dispatch(replace('/'))
        }
    }

    render() {
        return (
            <div style={{'height': '100%', 'padding': '0px'}}>
                <div className="container-fluid" style={{'padding': '0px'}}>

                    <div style={this.style}>
                        <img src="images/warning.jpg"/>
                        <h1>UNAUTHORIZED ACCESS</h1>
                    </div>
                    <div style={{'visibility': 'hidden'}}>
                        <CLAudioPlayer songs={this.songs} autoplay />
                    </div>
                </div>
            </div>

        );

    }
}