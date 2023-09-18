import { Response, Request, NextFunction } from "express";

export interface ErrorResponse {
  code: number;
  status?: string;
  error?: string;
}

export default class CustomError extends Error implements ErrorResponse {
  readonly status: string;

  constructor(public code: number, public error: string) {
    super(error);

    this.status = "error";

    if (code === 401) {
      this.error = "Unauthorized";
    }
  }
}

export const errorhandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): Response => {
  if (error instanceof CustomError) {
    return res
      .status(error.code)
      .json({ code: error.code, status: "error", error: error.message });
  } else {
    console.log("ERROR: ", error)
    return res
      .status(500)
      .json({ code: 500, status: "error", error: "Internal Server Error" });
  }
};
