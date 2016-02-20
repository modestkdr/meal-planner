var Express = require('express');
let router = Express.Router ();

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/mealplanner';

var findRecipe = function(db,recipeId, callback) {

    db.collection('recipes').find({ "_id" : ObjectId(recipeId) }).toArray(
    	function (err, result) {
	      if (err) {
	        console.log(err);
	      } else if (result.length) {
			//console.log('Docs found');
	      } else {
	        console.log('No recipe found');
	      }
	      callback(result[0]);
	      db.close();
    	});
};

router.get ('/:id', (request, response) => {

  response.setHeader('Content-Type', 'application/json');
  
  var recipeId = request.params.id;

  MongoClient.connect(url, function(err, db) {

	  assert.equal(null, err);
	  
	  findRecipe(db, recipeId, function(recipeFound) {
	  	if(recipeFound._id) {

			response.send({
				"recipe":recipeFound
			});
	  	} else {
	  		response.send({
				"recipe":{}
			});
	  	}  
	  });
	});
});

export default router;