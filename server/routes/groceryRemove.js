var Express = require('express');
let router = Express.Router ();

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/mealplanner';

var removeDocument = function(db, reqData, callback) {
	console.log('grocery remove: request data');
	
	console.log(typeof reqData.id);
	console.log(reqData.id);
	
	var groceryId = reqData.id;

	db.collection('groceries').deleteOne({"_id" : ObjectId(groceryId)}, function(err, result) {
    	assert.equal(err, null);
    	callback(result);
  });
};

router.post('/', (request, response) => {
	var reqData = request.body;

	MongoClient.connect(url, function(err, db) {

	  assert.equal(null, err);
	  
	  removeDocument(db, reqData, function(result) {

	    db.close();
    	
    	response.setHeader('Content-Type', 'application/json');
	  	response.send ({
			"result": result
		});

	  });
	});
});

export default router;