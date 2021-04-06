/*
 * Credits:
 *   https://www.robinwieruch.de/node-js-express-tutorial
 */

import express from "express";
import cors from "cors";
import routes from "./routers/routerIndex";
import morgan from "morgan";
import { connectDb } from "./models/modelsIndex";
import * as dotenv from "dotenv";
import jwt from "express-jwt";
import jwks from "jwks-rsa";

// initialize dotenv configuration
dotenv.config({ path: __dirname + "/.env" });

const port = process.env.PORT || 9090;

// Configure CORS policy
const corsOptions = {
  origin: "*", // whitelisted origins
  optionsSuccessStatus: 200,
};

const app = express();

const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://recipe-planner.us.auth0.com/.well-known/jwks.json",
  }),
  audience: "https://recipe-planner-pho.herokuapp.com/",
  issuer: "https://recipe-planner.us.auth0.com/",
  algorithms: ["RS256"],
});

// Apply middleware
app.use(jwtCheck);
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// enable/disable http request logging
app.use(morgan("dev"));

// define a route handler for the root page
app.get("/", (req, res) => {
  return res.send("What are you trying to GET from the root?");
});

// Routers - add routes here as they are created
app.use("/recipes", routes.RecipesRouter);
app.use("/users", routes.UsersRouter);

// Connect to mongoDB and start the express server
connectDb()
  .then(() => {
    app.listen(port, () =>
      console.log(`RecipePlanner backend listening on port ${port}!`)
    );
  })
  .catch((err) => console.log(err));
