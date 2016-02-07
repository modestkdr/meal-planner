# Meal Planner

Seed Corpora collection in MongoDB

mongoimport --db mealplanner --collection corpora --file <your-file-path>/db-seed-corpora.json --upsert --upsertFields=keywords

Seed Recipes collection in MongoDB
mongoimport --db mealplanner --collection recipes --file <your-file-path>/db-seed-recipes.json --upsert --upsertFields=recipeIngredients


Create indexes

use mealplanner
db.corpora.createIndex({keywords:"text"})
db.recipes.createIndex({recipeIngredients:"text"})