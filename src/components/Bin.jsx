import React from 'react';
var GroceryStore = require('../stores/GroceryStore');

var Bin = React.createClass({
  
    getItems(){
      var renderItems = [];
      var items = this.props.items;
      for(var item in items) {
        renderItems.push(<li className="list-group-item" key={items[item].id}>{items[item].text}</li>);
      }
      
      return renderItems;
    },

  	_onDragOver(e){
  		if (e.preventDefault) e.preventDefault(); 
    	e.dataTransfer.dropEffect = 'copy';

    	return false;
  	},

  	_onDrop(e) {
  		if (e.stopPropagation) e.stopPropagation();
      var droppedItem = GroceryStore.find(e.dataTransfer.getData('item'));
      this.props.onDrop(droppedItem);

	    return false;
  	},

    _findRecipes(e) {
      e.preventDefault();
      this.props.onRecipeFinderSubmit();
    },

    getFindRecipesBtn() {
      if(this.props.isShowSubmitBtn){
        return (<button className="btn btn-default" onClick={this._findRecipes}>{this.props.btnText}</button>);
      } else {
        return '';
      }
    },

    getListHeading(){
      if(this.props.isShowSubmitBtn){
        return (<h4>Ingredients</h4>);
      } else {
        return '';
      }
    },

  render() {

    return (
      <section onDrop={this._onDrop} onDragOver={this._onDragOver}>
      	<h3>{this.props.title}</h3>
        <div className="well well-sm">Drag and drop items from pantry here</div>
        <div className="clearfix"></div> 
        {this.getListHeading()}    
        <ul className="list-group">
          {this.getItems()}
        </ul>
        <div className="clearfix"></div>      
        <p>
          {this.getFindRecipesBtn()}
        </p>
      </section>
    );
  }

});

module.exports = Bin;