var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var ConfigConstants = require('../constants/ConfigConstants');
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
            id: res.body.groceryId,
            imgPath: res.body.imgPath
          });

         }
       });
  },

  recipeCreate(newRecipe) {
    
    Superagent
       .post('/recipe/add')
       .send(newRecipe)
       .set('Accept', 'application/json')
       .end(function(err, res){
         if (err || !res.ok) {
           console.log('error');
         } else {
          //console.log('xhr success');
          //console.log(JSON.stringify(res.body));
          AppDispatcher.dispatch({
            actionType: AppConstants.RECIPE_CREATE,
            recipe: newRecipe,
            id: res.body.recipeId
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
    
    if(mealType === "recipe")
    {
      Superagent
       .post('/meal/add')
       .send({
           text: entity.recipeName,
           planned_for:timestamp,
           mealType:"recipe",
           recipeId:entity._id
        })
       .set('Accept', 'application/json')
       .end(function(err, res){
         if (err || !res.ok) {
           console.log('Meal add: error');
         } else {
          //console.log('Meal add - recipe : xhr success');
          //console.log(res.body.mealId);

            AppDispatcher.dispatch({
              actionType: AppConstants.SCHEDULE_MEAL,
              itemText:entity.recipeName,
              mealType:"recipe",
              planned_for:res.body.mealTimestamp,
              id:res.body.mealId,
              recipeId:res.body.recipeId
            });

         }
       });
    } else {
      Superagent
       .post('/meal/add')
       .send({
          text: entity.text,
          planned_for:timestamp,
          mealType:"item"
        })
       .set('Accept', 'application/json')
       .end(function(err, res){
         if (err || !res.ok) {
           console.log('Meal add: error');
         } else {
          //console.log('Meal add - item : xhr success');
          //console.log(res.body.mealId);
          
            AppDispatcher.dispatch({
              actionType: AppConstants.SCHEDULE_MEAL,
              itemText: entity.text,
              planned_for:res.body.mealTimestamp,
              mealType:"item",
              id:res.body.mealId
            });

         }
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

  removeItemFromRecipeFinder(item) {

    Superagent
       .post('/grocery/update')
       .send({
          id: item.id,
          isInRecipeFinder: false
        })
       .set('Accept', 'application/json')
       .end(function(err, res){
         if (err || !res.ok) {
           console.log('grocery update: error');
         } else {
          //console.log('grocery update: xhr success');
          //console.log(JSON.stringify(res.body));
          AppDispatcher.dispatch({
            actionType: AppConstants.REMOVE_ITEM_FROM_RECIPE_FINDER,
            id: item.id
          });
         }
       });
  },

};

module.exports = AppActions;