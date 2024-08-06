import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";

import bcrypt from "bcrypt";

import connection from "../../config/database_config";
import env from "../../env";
import { Project } from "../projects/project_model";

class User extends Model<
  InferAttributes<User, { omit: "deletedAt" | "createdAt" | "updatedAt" }>,
  InferCreationAttributes<User, { omit: "deletedAt" | "createdAt" | "updatedAt" }>
> {
  declare id: CreationOptional<number>;
  declare firstName: string;
  declare lastName: string;
  declare password: string;
  declare email: string;
  declare userType: "user" | "admin" | "superadmin";
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare deletedAt: CreationOptional<Date> | null;
}

User.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    userType: {
      type: DataTypes.ENUM,
      values: ["user", "admin", "superadmin"],
    },
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
      set(value: string) {
        const salt = bcrypt.genSaltSync(env.SALT_ROUNDS);
        const hashedPassword = bcrypt.hashSync(value, salt);
        this.setDataValue("password", hashedPassword);
      },
    },
    email: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
    sequelize: connection,
    modelName: "users",
  }
);

export type UserInput = InferCreationAttributes<
  User,
  { omit: "deletedAt" | "createdAt" | "updatedAt" | "id" }
>;

User.hasMany(Project, { sourceKey: "id", as: "projects", foreignKey: "createdBy" });

export { User };
