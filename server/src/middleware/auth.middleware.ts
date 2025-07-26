import { User } from "../models/user.model.ts";
import { ApiError } from "../utils/apiError.ts";
import { asyncHandler } from "../utils/asyncHandler.ts";
import jwt from "jsonwebtoken";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    const token = req.cookies.authToken;
    if (!token)
      throw new ApiError(401, "Unauthorized request: No token provided");

    const decodeToken = jwt.verify(token, process.env.JWT_SECRET as string) as {
      _id: string;
    };

    if (!decodeToken) throw new ApiError(401, "Invalid token: Decode failed");

    const user = await User.findById(decodeToken._id);

    if (!user) throw new ApiError(404, "User not found");

    req.user = user;
    next();
  } catch (error: any) {
    if (error instanceof ApiError) {
      throw error;
    }

    if (error.name === "TokenExpiredError") {
      throw new ApiError(401, "Token expired");
    } else if (error.name === "JsonWebTokenError") {
      throw new ApiError(401, "Invalid token");
    } else {
      throw new ApiError(
        500,
        "Internal Server Error during token verification"
      );
    }
  }
});
