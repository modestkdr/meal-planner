var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var AppConstants = require('../constants/AppConstants');
var ConfigConstants = require('../constants/ConfigConstants');
var assign = require('object-assign');
var Firebase = require('firebase');
var CHANGE_EVENT = 'change';

var _mealCalendarItems = {};

function scheduleMeal(text,mealType,plannedFor) {
  var ref = new Firebase(ConfigConstants.Firebase_Root_Url + "mealcalendar");
  ref.on("child_added", function(snapshot) {

    if(! _mealCalendarItems[snapshot.key()]) {
      _mealCalendarItems[snapshot.key()] = {
        id: snapshot.key(),
        planned_for:plannedFor,
        mealType:"item",
        text: text
      };

    }    
  });
  ref.off();
}

var MealStore = assign({}, EventEmitter.prototype, {

  getAllMealItems(){
    return _mealCalendarItems;
  },

  setAllMealItems(mealCalendarItems) {
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
      scheduleMeal(action.itemText,action.mealType,action.planned_for);
      MealStore.emitChange();
      break;
      
    default:    
  }
});

module.exports = MealStore;
