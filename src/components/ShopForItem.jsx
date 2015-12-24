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

  getItemImg(){
    var itemName = this.props.item.text.toLowerCase();
    itemName = itemName.replace(" ","-");

    //console.log(itemName);
    var itemImgSrc = "/images/groceries/" + itemName + ".jpg";

    return (
      <img className="img-responsive" src={itemImgSrc} />
    );
  },

  render() {
  	var item = this.props.item;

    return (

      <li className="list-group-item" 
          onDragStart={this._onDragStart} draggable={this.props.draggable} key={this.props.key}>
          <div className="row">
              {this.getItemImg()}
              <div 
                style={{
                  'position':'absolute',
                  'height':45,
                  'width':"100%",
                  'maxHeight':60,
                  'bottom':10,
                  'color':'white',
                  'background':'rgba(0, 0, 0, 0.61)'
                }} 
                className="container-fluid">
                  <div className="container-fluid text-center">
                    <input
                    className="toggle show-inline"
                    type="checkbox"
                    checked={item.complete}
                    onChange={this._onToggleComplete}
                    />
                    {item.text}
                    <button  onClick={this._remove}  className="pull-right" 
                      type="button" aria-label="Remove">x</button>
                  </div>
              </div>
          </div>          
      </li>
    );
  }

});

module.exports = ShopForItem;
