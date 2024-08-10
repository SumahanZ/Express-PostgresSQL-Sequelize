import { NextFunction, Request, Response } from "express";
import { CustomError } from "../errors/customError";
import log from "../utils/logger";

export function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ msg: err.message });
  }

  log.info(err);
  return res.status(500).send({ msg: `Something unexpected happened: ${err}` });
}
