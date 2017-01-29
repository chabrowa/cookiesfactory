import React, { Component } from 'react';
import {connect} from 'react-redux';
import './TopBar.css'

class TopBar extends Component {
  constructor() {
    super()
  }
  render() {
    return (
      <div className="TopBar">
        <div>Pokoj dla Kurala</div>
      </div>
    );
  }
}

export default (TopBar);
