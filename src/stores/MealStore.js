var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var AppConstants = require('../constants/AppConstants');
var assign = require('object-assign');
var CHANGE_EVENT = 'change';

var _mealCalendarItems = {};

function scheduleMeal(text,mealType,plannedFor,id,recipeId) {
  _mealCalendarItems[id] = {
    id: id,
    planned_for:plannedFor,
    mealType:mealType,
    text: text,
    recipeId:recipeId
  };
}

function removeMeal(id) {
  delete _mealCalendarItems[id];
}

var MealStore = assign({}, EventEmitter.prototype, {

  getAllMealItems(){
    return _mealCalendarItems;
  },

  setAll(mealCalendarItems) {
    _mealCalendarItems = mealCalendarItems;
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

    case AppConstants.SCHEDULE_MEAL:
      scheduleMeal(action.itemText,action.mealType,action.planned_for,action.id,action.recipeId);
      MealStore.emitChange();
      break;

    case AppConstants.REMOVE_ITEM_FROM_CALENDAR:
      removeMeal(action.id);
      MealStore.emitChange();
      break;

    default:    
  }
});

module.exports = MealStore;
