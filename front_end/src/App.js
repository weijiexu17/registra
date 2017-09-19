import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Register from './Register.js';
import RegisterStatus from './RegistrationStatus.js';


class App extends Component {
  constructor(props){
    super(props);
    this.state={
      firstName:'',
      lastName:'',
      insuranceActive: false,
      copay: '',
      registered: false,
      message: ''
    }

    this.callback = this.callback.bind(this);
  }

  callback(data){
    this.setState({
        firstName: data.firstName,
        lastName: data.lastName,
        insuranceActive: data.insuranceActive,
        copay: data.copay,
        registered: data.registered,
        message: data.message
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          {/*<img src={logo} className="App-logo" alt="logo" />*/}
          <h2>Welcome to GoHealth Urgent Care</h2>
        </div>
        <br/>
        <Register registerState = {this.state} callbackFromParent = {this.callback}/>
        <RegisterStatus statusProp = {this.state} />
      </div>
    );
  }
}

export default App;
