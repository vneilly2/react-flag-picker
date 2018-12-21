import React, { Component } from 'react';

class FlagPicker extends Component {
  render() {
    return (
      <div className="flag-picker">
       <span>Inside FlagPicker Component: {this.props.test}</span>
      </div>
    );
  }
}

export default FlagPicker;