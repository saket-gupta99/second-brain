import express, { NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import { dbConnection } from "./configs/db.ts";
import { ApiError } from "./utils/apiError.ts";
import userRouter from "./routes/user.route.ts";
import contentRouter from "./routes/content.route.ts";

dotenv.config({
  path: "./.env",
});

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

dbConnection()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at port: ${process.env.PORT}`);
    });
    console.log("DB connected");
  })
  .catch(() => {
    console.log("DB not connected");
  });

app.use("/api/v1", userRouter);
app.use("/api/v1", contentRouter);

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof ApiError) {
    return res.status(error.statusCode).json({
      message: error.message,
      success: error.success,
      data: error.data,
      errors: error.errors,
    });
  }

  console.error("Unhandled error: ", error);
  res.status(500).json({
    message: "Internal server error",
    success: false,
    errors: [],
    data: null,
  });
});
