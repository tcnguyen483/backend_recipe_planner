/*
 * Controller for Recipe
 */

import Recipe, { IRecipe } from "../models/recipeModel";

export const createRecipe = async (req, res) => {
  const recipe: IRecipe = new Recipe({
    title: req.body.title,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions,
    dateAdded: req.body.dateAdded,
    sourceURL: req.body.sourceURL || null,
    description: req.body.description || null,
  });
  recipe
    .save()
    .then((result) => {
      res.status(200).json({ message: result });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const getRecipes = (_req, res) => {
  Recipe.find({})
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.status(501).json({ error });
    });
};

export const getRecipe = (req, res) => {
  Recipe.findOne({ name: req.params.id })
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.status(502).json({ error });
    });
};

export const updateRecipe = (req, res) => {
  const updates = req.body;
  Recipe.findOneAndUpdate({ name: req.params.id }, updates)
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.status(503).json({ error });
    });
};

export const deleteRecipe = (req, res) => {
  Recipe.findOneAndRemove({ name: req.params.id })
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.status(504).json({ error });
    });
};
