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

  getHeadingText(){
    for(var prop in this.props.recipes) {
        if(this.props.recipes.hasOwnProperty(prop)) {
           return (<h3>Recipes Found</h3>);
        } else {
            return '';
          }
    }
  },

  render() {
    return (
      <section>
        {this.getHeadingText()}
      	<ul className="list-unstyled draggable-list">
      		{this.getItems()}
      	</ul>
      </section>
    );
  }

});

module.exports = RecipesList;
