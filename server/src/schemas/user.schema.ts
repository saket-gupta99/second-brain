import { z } from "zod";

export const createUserSchema = z.object({
  username: z
    .string()
    .min(3, "username must be atleast 3 characters long")
    .max(10, "username must be at most 10 characters long"),
  password: z
    .string()
    .min(8, "password must be atleast of length 8")
    .max(20, "password should be less than 20 length long")
    .regex(/[A-Z]/, "password must contain atleast one uppercase character")
    .regex(/[a-z]/, "password must contain atleast 1 lowercase character")
    .regex(/[0-9]/, "password must atleast have 1 number")
    .regex(
      /[^a-zA-Z0-9]/,
      "password should atleast have one special character"
    ),
});

export const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
});
