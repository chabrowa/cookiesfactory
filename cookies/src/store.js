import { createStore, combineReducers, applyMiddleware } from 'redux'
import {hashHistory} from 'react-router'
import thunk from 'redux-thunk'

export function incrementCounter () {
  return {type:'INCREMENT'}
}

export function decrementCounter () {
  return {type:'DECREMENT'}
}

export function addUser(name, password) {
  return (dispatch) => {
    return fetch('https://me902ggbm6.execute-api.us-east-1.amazonaws.com/dev/addUser', {
        method: "POST",
        body: 'nameValue=' + encodeURIComponent(name) +
              '&passwordValue=' + encodeURIComponent(password)
      })
      .then((res) => res.json())
      .then(console.log)
      .catch(console.log)
  }
}

export function addAdvert(title, description) {
  return (dispatch) => {
    return fetch('https://me902ggbm6.execute-api.us-east-1.amazonaws.com/dev/addAdvert', {
        method: "POST",
        body: 'title=' + encodeURIComponent(title) +
              '&description=' + encodeURIComponent(description)
      })
      .then((res) => res.json())
      .then(console.log)
      .catch(console.log)
  }
}

export function getAdverts() {
  return (dispatch) => {
    return fetch('https://me902ggbm6.execute-api.us-east-1.amazonaws.com/dev/getAdverts', {
        method: "GET"})
      .then((res) => res.json())
      .catch(console.log)
  }
}

export function logIn(name, password) {
  return (dispatch) => {
    return fetch('https://me902ggbm6.execute-api.us-east-1.amazonaws.com/dev/logIn', {
        method: "POST",
        body: 'nameValue=' + encodeURIComponent(name) +
              '&passwordValue=' + encodeURIComponent(password)
      })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          hashHistory.push('/userpanel')
        }
      })
      .catch(console.log)
  }
}

export function fetchHello () {
  return (dispatch) => {
    return Promise.resolve().then(() => { dispatch({type: 'load'})})
    .then(() => fetch('https://me902ggbm6.execute-api.us-east-1.amazonaws.com/dev/hello'))
      .then((res) => res.json())
      .then((res) => {
        dispatch({type: 'loaded', response: res.message})
      })
  }

}

/**
 * This is a reducer, a pure function with (state, action) => state signature.
 * It describes how an action transforms the state into the next state.
 *
 * The shape of the state is up to you: it can be a primitive, an array, an object,
 * or even an Immutable.js data structure. The only important part is that you should
 * not mutate the state object, but return a new object if the state changes.
 *
 * In this example, we use a `switch` statement and strings, but you can use a helper that
 * follows a different convention (such as function maps) if it makes sense for your
 * project.
 */
function counter(state = 0, action) {
  switch (action.type) {
  case 'INCREMENT':
    return state + 1
  case 'DECREMENT':
    return state - 1
  default:
    return state
  }
}

function message(state = '', action) {
  switch (action.type) {
    case 'load':
      return "Loading..."
    case 'loaded':
      return action.response
    default:
      return state
  }
}

// Create a Redux store holding the state of your app.
// Its API is { subscribe, dispatch, getState }.
export const store = createStore(combineReducers({
  counter,
  message
}), applyMiddleware(thunk))
