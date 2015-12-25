import Express from "express";
import {
  GroceryAdd,GroceryUpdate,GroceryRemove,GroceriesFind,RecipesFind,Recipe,RecipeAdd,MealAdd,MealsFind
} from './routes';

export default function (port, isProduction) {
  var server = Express ();
  server.use(Express.static('assets'));
  
  var bodyParser = require('body-parser');
  

  server.set ('json spaces', 3);

  /* Prevents serving files inside ./dist during development workflow */
  if (isProduction) {
    server.use ('/', Express.static ('dist'));
  }

  server.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
    next();
  });

  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: true }));

  server.use('/grocery/add', GroceryAdd);
  server.use('/grocery/update', GroceryUpdate);
  server.use('/grocery/remove',GroceryRemove);
  server.use('/grocery/find',GroceriesFind);
  server.use('/recipe/add', RecipeAdd);
  server.use('/recipe/find', RecipesFind);
  server.use('/recipe/id', Recipe);
  server.use('/meal/add', MealAdd);
  server.use('/meal/find',MealsFind);

  server.listen (port, () => {
    console.log ('Express is listening on port ' + port);
  });
};