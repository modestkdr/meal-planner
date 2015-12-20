import Express from 'express';
let router = Express.Router ();

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/recipes';

var insertDocument = function(db, reqData, callback) {
	
	//Convert ingredients from string (with newlines) to Array
	reqData.recipeIngredients = reqData.recipeIngredients.split("\n");

	var recipeIngredientsArr = [];
	for(var index in reqData.recipeIngredients) {
		recipeIngredientsArr.push(reqData.recipeIngredients[index].toLowerCase());
	}
	reqData.recipeIngredients = recipeIngredientsArr;
	
	db.collection('recipes').insertOne(reqData, function(err, result) {
    	assert.equal(err, null);
    	//console.log("Inserted a document into the recipes collection.");
    	//console.log('result');
    	//console.log(result);
    	callback(result);
  });
};

router.post('/', (request, response) => {
	
	var reqData = request.body;
	//console.log('Request data');
	//console.log(reqData);

	MongoClient.connect(url, function(err, db) {

	  assert.equal(null, err);
	  
	  insertDocument(db, reqData, function(result) {

	    db.close();
    	
    	response.setHeader('Content-Type', 'application/json');
	  	response.send ({
			"recipeId": result.insertedId
		});

	  });
	});
});

export default router;