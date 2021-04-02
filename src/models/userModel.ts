/*
 * Model for all user data
 */
import mongoose, { model, Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
  birthday?: Date;
  email: string;
  firstName: string;
  hashedPass: string;
  lastName: string;
  phoneNumber?: string;
  savedRecipes: Array<mongoose.Schema.Types.ObjectId>;
  suffix?: string;
  username: string;
  dateJoined: Date;
}

const UserSchema = new Schema(
  {
    birthday: { type: Date },
    email: { type: String, required: true },
    firstName: { type: String, required: true },
    hashedPass: { type: String, required: true },
    lastName: { type: String, required: true },
    phoneNumber: { type: Number },
    savedRecipes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        default: [] as Array<mongoose.Schema.Types.ObjectId>,
        ref: "Recipe",
      },
    ],
    suffix: { type: String },
    username: { type: String, required: true },
    dateJoined: { type: Date, required: true, default: new Date() },
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
