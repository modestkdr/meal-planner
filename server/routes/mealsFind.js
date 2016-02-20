var Express = require('express');
let router = Express.Router ();
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/mealplanner';

var findMeals = function(db, callback) {

    db.collection('meals').find().sort( { planned_for: 1 }).toArray(
    	function (err, result) {
	      if (err) {
	        console.log(err);
	      } else if (result.length) {
			//console.log('Meal Docs found');
	      } else {
	        console.log('No meal docs found');
	      }
	      callback(result);
	      db.close();
    	});
};

router.get ('/', (request, response) => {

  response.setHeader('Content-Type', 'application/json');
  
  MongoClient.connect(url, function(err, db) {

	  assert.equal(null, err);
	  
	  findMeals(db, function(mealsFound) {
	  	if(typeof mealsFound !== 'undefined' && mealsFound.length) {

	  		// Array to Object
	  		var mealsFoundObj = {};
	  		for(var index in mealsFound){
				mealsFoundObj[mealsFound[index]["_id"]] = mealsFound[index];
			}

			response.send({
				"meals":mealsFoundObj
			});
	  	} else {
	  		response.send({
				"meals":{}
			});
	  	}  
	  });
	});
});

export default router;