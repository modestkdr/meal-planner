import React from 'react';

var CreateRecipe = React.createClass({

	getInitialState() {
	    return {
	      'newRecipeName': '',
	      'newRecipeIngredients':this.getIngredients(),
	      'newRecipeInstructions':'',
	      'newRecipeCookingTime':'15',
	      'newRecipeYield':'1'
	    };
  	},

	_onFormSubmit(e) {
		e.preventDefault();

		this.props.onNewRecipeFormSubmit(
			this.state.newRecipeName,
			this.state.newRecipeIngredients,
			this.state.newRecipeInstructions,
			this.state.newRecipeCookingTime,
			this.state.newRecipeYield
		);

		document.getElementById("newRecipeFormContainer").style.display = 'none';
	},

	_onChange(e) {

		if(e.target.id === 'newRecipeName') {
			this.setState({
				'newRecipeName':e.target.value
			});
		}
		if(e.target.id === 'newRecipeIngredients') {
			this.setState({
				'newRecipeIngredients':e.target.value
			});
		}
		if(e.target.id === 'newRecipeInstructions') {
			this.setState({
				'newRecipeInstructions':e.target.value
			});
		}
		if(e.target.id === 'newRecipeCookingTime') {
			this.setState({
				'newRecipeCookingTime':e.target.value
			});
		}
		if(e.target.id === 'newRecipeYield') {
			this.setState({
				'newRecipeYield':e.target.value
			});
		}
	},

	// Get ingredients - already available in the recipe finder
	getIngredients(){
		var ingredients = this.props.ingredients;
		//console.log(ingredients);
		var result = '';

		for(var index in ingredients){
			result += ingredients[index].text + "\n";
		}
		return result;
	},

	render() {
		return (
			<section id="newRecipeFormContainer">
				<h3>{this.props.headingText}</h3>
				<form>
				  <div className="form-group">
				    <input required="required" onChange={this._onChange} id="newRecipeName" type="text" 
				    	className="form-control" placeholder="Recipe name" />
				  </div>
				  <div className="form-group">
				    <textarea required="required" placeholder="Ingredients - one per line" onChange={this._onChange} 
				    	id="newRecipeIngredients" 
				    	type="textarea" defaultValue={this.getIngredients()}
				    	className="form-control" />
				  </div>
				  <div className="form-group">
				    <textarea required="required" placeholder="Instructions - one per line" onChange={this._onChange} 
				    	id="newRecipeInstructions" 
				    	type="textarea" 
				    	className="form-control" />
				  </div>
				  <div className="form-group">
				    <input onChange={this._onChange} min="1" defaultValue={this.state.newRecipeCookingTime} 
				    	type="number" className="form-control" 
				    	id="newRecipeCookingTime"
				    	placeholder="Cooking time in minutes"/>
				  </div>
				  <div className="form-group">
				    <input onChange={this._onChange} min="1" type="number" className="form-control" 
					    defaultValue={this.state.newRecipeYield}
				    	id="newRecipeYield"
				    	placeholder="Recipe yield" />
				  </div>
					<button type="submit" onClick={this._onFormSubmit} className="btn btn-primary">Submit</button>
				</form>
			</section>
		);
	}
});

module.exports = CreateRecipe;