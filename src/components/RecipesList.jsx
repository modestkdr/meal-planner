import React from 'react';
var RecipeCard = require('./RecipeCard');

var RecipesList = React.createClass({

  getItems(){
  	var recipes = this.props.recipes;
    //console.log(items);
  	var result = [];

  	for(var index in recipes) {
  		result.push(
        <RecipeCard key={index} recipe={recipes[index]} />
  		);
  	}

  	return result;
  },

  render() {
    return (
      <section>
      	<ul className="list-unstyled draggable-list">
      		{this.getItems()}
      	</ul>
      </section>
    );
  }

});

module.exports = RecipesList;
