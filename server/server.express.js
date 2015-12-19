import Express from "express";
import {
  RecipesFind, Recipe
} from './routes';

export default function (port, isProduction) {
  var server = Express ();
  server.set ('json spaces', 3);

  /** Prevents serving files inside ./dist
      during development workflow **/
  if (isProduction) {
    server.use ('/', Express.static ('dist'));
  }

server.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
  next();
});

  server.use('/recipes/find', RecipesFind);
  server.use('/recipe/id', Recipe);

  server.listen (port, () => {
    console.log ('Express is listening on port ' + port);
  });
};