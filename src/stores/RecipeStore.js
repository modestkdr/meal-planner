var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var AppConstants = require('../constants/AppConstants');
var ConfigConstants = require('../constants/ConfigConstants');
var assign = require('object-assign');
var CHANGE_EVENT = 'change';

var _recipeList = {};

function find(id){
  return _recipeList[id];
}

function create(recipe,id) {
  _recipeList[id] = {
    id:id,
    _id:id,
    recipeName: recipe.recipeName,
    recipeIngredients: recipe.recipeIngredients,
    recipeInstructions: recipe.recipeInstructions,
    recipeCookingTime: recipe.recipeCookingTime,
    recipeYield: recipe.recipeYield
  }; 
}

var RecipeStore = assign({}, EventEmitter.prototype, {

  find(id) {
      return find(id);
  },

  create(recipe,id) {
    return create(recipe, id);
  },

  getAll() {
    return _recipeList;
  },

  setAll(recipeList) {
    _recipeList = recipeList;
  },

  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

// Register callback to handle all updates
AppDispatcher.register(function(action) {

  switch(action.actionType) {
    
    case AppConstants.RECIPE_CREATE:
      if(action.id.trim() !== '' && action.recipe.recipeName !== '') {
        create(action.recipe,action.id);
        RecipeStore.emitChange();
      }
    break;

    case AppConstants.FIND_RECIPE:
      if (action.id.trim() !== '') {
        find(action.id);
        RecipeStore.emitChange();
      }
    break;
      
    default:    
  }
});

module.exports = RecipeStore;
