/**
 * Created by zmz on 23/09/16.
 */

import React from "react";
import Card from './Card'

export default class Right extends React.Component {
    render() {
        return (
            <div className="col-sm-8" style={{'background':'yellow', 'height':'480px', 'padding':'0px', 'overflow': 'auto'}}>
                <Card></Card>
                <Card></Card>
                <Card></Card>
                <Card></Card>
                <Card></Card>
                <Card></Card>

            </div>
        );
    }
}