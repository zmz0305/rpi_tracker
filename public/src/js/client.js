import React from "react";
import ReactDOM from "react-dom";

import IdleContainer from "./rpi_component/IdleContainer.js";
import Alarm from "./rpi_component/Alarm"
import LoggedInContainer from "./rpi_component/LoggedInContainer"
import App from "./rpi_component/App"
import store from "./store"
import { Provider } from "react-redux"
import { syncHistoryWithStore } from 'react-router-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

const app = document.getElementById('app');
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render((
    <Provider store={store}>
        <Router history={history} >
            <Route path='/' component={App}>
                <IndexRoute component={IdleContainer} />
                <Route path="loggedin" component={LoggedInContainer} />
                <Route path="alarm" component={Alarm} />
            </Route>
        </Router>
    </Provider>

), app)
