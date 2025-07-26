import express from "express";
import { verifyJWT } from "../middleware/auth.middleware.ts";
import { validate } from "../middleware/validate.middleware.ts";
import {
  createContentSchema,
  deleteContentSchema,
  shareContentSchema,
} from "../schemas/content.schema.ts";
import {
  createContent,
  deleteContent,
  getContent,
  previewLink,
  shareContentLink,
  showSharedContent,
} from "../controllers/content.controller.ts";
import { verify } from "crypto";

const contentRouter = express.Router();

contentRouter
  .route("/content")
  .post(verifyJWT, validate(createContentSchema), createContent);

contentRouter.route("/content").get(verifyJWT, getContent);

contentRouter
  .route("/content")
  .delete(verifyJWT, validate(deleteContentSchema), deleteContent);

contentRouter
  .route("/brain/share")
  .post(verifyJWT, validate(shareContentSchema), shareContentLink);
  
contentRouter.route("/brain/:shareLink").get(showSharedContent);

contentRouter.route("/preview").get(verifyJWT, previewLink)

export default contentRouter;
