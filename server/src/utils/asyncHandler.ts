import { NextFunction, Request, Response } from "express";

type RequestHandlerFunction = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any> | void;

export const asyncHandler = (
  requestHandler: RequestHandlerFunction
): RequestHandlerFunction => {
  return (req: Request, res: Response, next: NextFunction) => {
    return Promise.resolve(requestHandler(req, res, next)).catch(next);
  };
};
