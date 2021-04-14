/*
 * Credits:
 *   https://www.robinwieruch.de/node-js-express-tutorial
 */

import express from "express";
import cors from "cors";
import morgan from "morgan";
import { connectDb } from "./models/modelsIndex";
import * as dotenv from "dotenv";
import {
  checkJwt,
  usersScopes,
  recipesScopes,
} from "./middleware/auth0.middleware";
import * as User from "./controllers/userController";
import * as Recipe from "./controllers/recipeController";

// initialize dotenv configuration
dotenv.config({ path: __dirname + "/.env" });

const port = process.env.PORT || 9090;

// Configure CORS policy
const corsOptions = {
  origin: "http://localhost:8080", // whitelisted origins
  optionsSuccessStatus: 200,
};

const app = express();

// Apply middleware
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// enable/disable http request logging
app.use(morgan("dev"));

// define a route handler for the root page
app.get("/", (req, res) => {
  return res.send("What are you trying to GET from the root?");
});

// ******************** USERS ROUTES ******************** //
app.get("/users/", checkJwt, usersScopes.readAllUsers, User.getUsers);
app.post("/users/", checkJwt, usersScopes.createUser, User.createUser);
app.get("/users/:id", checkJwt, usersScopes.readCurrentUser, User.getUser);
app.put("/users/:id", checkJwt, usersScopes.updateCurrentUser, User.updateUser);
app.delete("/users/:id", checkJwt, usersScopes.deleteUser, User.deleteUser);

// ******************** RECIPES ROUTES ******************** //
app.get("/recipes/", Recipe.getRecipes);
app.post("/recipes/", checkJwt, Recipe.createRecipe);
app.get("/recipes/:id", Recipe.getRecipe);
app.put(
  "/recipes/:id",
  checkJwt,
  recipesScopes.updateRecipe,
  Recipe.updateRecipe
);
app.delete(
  "/recipes/:id",
  checkJwt,
  recipesScopes.deleteRecipe,
  Recipe.deleteRecipe
);

// Connect to mongoDB and start the express server
connectDb()
  .then(() => {
    app.listen(port, () =>
      console.log(`RecipePlanner backend listening on port ${port}!`)
    );
  })
  .catch((err) => console.log(err));
