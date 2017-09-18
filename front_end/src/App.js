import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Register from './Register.js';


class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          {/*<img src={logo} className="App-logo" alt="logo" />*/}
          <h2>Welcome to GoHealth Urgent Care</h2>
        </div>
        <br/>
        <Register />
      </div>
    );
  }
}

export default App;
