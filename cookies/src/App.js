import React, { Component } from 'react';
import {connect} from 'react-redux';
import TopBar from './TopBar';
import CreateAdvert from './CreateAdvert';
import './App.css';
import {Link} from 'react-router'


class App extends Component {
  constructor() {
    super()
  }
  render() {
    return (
      <div className="App">
        <TopBar></TopBar>
        {this.props.children}
      </div>
    );
  }
}

export default (App);
