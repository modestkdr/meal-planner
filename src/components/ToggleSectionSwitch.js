import React from 'react';

var ToggleSectionSwitch = React.createClass({

  render() {
    return (
     <h3 onClick={this._onClick}  id="toggle-section-switch">{this.props.text}</h3>
    );
  }

});

module.exports = ToggleSectionSwitch;
