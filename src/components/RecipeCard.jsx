import React from 'react';
import { Link } from 'react-router';

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
          <div><Link to={`/recipe/${this.props.recipe._id}`}>{this.props.recipe.recipeName}</Link></div>
  		</li>
		);
	}
});

module.exports = RecipeCard;