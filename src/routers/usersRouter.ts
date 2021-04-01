/*
 * Route actions for users schema.
 */

import { Router } from "express";
import * as User from "../controllers/userController";

const UsersRouter = Router();

UsersRouter.route("/").get(User.getUsers).post(User.createUser);
UsersRouter.route("/:id")
  .get(User.getUser)
  .put(User.updateUser)
  .delete(User.deleteUser);

export default UsersRouter;
