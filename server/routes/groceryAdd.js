import Express from 'express';
let router = Express.Router ();

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/mealplanner';

var insertDocument = function(db, reqData, callback) {
	console.log('grocery add: request data');
	console.log(reqData);
	
	var grocery = reqData;

	db.collection('groceries').insertOne(reqData, function(err, result) {
    	assert.equal(err, null);
    	callback(result);
  });
};

router.post('/', (request, response) => {
	var reqData = request.body;

	MongoClient.connect(url, function(err, db) {

	  assert.equal(null, err);
	  
	  insertDocument(db, reqData, function(result) {

	    db.close();
    	
    	response.setHeader('Content-Type', 'application/json');
	  	response.send ({
			"groceryId": result.insertedId
		});

	  });
	});
});

export default router;