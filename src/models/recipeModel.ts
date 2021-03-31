/*
 * Model for all recipes data
 */
import { model, Schema, Document, Model } from "mongoose";

export interface IRecipe extends Document {
  title: string;
  ingredients: Array<string>;
  instructions: Array<string>;
  dateAdded: Date;
  sourceURL: string;
  description?: string;
}

const RecipeSchema = new Schema(
  {
    title: { type: String, required: true },
    ingredients: [{ type: String, required: true }],
    instructions: [{ type: String, required: true }],
    dateAdded: { type: String, required: true },
    sourceURL: { type: String, required: false },
    description: { type: String, required: false },
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
    timestamps: true,
  }
);

// create RecipesModel class from schema
const Recipe: Model<IRecipe> = model("Recipe", RecipeSchema);

export default Recipe;
