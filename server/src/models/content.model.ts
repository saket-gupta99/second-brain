import {Schema, model} from "mongoose";
import { IContent } from "../custom.js";

const contentSchema = new Schema<IContent>({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    linkUrl: {
        type:String,
    },
    type: {
        type: String,
        enum: ["tweet", "document", "video", "audio", "article"]
    },
    content: {
        type: String,
    },
    tags: [{
        type: Schema.Types.ObjectId,
        ref: "Tags",
        required: true,
    }],
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {timestamps: true});

export const Content = model<IContent>("Content", contentSchema);