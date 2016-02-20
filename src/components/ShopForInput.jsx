import React from 'react';
var ENTER_KEY_CODE = 13;

var ShopForInput = React.createClass({

  getInitialState: function() {
    return {
      value: this.props.value || ''
    };
  },

  _save: function() {
    this.props.onSave(this.state.value);
    this.setState({
      value: ''
    });
  },

  _onChange: function(event) {
    this.setState({
      value: event.target.value
    });
  },

  _onKeyDown: function(event) {
    if (event.keyCode === ENTER_KEY_CODE) {
      this._save();
    }
  },

  render: function() {
    return (
      <input type="text" id="newGroceryInput" placeholder={this.props.placeholder}
      	onBlur={this._save}
        onChange={this._onChange}
        onKeyDown={this._onKeyDown}
        value={this.state.value} />
    );
  }

});

module.exports = ShopForInput;
