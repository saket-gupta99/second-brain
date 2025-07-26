import mongoose, { Document } from "mongoose";

interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  username: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  generateJWT: () => string;
  isPasswordCorrect: (password: string) => boolean;
}

interface IContent extends Document {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  tags?: mongoose.Types.ObjectId;
  title: string;
  linkUrl?: string;
  type: "document" | "tweet" | "video" | "audio" | "article";
  content?: string;
  createdAt: Date;
  updatedAt: Date;
}

interface ITags extends Document {
  _id: mongoose.Types.ObjectId;
  title: string;
}
interface ILink extends Document {
  _id: mongoose.Types.ObjectId;
  hash: string;
  userId: mongoose.Types.ObjectId;
  isActive: boolean;
}

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}
