import Express from 'express';
let router = Express.Router ();

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/test';

router.get ('/:id', (request, response) => {
  response.setHeader('Content-Type', 'application/json');

  // logic to get recipe # goes here

  response.send ({
	"recipe": {
		"id":request.params.id,
		"name": "Recipe name # " + request.params.id
	}});
});

export default router;