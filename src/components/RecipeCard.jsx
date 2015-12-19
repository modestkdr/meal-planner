import React from 'react';

var RecipeCard = React.createClass({

	render() {
		return (
			<li className="col-md-4">
  				<img width='100' height='100' src={this.props.item.image} />
  				<div>{this.props.item.name}</div>
  			</li>
		);
	}
});

module.exports = RecipeCard;