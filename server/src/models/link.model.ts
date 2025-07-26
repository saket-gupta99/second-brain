import { Schema, model } from "mongoose";
import { ILink } from "../custom.js";

const linkSchema = new Schema<ILink>({
  hash: {
    type: String,
    required: true,
    unique: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  isActive: { type: Boolean, default: false },
});

export const Link = model<ILink>("Link", linkSchema);
