import React from 'react';

var CreateRecipe = React.createClass({

	getInitialState() {
	    return {
	      'newRecipeName': '',
	      'newRecipeCookingTime':'',
	      'newRecipeYield':''
	    };
  	},

	_onFormSubmit(e) {
		e.preventDefault();

		this.props.onNewRecipeFormSubmit(
			this.state.newRecipeName,
			this.state.newRecipeCookingTime,
			this.state.newRecipeYield
		);
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

	render() {
		return (
			<section>
				<h3>{this.props.headingText}</h3>
				<form>
				  <div className="form-group">
				    <input onChange={this._onChange} id="newRecipeName" type="text" 
				    	className="form-control" placeholder="Recipe name" />
				  </div>
				  <div className="form-group">
				    <textarea placeholder="Ingredients - one per line" onChange={this._onChange} 
				    	id="newRecipeIngredients" 
				    	type="textarea" 
				    	className="form-control" />
				  </div>
				  <div className="form-group">
				    <textarea placeholder="Instructions - one per line" onChange={this._onChange} 
				    	id="newRecipeInstructions" 
				    	type="textarea" 
				    	className="form-control" />
				  </div>
				  <div className="form-group">
				    <input onChange={this._onChange} min="1" type="number" className="form-control" 
				    	id="newRecipeCookingTime"
				    	placeholder="Cooking time in minutes"/>
				  </div>
				  <div className="form-group">
				    <input onChange={this._onChange} min="1" type="number" className="form-control" 
				    	id="newRecipeYield"
				    	placeholder="Recipe yield" />
				  </div>
					<button type="submit" onClick={this._onFormSubmit} className="btn btn-default">Submit</button>
				</form>
			</section>
		);
	}
});

module.exports = CreateRecipe;