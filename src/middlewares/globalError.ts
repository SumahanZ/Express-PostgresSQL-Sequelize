import { NextFunction, Request, Response } from "express";
import { CustomError } from "../errors/customError";

export const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof CustomError) return res.status(err.statusCode).send({ msg: err.message });

  return res.status(500).send({ msg: "Something unexpected happened" });
};
