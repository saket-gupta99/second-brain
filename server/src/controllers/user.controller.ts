import { CookieOptions } from "express";
import { User } from "../models/user.model.ts";
import { ApiError } from "../utils/apiError.ts";
import { ApiResponse } from "../utils/apiResponse.ts";
import { asyncHandler } from "../utils/asyncHandler.ts";

export const signup = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const userExists = await User.findOne({ username });

  if (userExists) throw new ApiError(400, "User already exists");

  const user = await User.create({
    username,
    password,
  });

  if (!user) throw new ApiError(500, "Error creating user");

  const userWithLessFields = await User.findById(user._id).select("-password");

  return res
    .status(201)
    .json(
      new ApiResponse(201, "user created successfully", userWithLessFields)
    );
});

export const signin = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (!user) throw new ApiError(404, "User not found");

  const isPasswordCorrect = user.isPasswordCorrect(password);

  if (!isPasswordCorrect) throw new ApiError(400, "Incorrect credentials");

  const options:CookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
  };

  const token = user.generateJWT();

  const loggedUser = await User.findById(user._id).select("-password");

  return res
    .status(200)
    .cookie("authToken", token, options)
    .json(
      new ApiResponse(200, "login successful", { token, user: loggedUser })
    );
});

export const getCurrentUser = asyncHandler(async (req, res) => {
  if (!req.user) throw new ApiError(400, "Only authenticated users can visits");

  const userWithLessFields = await User.findById(req.user._id).select(
    "-password"
  );

  return res
    .status(200)
    .json(new ApiResponse(200, "current user fetched", userWithLessFields));
});
