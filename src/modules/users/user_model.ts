import bcrypt from "bcrypt";
import env from "../../env";
import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  Sequelize,
} from "sequelize";

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

export function initializeUserModel(sequelize: Sequelize) {
  return User.init(
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
        allowNull: false,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value: string) {
          const salt = bcrypt.genSaltSync(env.SALT_ROUNDS);
          const hashedPassword = bcrypt.hashSync(value, salt);
          this.setDataValue("password", hashedPassword);
        },
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
    },
    {
      timestamps: true,
      sequelize: sequelize,
      modelName: "users",
    }
  );
}

export type UserInput = InferCreationAttributes<
  User,
  { omit: "deletedAt" | "createdAt" | "updatedAt" | "id" }
>;

export { User };
