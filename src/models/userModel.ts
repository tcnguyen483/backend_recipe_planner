/*
 * Model for all user data
 */
import mongoose, { model, Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
  auth0ID: string; // user->user_id in auth0 user profile
  savedRecipes: Array<mongoose.Schema.Types.ObjectId>;
  recipeHistory: Array<{
    recipe: mongoose.Schema.Types.ObjectId;
    date: Date;
    meal: string;
  }>;
}

const UserSchema = new Schema(
  {
    auth0ID: { type: String, required: true },
    savedRecipes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        default: [] as Array<mongoose.Schema.Types.ObjectId>,
        ref: "Recipe",
      },
    ],
    recipeHistory: [
      {
        recipe: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          default: [] as Array<mongoose.Schema.Types.ObjectId>,
          ref: "Recipe",
        },
        date: { type: Date, required: true },
        meal: String,
      },
    ],
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
    timestamps: true,
  }
);

// create UserModel class from schema
const User: Model<IUser> = model("User", UserSchema);

export default User;
