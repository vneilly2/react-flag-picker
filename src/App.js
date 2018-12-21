import React, { Component } from 'react';
import FlagPicker from './components/FlagPicker';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flags: []
    }
  }
  render() {
    return (
      <div className="App">
        <h1 className='my-title'>Flag Picker</h1>
        <FlagPicker test='Hello World!'></FlagPicker>
      </div>
    );
  }
}

export default App;
