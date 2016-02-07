import Express from 'express';
let router = Express.Router ();
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/mealplanner';

var findRecipes = function(db,reqIngredients, callback) {

    db.collection('recipes').find({ $text: { $search: reqIngredients, $caseSensitive:false }},{limit:4}).toArray(
    	function (err, result) {
	      if (err) {
	        console.log(err);
	      } else if (result.length) {
			//console.log('Docs found');
	      } else {
	        console.log('No recipes found');
	      }
	      callback(result);
	      db.close();
    	});
};

router.get ('/', (request, response) => {

  response.setHeader('Content-Type', 'application/json');
  
  var reqIngredients = request.query.ingredients;
  // convert reqIngredients to a string separated by spaces
  reqIngredients = reqIngredients.split(",");
  reqIngredients = reqIngredients.join(" ");

  MongoClient.connect(url, function(err, db) {

	  assert.equal(null, err);
	  
	  findRecipes(db, reqIngredients, function(recipesFound) {
	  	if(recipesFound.length) {

	  		// Array to Object
	  		var recipesFoundObj = {};
	  		for(var index in recipesFound){
				recipesFoundObj[recipesFound[index]["_id"]] = recipesFound[index];
			}

			response.send({
				"recipes":recipesFoundObj
			});
	  	} else {
	  		response.send({
				"recipes":{}
			});
	  	}  
	  });
	});
});

export default router;