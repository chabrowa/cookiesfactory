import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router'

class UserPanel extends Component {
  constructor() {
    super()
  }
  render() {
    return (
      <div className="UserPanel">
        <Link to="/createadvert">Add Advert</Link>
      </div>
    );
  }
}

export default (UserPanel);
