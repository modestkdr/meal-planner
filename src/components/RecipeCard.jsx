import React from 'react';

var RecipeCard = React.createClass({

	_onDragStart(e) {
		e.dataTransfer.effectAllowed = 'copy';
    	e.dataTransfer.setData('recipe', this.props.recipe._id);
    	//console.log('on drag start');
    	//console.log(this.props.recipe);
  	},

  	_onMouseAction(e) {
	    e.stopPropagation();
  	},

	render() {
		return (
			<li onDragStart={this._onDragStart} draggable="true" className="col-md-3">
  				<img className="img-responsive" src="http://placehold.it/125x125" />
  				<div>{this.props.recipe.recipeName}</div>
  			</li>
		);
	}
});

module.exports = RecipeCard;