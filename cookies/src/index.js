import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {store} from './store';
import App from './App';
import CreateAdvert from './CreateAdvert'
import Login from './Login'
import UserPanel from './UserPanel'
import './index.css';
import { Router, Route, Link, hashHistory, IndexRoute } from 'react-router'

ReactDOM.render(
  <Provider store = {store} >
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <Route path="createadvert" component={CreateAdvert} />
        <Route path="userpanel" component={UserPanel} />
        <IndexRoute component={Login}></IndexRoute>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
