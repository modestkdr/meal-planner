import React from 'react';
var AppActions = require('../actions/AppActions');

var RecipeFinderItem = React.createClass({

  _removeFromRecipeFinder(e){
  	if (e.preventDefault) e.preventDefault();
  	AppActions.removeItemFromRecipeFinder(this.props.item);
  },

  render() {
  	var item = this.props.item;

    return (
      <li className="list-group-item">
      	{item.text}
      	<button onClick={this._removeFromRecipeFinder} className="pull-right" 
        	type="button" aria-label="Remove">x</button>
      </li>
    );
  }

});

module.exports = RecipeFinderItem;