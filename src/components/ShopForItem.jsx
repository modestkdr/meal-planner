import React from 'react';
var AppActions = require('../actions/AppActions');

var ShopForItem = React.createClass({

  _remove(){
  	AppActions.destroy(this.props.item.id);
  },

  _onDragStart(e){
	  e.dataTransfer.effectAllowed = 'copy'; 
    e.dataTransfer.setData('item', this.props.item.id);
  },

  _onToggleComplete() {
    AppActions.toggleComplete(this.props.item);
  },

  _onMouseAction(e) {
    e.stopPropagation();
    
  },

  render() {
  	var item = this.props.item;

    return (

      <li className="list-group-item" 
          onDragStart={this._onDragStart} draggable={this.props.draggable} key={this.props.key}>
      <input
            className="toggle show-inline"
            type="checkbox"
            checked={item.complete}
            onChange={this._onToggleComplete}
          />
      	{item.text} {'  '}
        <button  onClick={this._remove}  className="btn btn-default btn-sm pull-right show-inline" 
          type="button" aria-label="Remove">
            <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
        </button>
      </li>
    );
  }

});

module.exports = ShopForItem;
