import React, { Component } from 'react';
import {connect} from 'react-redux';
import logo from './logo.svg';
import './App.css';
import {incrementCounter, decrementCounter, fetchHello, addUser} from './store';

class App extends Component {
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
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
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
      </div>
    );
  }
}

export default connect((state) => {
  return {
    counter: state.counter,
    message: state.message
  }
})(App);
