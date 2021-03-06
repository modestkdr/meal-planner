import GroceryAdd from './routes/groceryAdd';
import GroceryUpdate from './routes/groceryUpdate';
import GroceryRemove from './routes/groceryRemove';
import GroceriesFind from './routes/groceriesFind';
import RecipeAdd from './routes/recipeAdd';
import RecipesFind from './routes/recipesFind';
import Recipe from './routes/recipe';
import MealAdd from './routes/mealAdd';
import MealsFind from './routes/mealsFind';
import MealRemove from './routes/mealRemove';

/** Gathers and exports all Express routes
    for easier importing within the Express configuration
    -- server.express.js **/
export default {
  GroceryAdd,GroceryUpdate,GroceryRemove,GroceriesFind,RecipeAdd,RecipesFind,Recipe,MealAdd,MealsFind,MealRemove
};
