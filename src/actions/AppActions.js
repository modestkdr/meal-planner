var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var ConfigConstants = require('../constants/ConfigConstants');
var Firebase = require('firebase');

var AppActions = {

  create(text) {
    var firebaseRef = new Firebase(ConfigConstants.Firebase_Root_Url + 'groceries');
    firebaseRef.push({
        text: text,
        isInPantry:false,
        isInRecipeFinder:false
      });

    AppDispatcher.dispatch({
      actionType: AppConstants.SHOP_FOR_CREATE,
      text: text
    });
  },

  updateText(id, text) {
    AppDispatcher.dispatch({
      actionType: AppConstants.SHOP_FOR_UPDATE_TEXT,
      id: id,
      text: text
    });
  },

  toggleIsInRecipeFinder(item) {

    var firebaseRef = new Firebase(ConfigConstants.Firebase_Root_Url + 'groceries');
    firebaseRef.child(item.id).update({
      isInRecipeFinder: ! item.isInRecipeFinder
    });

    AppDispatcher.dispatch({
      actionType: AppConstants.RECIPE_FINDER_ITEM_DROP,
      id: item.id
    });
  },

  toggleComplete(item) {
    var actionType = item.isInPantry ? AppConstants.SHOP_FOR_UNDO_COMPLETE : AppConstants.SHOP_FOR_COMPLETE;

    var firebaseRef = new Firebase(ConfigConstants.Firebase_Root_Url + 'groceries');
    firebaseRef.child(item.id).update({
      isInPantry: ! item.isInPantry
    });

    AppDispatcher.dispatch({
      actionType: actionType,
      id: item.id
    });
  },

  destroy(id) {
    var firebaseRef = new Firebase(ConfigConstants.Firebase_Root_Url + 'groceries');
    firebaseRef.child(id).remove();

    AppDispatcher.dispatch({
      actionType: AppConstants.SHOP_FOR_DESTROY,
      id: id
    });
  },

  scheduleMeal(itemText,timestamp){
    var firebaseRef = new Firebase(ConfigConstants.Firebase_Root_Url + 'mealcalendar');
    
    firebaseRef.push({
        text: itemText,
        planned_for:timestamp,
        mealType:"item"
    });

    AppDispatcher.dispatch({
      actionType: AppConstants.SCHEDULE_MEAL,
      itemText:itemText,
      mealType:"item",
      planned_for:timestamp
    });
  },

  unsetAllItemsInRecipeFinder(items){
    var firebaseRef = new Firebase(ConfigConstants.Firebase_Root_Url + 'groceries');

    for(var index in items){
      firebaseRef.child(items[index].id).update({
        isInRecipeFinder: false
      });
    }

    AppDispatcher.dispatch({
      actionType:AppConstants.UNSET_ALL_ITEMS_IN_RECIPE_FINDER,
      items:items
    })
  },

};

module.exports = AppActions;