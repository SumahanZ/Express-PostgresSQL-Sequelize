import { FindOptions } from "sequelize";
import { User, UserInput } from "./user_model";
import { omit } from "lodash";
import bcrypt from "bcrypt";
import { InternalServerError } from "../../errors/errors";

export async function createUser(input: UserInput) {
  try {
    return User.create(input);
  } catch (err: any) {
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
