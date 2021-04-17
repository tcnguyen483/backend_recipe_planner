/*
 * Controller for User model. All functions related to User are written here.
 */

import User, { IUser } from "../models/userModel";

export const createUser = async (req, res) => {
  const user = await User.findOne({ auth0ID: req.body.auth0ID });
  if (!user) {
    const newUser: IUser = new User({
      auth0ID: req.body.auth0ID,
      savedRecipeIDs: req.body.savedRecipeIDs,
      recipeHistory: req.body.recipeHistory,
    });
    newUser
      .save()
      .then((result) => {
        res.status(200).json({ message: result });
      })
      .catch((error) => {
        res.status(500).json({ error });
      });
  } else {
    res.status(200).send(user);
  }
};

export const getUsers = async (_req, res) => {
  User.find({})
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.status(501).json({ error });
    });
};

export const getUser = async (req, res) => {
  User.findOne({ auth0ID: req.params.auth0ID })
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.status(502).json({ error });
    });
};

export const updateUser = async (req, res) => {
  const updates = req.body;
  User.findOneAndUpdate({ _id: req.params.id }, updates)
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.status(503).json({ error });
    });
};

export const deleteUser = async (req, res) => {
  User.findOneAndRemove({ _id: req.params.id })
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.status(504).json({ error });
    });
};
