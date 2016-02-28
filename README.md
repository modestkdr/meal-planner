# Meal Planner

## Install Instructions
Assumptions: node, npm, mongodb are installed on your system.

		npm install

To run the application on your local environment (with Express and Webpack):

		sudo npm run-script dev

## Post Install
Run the following commands from the root DIR of your project

#### Seed Corpora collection in MongoDB
		mongoimport --db mealplanner --collection corpora --file db-seed-corpora.json --upsert --upsertFields=keywords

##### Seed Recipes collection in MongoDB
		mongoimport --db mealplanner --collection recipes --file db-seed-recipes.json --upsert --upsertFields=recipeIngredients

#### Create indexes for collections (corpora and recipes) in MongoDB
		mongo
		use mealplanner
		db.corpora.createIndex({keywords:"text"})
		db.recipes.createIndex({recipeIngredients:"text"})