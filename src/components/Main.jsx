import React from 'react';
var ReactDOM = require('react-dom');
import {  browserHistory, Router, Route, IndexRoute, Link } from 'react-router';
var Superagent = require('superagent');
var AppActions = require('../actions/AppActions');
import GroceryStore from '../stores/GroceryStore';
import RecipeStore from '../stores/RecipeStore';
import MealStore from '../stores/MealStore';
var PantryList = require('../components/ShopForList');
var ShopForInput = require('../components/ShopForInput');
var ShopForList = require('../components/ShopForList');
var RecipeFinder = require('../components/Bin');
var CreateRecipe = require('../components/CreateRecipe');
var RecipesList = require('../components/RecipesList');
var RecipePage = require('../components/RecipePage');
var MealPlan = require('../components/MealPlan');
var Calendar = require('../components/Calendar');

function getState(){
  	return {
      pantryList: GroceryStore.getPantryList(),
      shoppingList: GroceryStore.getShoppingList(),
      itemsInRecipeFinder: GroceryStore.getItemsInRecipeFinder(),
      recipesList:RecipeStore.getAll(),
      mealCalendarItems:MealStore.getAllMealItems(),
      isShowShoppingListContainer:false,
      newRecipeSubmission:{}
    };
}

var App = React.createClass({ 

	getInitialState(){
  		return {};
  	},

	componentDidMount() {	
	  var items = [];

	  /* MongoDB - get groceries from DB */
	  Superagent
		  .get('/grocery/find')
		  .set('Accept', 'application/json')
		  .end(function(err, res){

		  	var data = JSON.parse(res.text);
		  	var groceries = data.groceries;
		  	var result = {};

		  	//console.log('groceries');
		  	//console.log(groceries);
		  	
		  	// @todo refactor
		  	// _id is from MongoDB and id is used throughout this app
		  	for(var index in groceries){
		  		result[groceries[index]["_id"]] = groceries[index];
		    	result[groceries[index]["_id"]].id = groceries[index]["_id"];
		    	delete result[groceries[index]["_id"]]._id;
		    }
		  	
		  	GroceryStore.setAll(result);
		  	this.setState(getState());

		  	// @todo refactor & persist in state
			document.getElementById("shopping-list-container").style.display = 'none';

		  }.bind(this));

	  /* Get meal data from remote DB */
	  Superagent
		  .get('/meal/find')
		  .set('Accept', 'application/json')
		  .end(function(err, res){

		  	var data = JSON.parse(res.text);
		  	var meals = data.meals;
		  	var result = {};
		  	
		  	for(var index in meals){
		  		result[meals[index]["_id"]] = meals[index];
		    	result[meals[index]["_id"]].id = meals[index]["_id"];
		    	delete result[meals[index]["_id"]]._id;
		    }
		  	
		  	MealStore.setAll(result);
		  	this.setState(getState());

		  }.bind(this));

	  GroceryStore.addChangeListener(this._onChange);
	  RecipeStore.addChangeListener(this._onChange);
	  MealStore.addChangeListener(this._onChange);
	},

	componentWillUnmount() {		
		GroceryStore.removeChangeListener(this._onChange);
		RecipeStore.removeChangeListener(this._onChange);
		MealStore.removeChangeListener(this._onChange);
	},

	_onChange() {
		this.setState(getState());
	},

	_onSave(text) {
		if (text.trim()){
	      AppActions.create(text);
	    }
	},

	_onDrop(item) {
		AppActions.toggleIsInRecipeFinder(item);
	},

	_mealPlanOnEntityDrop(entity) {
		//console.log('entity dropped');
		//console.dir(entity);
		this.setState({
			entityInMealPlanner:entity
		})
	},

	_onRecipeFinderSubmit() {
		var itemsInRecipeFinder = GroceryStore.getItemsInRecipeFinder();
		var ingredients = [];

		for(var item in itemsInRecipeFinder) {
			ingredients.push(itemsInRecipeFinder[item].text);
		}

		Superagent
		  .get('/recipe/find?ingredients=' + ingredients.join(","))
		  .set('Accept', 'application/json')
		  .end(function(err, res){
		  	var data = JSON.parse(res.text);
		  	//console.log(data);

		  	this.setState({
		  		recipesList:data.recipes,
		  	});
		  	RecipeStore.setAll(data.recipes);

		  }.bind(this));

		  // For each item in recipe finder, set isInRecipeFinder to false 
		  //AppActions.unsetAllItemsInRecipeFinder(itemsInRecipeFinder);
	},

	_onNewRecipeFormSubmit(recipeName,recipeIngredients,recipeInstructions,recipeCookingTime,recipeYield) {

		AppActions.recipeCreate({
		   		recipeName: recipeName,
		   		recipeIngredients: recipeIngredients,
		   		recipeInstructions: recipeInstructions,
		   		recipeCookingTime: recipeCookingTime,
		   		recipeYield: recipeYield
		});

		//AppActions.unsetAllItemsInRecipeFinder(this.state.itemsInRecipeFinder);
	},

	// Display form to add a new recipe only when there are item(s) in recipe finder
	getCreateRecipeForm(){
		for(var item in this.state.itemsInRecipeFinder) {
			if(item) {
				return (
					<section>
				      	<CreateRecipe 
				      		ingredients={this.state.itemsInRecipeFinder} 
				      		onNewRecipeFormSubmit={this._onNewRecipeFormSubmit} 
				       		headingText="Add a New Recipe" /> 
			        </section>
				);
			} else {
				return '';
			}
		}
	},

	_mealPlannerFormSubmit(newMealTimestamp){
		var mealType = "item";
		if(this.state.entityInMealPlanner.recipeName){
			mealType = "recipe";
		}
		
		AppActions.scheduleMeal(mealType,this.state.entityInMealPlanner,newMealTimestamp);
		AppActions.unsetAllItemsInRecipeFinder(this.state.itemsInRecipeFinder);

		this.setState({
			entityInMealPlanner:{},
			recipesList:{}
		});
	},

	doesRecipeFinderHaveItems(){
		for(var item in this.state.itemsInRecipeFinder) {
			if(item) {
				return true;
			} else {
				return false;
			}
		}
	},

	_onToggleListEleClick(e){
		e.preventDefault();

		if(document.getElementById("newGroceryInput") !== null) {
			var isGroceryInputHidden = (document.getElementById("newGroceryInput").offsetParent === null);

			if(! isGroceryInputHidden){
				document.getElementById("shopping-list-container").style.display = 'none';
				document.getElementById("pantry-list-container").style.display = '';
				document.getElementById('toggle-list').innerHTML = "Pantry";

			} else {
				document.getElementById("pantry-list-container").style.display = 'none';
				document.getElementById("shopping-list-container").style.display = '';
				document.getElementById('toggle-list').innerHTML = "Shopping List";
				document.getElementById("newGroceryInput").focus();
			}
		}	

	},

	getToggleListEle(){

		var text = 'Pantry';

		return (
			<h3 className="text-center" 
				onClick={this._onToggleListEleClick} 
				id="toggle-list">
				{text}
			</h3>
		);
	},

	render() {
		return (
			<section>
				<section style={{'background':'rgba(55, 58, 59, 0.49)'}} className="container-fluid">
					<section style={{"marginLeft":"1rem"}} className="col-md-2">
						<div className="row">
							{this.getToggleListEle()}
							<section className="fixed-height" id="shopping-list-container">
						      	<ShopForInput 
						      		onSave={this._onSave} 
						      		placeholder="Add a new item here.." />
						      	<ShopForList 
						      		listClassName="" 
						      		draggable="false" 
						      		items={this.state.shoppingList} />
						    </section>
							<section className="fixed-height" id="pantry-list-container">
						        <PantryList 
						        	listClassName="draggable-list" 
						        	draggable="true" 
						        	items={this.state.pantryList} />
					        </section>
					    </div>
					</section>
		        	<section className="col-md-9">
						<section id="recipe-finder-container" className="col-md-5">
							<RecipeFinder
								btnText="Find Recipes" 
					        	onRecipeFinderSubmit={this._onRecipeFinderSubmit} 
					        	title="Recipe Finder" 
			    		    	onDrop={this._onDrop}
			        			items={this.state.itemsInRecipeFinder}
			        			isShowSubmitBtn={this.doesRecipeFinderHaveItems()} />
			        		<RecipesList 
			        			listClassName="draggable-list" 
			        			recipes={this.state.recipesList} />
						</section>
						<section className="col-md-1"></section>
						<section className="col-md-5">
							{this.getCreateRecipeForm()}
			        	</section>
		        	</section>
		        	<section style={{'marginLeft':'1.2rem'}} className="clearfix col-md-4">
		        		<MealPlan 
							mealPlanOnEntityDrop={this._mealPlanOnEntityDrop}
							droppedEntity={this.state.entityInMealPlanner}
							mealPlannerFormSubmit={this._mealPlannerFormSubmit} 
							headingText="Plan a Meal" />
			        </section>
				</section>
				<section style={{'background':'rgba(75, 75, 75, 0.61)'}} className="container-fluid">
					<section>
						<Calendar 
							headingText="Meal Calendar" 
							mealCalendarItems={this.state.mealCalendarItems} />
					</section>
		        </section>
		        <div></div>
	        </section>
		);
	}
});

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App} />
    <Route path="/recipe/:id" component={RecipePage}/>
  </Router>
), document.getElementById('app'))