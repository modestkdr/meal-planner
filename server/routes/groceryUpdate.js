var Express = require('express');
let router = Express.Router ();

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/mealplanner';

var updateGrocery = function(db, reqData, callback) {
	//console.log('Update grocery: request data');
	//console.log(reqData);

	var groceryId = reqData.id;
	var updates = {};

	if(reqData.hasOwnProperty("isInPantry")) {
		updates["isInPantry"] = reqData.isInPantry;
	}

	if(reqData.hasOwnProperty("isInRecipeFinder")) {
		updates["isInRecipeFinder"] = reqData.isInRecipeFinder;
	}

	// console.log('grocery id');
	// console.log(groceryId);
	// console.log('updates');
	// console.log(updates);

   db.collection('groceries').updateOne(
      { "_id" : ObjectId(groceryId) },
      { $set: updates },
      function(err, result) {
        //console.log(result);
        callback(result);
   });
};

router.post('/', (request, response) => {
	var reqData = request.body;

	MongoClient.connect(url, function(err, db) {

	  assert.equal(null, err);
	  
	  updateGrocery(db, reqData, function(result) {
    	//console.log(result);
    	response.setHeader('Content-Type', 'application/json');
	  	response.send ({
			"result": result
		});

		db.close();

	  });
	});
});

export default router;