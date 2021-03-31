/*
 * Controller for Recipe model. All functions related to Recipe are written here.
 */

import Recipe, { IRecipe } from "../models/recipeModel";

export const createRecipe = async (req, res) => {
  const recipe: IRecipe = new Recipe({
    title: req.body.title,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions,
    dateAdded: req.body.dateAdded || new Date(),
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

export const getRecipes = async (_req, res) => {
  Recipe.find({})
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.status(501).json({ error });
    });
};

export const getRecipe = async (req, res) => {
  Recipe.findOne({ _id: req.params.id })
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.status(502).json({ error });
    });
};

export const updateRecipe = async (req, res) => {
  const updates = req.body;
  Recipe.findOneAndUpdate({ _id: req.params.id }, updates)
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.status(503).json({ error });
    });
};

export const deleteRecipe = async (req, res) => {
  Recipe.findOneAndRemove({ _id: req.params.id })
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.status(504).json({ error });
    });
};
