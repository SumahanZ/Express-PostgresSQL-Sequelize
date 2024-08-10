import { FindOptions } from "sequelize";
import { User, UserInput } from "./user_model";
import { omit } from "lodash";
import bcrypt from "bcrypt";
import { InternalServerError } from "../../errors/errors";
import log from "../../utils/logger";
import { signJWT } from "../../utils/jwtUtils";
import env from "../../env";

export async function createUser(input: UserInput) {
  try {
    const user = await User.create(input);
    return omit(user.dataValues, "password");
  } catch (err: any) {
    log.info(err);
    throw new InternalServerError("Something happened when trying to create user");
  }
}

export async function fetchUser(option: FindOptions<UserInput>) {
  try {
    return User.findOne(option);
  } catch (err: any) {
    throw new InternalServerError("Something happened when trying to fetch user");
  }
}

export async function fetchUsers(option?: FindOptions<UserInput>) {
  try {
    return User.findAll(option);
  } catch (err: any) {
    throw new InternalServerError("Something happened when trying to fetch users");
  }
}

export async function validatePassword(email: string, password: string) {
  try {
    const foundUser = await User.findOne({
      where: {
        email,
      },
    });

    if (!foundUser) return false;
    const isValidPassword = await bcrypt.compare(password, foundUser.password);
    if (!isValidPassword) return false;

    return omit(foundUser, ["password"]);
  } catch (err: any) {
    throw new InternalServerError("Something happened when trying to validate password");
  }
}

export async function generateAccessToken(validatedUser: Omit<User, "password">) {
  const accessToken = signJWT(validatedUser, {
    expiresIn: env.ACCESS_TOKEN_LIFE,
  });

  return accessToken;
}

export async function generateRefreshToken(validatedUser: Omit<User, "password">) {
  const refreshToken = signJWT(validatedUser, {
    expiresIn: env.ACCESS_TOKEN_LIFE,
  });

  return refreshToken;
}
