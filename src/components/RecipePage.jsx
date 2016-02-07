import React from 'react';
var Superagent = require('superagent');
import {  Link } from 'react-router';

var RecipePage = React.createClass({

  getInitialState(){
    return {
      recipe:{}
    }
  },

  componentDidMount(){
    Superagent
      .get('/recipe/id/' + this.props.params.id)
      .set('Accept', 'application/json')
      .end(function(err, res){
        var data = JSON.parse(res.text);
        data.recipe.recipeIngredients = data.recipe.recipeIngredients.replace(/(?:\r\n|\r|\n)/g, '<br />');
        data.recipe.recipeInstructions = data.recipe.recipeInstructions.replace(/(?:\r\n|\r|\n)/g, '<br />');
       
        this.setState({
          recipe:data.recipe,
        });
      }.bind(this));
  },

  render() {
    var recipe = this.state.recipe;
    return (
      <section className="col-md-8">
          <p><Link to="/">Home</Link></p>
          <h2>{recipe.recipeName}</h2>
          <img className="img-responsive" src="http://placehold.it/125x125" />
            <h4>Ingredients</h4>
            <div dangerouslySetInnerHTML={{__html: recipe.recipeIngredients}} />
            <h4>Instructions</h4>
            <div dangerouslySetInnerHTML={{__html: recipe.recipeInstructions}} />
      </section>
    );
  }
});

module.exports = RecipePage;