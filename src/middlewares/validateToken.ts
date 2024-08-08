import { Request, Response, NextFunction } from "express";
import { get } from "lodash";
import { signJWT, verifyJWT } from "../utils/jwtUtils";

export async function validateToken(req: Request, res: Response, next: NextFunction) {
  const accessToken = get(req, "headers.authorization", "").replace(/^Bearer\s/, "");

  const refreshToken = get(req, "headers.x-refresh");

  if (!accessToken) return next();

  const { decodedToken, expired, valid } = verifyJWT(accessToken);

  if (decodedToken && valid) {
    res.locals.user = decodedToken;
    return next();
  }

  if (expired && typeof refreshToken === "string") {
    const { decodedToken, expired } = verifyJWT(refreshToken);

    if (expired) return res.status(400).send("Refresh token is invalid");

    const newAccessToken = signJWT(
      { decodedToken },
      {
        expiresIn: process.env.ACCESS_TOKEN_LIFE,
      }
    );

    res.setHeader("x-access-token", newAccessToken);
    res.locals.user = decodedToken;
    return next();
  }

  return next();
}
