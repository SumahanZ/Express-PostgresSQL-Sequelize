import { NextFunction, Request, Response } from "express";
import { User } from "../modules/users/user_model";

export const validateRole =
  (availableRoles: string[]) => (err: Error, _req: Request, res: Response, next: NextFunction) => {
    const currentUser = res.locals.user as User;
    if (!currentUser) return res.sendStatus(403);
    //check if the current user logged role matches the validateRole middleware
    if (!availableRoles.includes(currentUser.userType))
      return res.send(403).json({ msg: "User does not have sufficient role access" });

    return next();
  };
