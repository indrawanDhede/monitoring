import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import CustomError from "../middleware/error_handler";

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const message:  string = errors
      .array()
      .map((error) => error.msg)
      .join(", ");
    throw new CustomError(422, message)
  }
  next();
};
