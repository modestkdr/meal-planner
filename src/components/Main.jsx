import React from 'react';
var ReactDOM = require('react-dom');
import {  Router, Route, IndexRoute, Link } from 'react-router';
var Firebase = require('firebase');
var Superagent = require('superagent');
var ConfigConstants = require('../constants/ConfigConstants');
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
var MealPlan = require('../components/MealPlan');
var Calendar = require('../components/Calendar');

function getState(){
  	return {
      pantryList: GroceryStore.getPantryList(),
      shoppingList: GroceryStore.getShoppingList(),
      itemsInRecipeFinder: GroceryStore.getItemsInRecipeFinder(),
      recipesList:{},
      mealCalendarItems:MealStore.getAllMealItems()
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
		  	
		  	for(var index in groceries){
		  		result[groceries[index]["_id"]] = groceries[index];
		    	result[groceries[index]["_id"]].id = groceries[index]["_id"];
		    }
		  	
		  	GroceryStore.setAll(result);
		  	this.setState(getState());

		  }.bind(this));

	  /* Get meal data from remote DB */
	  var mealItems = [];
	  var mealResult = {};
	  var firebaseRef = new Firebase(ConfigConstants.Firebase_Root_Url + 'mealcalendar');
	  firebaseRef.limitToLast(25).on('value', function(dataSnapshot) {
	    dataSnapshot.forEach(function(childSnapshot) {
	      var item = childSnapshot.val();
	      item['.key'] = childSnapshot.key();
	      mealItems.push(item);
	    });

	    for(var index in mealItems){
	      mealResult[mealItems[index][".key"]] = mealItems[index];
	      mealResult[mealItems[index][".key"]].id = mealItems[index][".key"];
	    }
	    /* Initally: Sync local store with remote DB */
	    MealStore.setAllMealItems(mealResult);
	    this.setState({
	    	mealCalendarItems: mealResult
	    });
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
		  AppActions.unsetAllItemsInRecipeFinder(itemsInRecipeFinder);
	},

	_onNewRecipeFormSubmit(recipeName,recipeIngredients,recipeInstructions,recipeCookingTime,recipeYield) {
		//console.log('Add this new recipe to recipe store' + recipeName);
		Superagent
		   .post('/recipe/add')
		   .send({
		   		recipeName: recipeName,
		   		recipeIngredients: recipeIngredients,
		   		recipeInstructions: recipeInstructions,
		   		recipeCookingTime: recipeCookingTime,
		   		recipeYield: recipeYield
		   	})
		   .set('Accept', 'application/json')
		   .end(function(err, res){
		     if (err || !res.ok) {
		       console.log('error');
		     } else {
		     	//console.log('xhr success');
		    	//console.log(JSON.stringify(res.body));
		     }
		   });

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

		this.setState({
			entityInMealPlanner:{}
		});
		document.getElementById('newMealTimestamp').value = '';
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

	_onToggleListBtnClick(){
		if(document.getElementById("shopping-list-container").offsetHeight === 0){
			document.getElementById("shopping-list-container").style.display = '';
			document.getElementById("pantry-list-container").style.display = 'none';
		} else {
			document.getElementById("pantry-list-container").style.display = '';
			document.getElementById("shopping-list-container").style.display = 'none';
		}

	},

	render() {
		return (
			<section>
				<section className="container-fluid">
					<section className="col-md-3">
						<div className="row">
							<button className="text-center btn btn-primary btn-xs"
							      			onClick={this._onToggleListBtnClick} 
							      			id="toggle-list-btn">
							      			Toggle 
							</button>
						</div>
						<div className="col-md-8">
							<section id="shopping-list-container">
								<h3>Shopping List</h3>								
						      	<ShopForInput 
						      		onSave={this._onSave} 
						      		placeholder="Add a new item here.." />
						      	<ShopForList 
						      		listClassName="fixed-height" 
						      		draggable="false" 
						      		items={this.state.shoppingList} />
						    </section>
							<section id="pantry-list-container">
								<h3>Pantry</h3>
						        <PantryList 
						        	listClassName="fixed-height draggable-list" 
						        	draggable="true" 
						        	items={this.state.pantryList} />
					        </section>
					    </div>
					</section>
		        	<section className="col-md-8">
						<section className="col-md-5">
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
						<div className="col-md-1"></div>
						<section className="col-md-6">
							{this.getCreateRecipeForm()}
			        	</section>
			        	<section className="row col-md-6">
							<MealPlan 
								mealPlanOnEntityDrop={this._mealPlanOnEntityDrop}
								droppedEntity={this.state.entityInMealPlanner}
								mealPlannerFormSubmit={this._mealPlannerFormSubmit} 
								headingText="Plan a Meal" />
						</section>
		        	</section>		        	
				</section>
				<section className="container-fluid">
					<section className="">
						<Calendar 
							headingText="Meal Calendar" 
							mealCalendarItems={this.state.mealCalendarItems} />
					</section>
		        </section>
	        </section>
		);
	}
});

ReactDOM.render(
  <App />,
  document.getElementById('app')
);