import * as UserService from "./user_service";
import { NextFunction, Request, Response } from "express";
import * as ProjectService from "../projects/project_service";
import { LoginUserInput, SignUpUserInput } from "../../schemas/user_schema";
import { omit } from "lodash";
import { signJWT } from "../../utils/jwtUtils";
import env from "../../env";
import { BadRequestError } from "../../errors/errors";

export async function signUpHandler(
  req: Request<{}, {}, SignUpUserInput["body"], {}>,
  res: Response,
  next: NextFunction
) {
  try {
    const newUser = await UserService.createUser(req.body);
    if (!newUser) throw new BadRequestError("User failed to be created");
    const user = omit(newUser, ["password"]);
    return res.status(201).json(user.dataValues);
  } catch (err: any) {
    return next(err);
  }
}

export async function loginHandler(
  req: Request<{}, {}, LoginUserInput["body"], {}>,
  res: Response,
  next: NextFunction
) {
  try {
    const { email, password } = req.body;

    const validatedUser = await UserService.validatePassword(email, password);

    if (!validatedUser) throw new BadRequestError("Email or password is not valid");

    const accessToken = signJWT(validatedUser, {
      expiresIn: env.ACCESS_TOKEN_LIFE,
    });

    if (!accessToken) throw new BadRequestError("Failed to generate access token");

    const refreshToken = signJWT(validatedUser, {
      expiresIn: env.REFRESH_TOKEN_LIFE,
    });

    if (!refreshToken) throw new BadRequestError("Failed to generate refresh token!");

    return res.status(200).json({ accessToken, refreshToken, user: validatedUser.dataValues });
  } catch (err: any) {
    return next(err);
  }
}

export async function getAllProjectByUserIdHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const projects = await ProjectService.fetchProjects({
      where: {
        ownerId: req.params.userId,
      },
    });

    if (!projects) throw new BadRequestError("No projects were fetched");

    return res.status(201).send(projects);
  } catch (err: any) {
    return next(err);
  }
}
