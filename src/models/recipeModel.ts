/*
 * Model for all recipes data
 */
import mongoose, { model, Schema, Document, Model } from "mongoose";

export interface IRecipe extends Document {
  title: string;
  ingredients: {
    section1: {
      header: string;
      ingredients: Array<string>;
    };
    section2: {
      header: string;
      ingredients: Array<string>;
    };
    section3: {
      header: string;
      ingredients: Array<string>;
    };
    section4: {
      header: string;
      ingredients: Array<string>;
    };
    section5: {
      header: string;
      ingredients: Array<string>;
    };
  };
  instructions: {
    section1: {
      header: string;
      instructions: Array<string>;
    };
    section2: {
      header: string;
      instructions: Array<string>;
    };
    section3: {
      header: string;
      instructions: Array<string>;
    };
    section4: {
      header: string;
      instructions: Array<string>;
    };
    section5: {
      header: string;
      instructions: Array<string>;
    };
  };
  tags: Array<string>;
  calories: number;
  authorID: mongoose.Schema.Types.ObjectId;
  dateAdded: Date;
  sourceURL: string;
  description?: string;
}

const RecipeSchema = new Schema(
  {
    title: { type: String, required: true },
    ingredients: {
      section1: {
        header: { type: String },
        ingredients: [{ type: String, required: true }],
      },
      section2: {
        header: { type: String },
        ingredients: [{ type: String, required: true }],
      },
      section3: {
        header: { type: String },
        ingredients: [{ type: String, required: true }],
      },
      section4: {
        header: { type: String },
        ingredients: [{ type: String, required: true }],
      },
      section5: {
        header: { type: String },
        ingredients: [{ type: String, required: true }],
      },
    },
    instructions: {
      section1: {
        header: { type: String },
        instructions: [{ type: String }],
      },
      section2: {
        header: { type: String },
        instructions: [{ type: String }],
      },
      section3: {
        header: { type: String },
        instructions: [{ type: String }],
      },
      section4: {
        header: { type: String },
        instructions: [{ type: String }],
      },
      section5: {
        header: { type: String },
        instructions: [{ type: String }],
      },
    },
    tags: [{ type: String }],
    calories: { type: Number },
    authorID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    dateAdded: { type: Date, required: true },
    sourceURL: { type: String },
    description: { type: String },
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
