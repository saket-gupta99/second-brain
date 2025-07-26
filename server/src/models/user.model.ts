import mongoose, { Schema, model } from "mongoose";
import { IUser } from "../custom.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface UserModel extends mongoose.Model<IUser> {}

const userSchema = new Schema<IUser, UserModel>(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  return next();
});

userSchema.methods.generateJWT = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET as string, {
    expiresIn: "1d",
  });
};

userSchema.methods.isPasswordCorrect = async function (passwordInput: string) {
  return await bcrypt.compare(passwordInput, this.password);
};

export const User = model<IUser, UserModel>("User", userSchema);
