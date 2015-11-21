import React from 'react';

var ContactForm = React.createClass({
  getInitialState() {
    inputValue: ''
  }

  render () {
    return (
        <input
          type = 'text'
          value = {this.state.inputValue}
          onChange={this.onChange} />
     );
  },

  onChange(e) {
    this.setState({ inputValue: e.target.value });
  }
});
