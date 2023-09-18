import { Request, Response, NextFunction } from "express";

const home = (req: Request, res: Response, next: NextFunction) => {
  return res.json({
    status: "OK",
  });
};

export default {
  home
}
