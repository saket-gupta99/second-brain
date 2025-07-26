import express from "express";
import { validate } from "../middleware/validate.middleware.ts";
import { createUserSchema, loginSchema } from "../schemas/user.schema.ts";
import { getCurrentUser, signin, signup } from "../controllers/user.controller.ts";
import { verifyJWT } from "../middleware/auth.middleware.ts";

const userRouter = express.Router();

userRouter.route("/signup").post(validate(createUserSchema), signup);
userRouter.route("/signin").post(validate(loginSchema), signin);
userRouter.route("/current-user").get(verifyJWT, getCurrentUser);

export default userRouter;