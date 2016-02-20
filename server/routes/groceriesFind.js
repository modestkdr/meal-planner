var Express = require('express');
let router = Express.Router ();
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/mealplanner';

var findGroceries = function(db, callback) {

    db.collection('groceries').find().sort( { _id: -1 } ).toArray(
    	function (err, result) {
	      if (err) {
	        console.log(err);
	      } else if (result.length) {
			//console.log('Docs found');
			//console.log(result);
	      } else {
	        console.log('No groceries found');
	      }
	      callback(result);
	      db.close();
    	});
};

router.get ('/', (request, response) => {

  response.setHeader('Content-Type', 'application/json');
  
  MongoClient.connect(url, function(err, db) {

	assert.equal(null, err);
	  
	findGroceries(db, function(groceriesFound) {
	  	if(groceriesFound.length) {

	  		// Array to Object
	  		var groceriesFoundObj = {};
	  		for(var index in groceriesFound){
				groceriesFoundObj[groceriesFound[index]["_id"]] = groceriesFound[index];
			}

			response.send({
				"groceries":groceriesFoundObj
			});
	  	} else {
	  		response.send({
				"groceries":{}
			});
	  	}  
	  });
	});
});

export default router;