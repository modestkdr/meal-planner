import RecipeAdd from './routes/recipeAdd';
import RecipesFind from './routes/recipesFind';
import Recipe from './routes/recipe';

/** Gathers and exports all Express routes
    for easier importing within the Express configuration
    -- server.express.js **/
export default {
  RecipeAdd,RecipesFind,Recipe
};
