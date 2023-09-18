import { Request, Response, NextFunction } from "express";
import { ErrorResponse } from "./error_handler";

const notFound = (req: Request, res: Response, next: NextFunction): Response => {
  const response: ErrorResponse = {
    code: 404,
    status: "error",
    error: "Page not found",
  };

  return res.json(response);
};

export { notFound };
