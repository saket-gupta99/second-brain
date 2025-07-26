import { NextFunction, Request, Response } from "express";
import { ZodError, ZodObject } from "zod";
import { ApiError } from "../utils/apiError.ts";

export const validate =
  (schema: ZodObject) => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.issues.map((issues) => {
          const path = issues.path.join(".");
          return `${path}: ${issues.message}`;
        });

        console.error("Zod validation failed", errorMessages);

        const apiError = new ApiError(400, "Validation failed", errorMessages);
        return next(apiError);
      }

      const apiError = new ApiError(
        500,
        "Internal Server Error during validation"
      );
      return next(apiError);
    }
  };
