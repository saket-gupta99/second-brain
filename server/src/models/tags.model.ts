import {Schema, model} from "mongoose";
import { ITags } from "../custom.js";

const tagsSchema = new Schema<ITags>({
    title: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    }
});

export const Tags = model<ITags>("Tags", tagsSchema);