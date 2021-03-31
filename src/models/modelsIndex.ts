/*
 * Credits:
 *   https://www.robinwieruch.de/mongodb-express-setup-tutorial
 */
import mongoose from "mongoose";
import Recipe from "./recipeModel";

const mongoURI = process.env.MONGO_URI || "mongodb://localhost/pho";

const connectDb = (): Promise<typeof mongoose> => {
  // Fix deprecation warnings https://mongoosejs.com/docs/deprecations.html
  mongoose.set("useNewUrlParser", true);
  mongoose.set("useCreateIndex", true);
  mongoose.set("useUnifiedTopology", true);
  mongoose.set("useFindAndModify", false);
  return mongoose.connect(mongoURI);
};

const models = { Recipe };

export { connectDb };

export default models;
