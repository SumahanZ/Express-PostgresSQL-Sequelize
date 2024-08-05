import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";

import connection from "../../config/database_config";

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
      type: DataTypes.ENUM("user", "admin", "superadmin"),
    },
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
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
  { omit: "deletedAt" | "createdAt" | "updatedAt" }
>;

export default User;
