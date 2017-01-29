import React, { Component } from 'react';
import {connect} from 'react-redux';
import {incrementCounter, decrementCounter, fetchHello, addUser} from './store';
import {Link} from 'react-router'

class Login extends Component {
  constructor() {
    super()
    this.state = {nameValue: '', passwordValue: ''};
  }
  componentWillMount() {
    this.props.dispatch(fetchHello())
  }
  handleNameChange(event) {
    this.setState({nameValue: event.target.value});
  }
  handlePasswordChange(event) {
    this.setState({passwordValue: event.target.value});
  }
  handleFormSubmit(event) {
    event.preventDefault()
    this.props.dispatch(addUser(this.state.nameValue, this.state.passwordValue))
  }
  render() {
    return (
      <div className="Login">
        <p className="App-intro">
          {this.props.message} {this.props.counter}
        </p>
        <button onClick={() => this.props.dispatch(incrementCounter())}>INC</button>
        <button onClick={() => this.props.dispatch(decrementCounter())}>DEC</button>
        <form onSubmit={this.handleFormSubmit.bind(this)}>
          NAME:
          <input type="text" value={this.state.nameValue} onChange={this.handleNameChange.bind(this)}></input>
          PASSWORD:
          <input type="text" value={this.state.passwordValue} onChange={this.handlePasswordChange.bind(this)}></input>
          <input type="submit" value="ADD" />
        </form>
        <Link to="/createadvert">Add Advert</Link>
      </div>
    );
  }
}


export default connect((state) => {
  return {
    counter: state.counter,
    message: state.message
  }
})(Login);
