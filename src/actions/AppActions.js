var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var ConfigConstants = require('../constants/ConfigConstants');
var Firebase = require('firebase');
var Superagent = require('superagent');

var AppActions = {

  create(text) {
    
    Superagent
       .post('/grocery/add')
       .send({
          text: text,
          isInPantry:false,
          isInRecipeFinder:false
        })
       .set('Accept', 'application/json')
       .end(function(err, res){
         if (err || !res.ok) {
           console.log('grocery add: error');
         } else {
          //console.log('grocery create: xhr success');
          //console.log(res.body.groceryId);

          AppDispatcher.dispatch({
            actionType: AppConstants.SHOP_FOR_CREATE,
            text: text,
            id: res.body.groceryId
          });

         }
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

    Superagent
       .post('/grocery/update')
       .send({
          id: item.id,
          isInRecipeFinder: ! item.isInRecipeFinder
        })
       .set('Accept', 'application/json')
       .end(function(err, res){
         if (err || !res.ok) {
           console.log('grocery update: error');
         } else {
          //console.log('grocery update: xhr success');
          //console.log(JSON.stringify(res.body));
         }
       });

    AppDispatcher.dispatch({
      actionType: AppConstants.RECIPE_FINDER_ITEM_DROP,
      id: item.id
    });
  },

  toggleComplete(item) {
    
    var actionType = item.isInPantry ? AppConstants.SHOP_FOR_UNDO_COMPLETE : AppConstants.SHOP_FOR_COMPLETE;

    Superagent
       .post('/grocery/update')
       .send({
          id: item.id,
          isInPantry: ! item.isInPantry
        })
       .set('Accept', 'application/json')
       .end(function(err, res){
         if (err || !res.ok) {
           console.log('grocery update: error');
         } else {
          //console.log('grocery update: xhr success');
          //console.log(JSON.stringify(res.body));
         }
       });

    AppDispatcher.dispatch({
      actionType: actionType,
      id: item.id
    });
  },

  destroy(id) {

    Superagent
       .post('/grocery/remove')
       .send({
          id: id
        })
       .set('Accept', 'application/json')
       .end(function(err, res){
         if (err || !res.ok) {
           console.log('grocery remove: error');
         } else {
          //console.log('grocery remove: xhr success');
          //console.log(JSON.stringify(res.body));
         }
       });

    AppDispatcher.dispatch({
      actionType: AppConstants.SHOP_FOR_DESTROY,
      id: id
    });
  },

  scheduleMeal(mealType,entity,timestamp){
    
    var firebaseRef = new Firebase(ConfigConstants.Firebase_Root_Url + 'mealcalendar');

    if(mealType === "recipe")
    {
      firebaseRef.push({
        text: entity.recipeName,
        planned_for:timestamp,
        mealType:"recipe"
      });

      AppDispatcher.dispatch({
        actionType: AppConstants.SCHEDULE_MEAL,
        itemText:entity.recipeName,
        mealType:"recipe",
        planned_for:timestamp
      });

    } else {
        firebaseRef.push({
          text: entity.text,
          planned_for:timestamp,
          mealType:"item"
        });

        AppDispatcher.dispatch({
          actionType: AppConstants.SCHEDULE_MEAL,
          itemText:entity.text,
          mealType:"item",
          planned_for:timestamp
        });
    }
  },

  unsetAllItemsInRecipeFinder(items) {

    for(var index in items){
      
      Superagent
       .post('/grocery/update')
       .send({
          id: items[index].id,
          isInRecipeFinder: false
        })
       .set('Accept', 'application/json')
       .end(function(err, res){
         if (err || !res.ok) {
           console.log('grocery update: error');
         } else {
          //console.log('grocery update: xhr success');
          //console.log(JSON.stringify(res.body));
         }
       });
    }

    AppDispatcher.dispatch({
      actionType:AppConstants.UNSET_ALL_ITEMS_IN_RECIPE_FINDER,
      items:items
    })
  },

};

module.exports = AppActions;