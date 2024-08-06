import connection from "../../config/database_config";
import { User } from "../users/user_model";

import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  ForeignKey,
  NonAttribute,
} from "sequelize";

class Project extends Model<
  InferAttributes<Project, { omit: "deletedAt" | "createdAt" | "updatedAt" }>,
  InferCreationAttributes<Project, { omit: "deletedAt" | "createdAt" | "updatedAt" | "id" }>
> {
  declare id: CreationOptional<number>;
  declare title: string;
  declare isFeatured: boolean;
  declare productImage: string[];
  declare price: number;
  declare shortDescription: string;
  declare description: string;
  declare productUrl: string;
  declare category: string[];
  declare tags: string[];
  declare owner?: NonAttribute<User>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare deletedAt: CreationOptional<Date> | null;
}

Project.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isFeatured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    productImage: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    shortDescription: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    productUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
  },
  {
    timestamps: true,
    sequelize: connection,
    modelName: "users",
  }
);

export type ProjectInput = InferCreationAttributes<
  Project,
  { omit: "deletedAt" | "createdAt" | "updatedAt" | "id" }
>;

Project.belongsTo(User, { targetKey: "id", as: "owner" });

export { Project };
