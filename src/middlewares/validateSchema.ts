import { AnyZodObject, setErrorMap } from "zod";
import { errorMap, fromError } from "zod-validation-error";
import { Request, Response, NextFunction } from "express";

export const validateSchema =
  (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
    try {
      setErrorMap(errorMap);
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
      return;
    } catch (err: any) {
      const validationError = fromError(err);
      return res.status(400).send(validationError.details);
    }
  };

function removeChar(str: string, charToRemove: string) {
  return str.split(charToRemove).join("");
}
