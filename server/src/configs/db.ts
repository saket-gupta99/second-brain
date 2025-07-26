import mongoose from "mongoose";

export const dbConnection = async () => {
    try {
        return await mongoose.connect(process.env.MONGO_STRING as string);
    } catch (err) {
        process.exit(1);
    }
}
