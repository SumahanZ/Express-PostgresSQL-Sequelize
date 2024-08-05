import { AnyZodObject } from "zod";
import { Request, Response, NextFunction } from "express";

export const validateSchema =
  (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
      return;
    } catch (err: any) {
      return res.status(400).send(err.errors);
    }
  };
