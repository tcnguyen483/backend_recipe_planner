/*
 * Route actions for recipes schema.
 */

import { Router } from "express";
import * as Recipe from "../controllers/recipeController";

const RecipesRouter = Router();

RecipesRouter.route("/").get(Recipe.getRecipes).post(Recipe.createRecipe);
RecipesRouter.route("/:id")
  .get(Recipe.getRecipes)
  .put(Recipe.updateRecipe)
  .delete(Recipe.deleteRecipe);

export default RecipesRouter;
