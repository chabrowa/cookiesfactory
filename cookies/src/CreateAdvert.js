import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router'

class CreateAdvert extends Component {
  constructor() {
    super()
  }
  render() {
    return (
      <div className="CreateAdvert">
        <form>
          Title: <input type="text" />
          Description: <textarea type="text" />
          <input type="submit" value="SAVE" />
        </form>
        <Link to="/userpanel">Go Back</Link>
      </div>
    );
  }
}

export default (CreateAdvert);
