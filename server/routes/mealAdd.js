var Express = require('express');
let router = Express.Router ();

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/mealplanner';

var insertDocument = function(db, reqData, callback) {
	//console.log('Meal add: request data');
	//console.log(reqData);
	
	// Convert date string to Date Object
	reqData.planned_for = new Date(reqData.planned_for);

	db.collection('meals').insertOne(reqData, function(err, result) {
    	assert.equal(err, null);
    	callback(result);
  });
};

router.post('/', (request, response) => {
	var reqData = request.body;

	MongoClient.connect(url, function(err, db) {

	  assert.equal(null, err);
	  
	  insertDocument(db, reqData, function(result) {
	  	//console.log(result);
	    db.close();
    	
    	response.setHeader('Content-Type', 'application/json');
	  	response.send ({
			"mealId": result.insertedId,
			"mealTimestamp":result.ops[0].planned_for,
			"recipeId":result.ops[0].recipeId
		});

	  });
	});
});

export default router;