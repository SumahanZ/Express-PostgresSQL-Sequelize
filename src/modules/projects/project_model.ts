import { User } from "../users/user_model";

import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  ForeignKey,
  NonAttribute,
  Sequelize,
} from "sequelize";

class Project extends Model<
  InferAttributes<Project, { omit: "deletedAt" | "createdAt" | "updatedAt" }>,
  InferCreationAttributes<Project, { omit: "deletedAt" | "createdAt" | "updatedAt" }>
> {
  declare id: CreationOptional<number>;
  declare title: string;
  declare isFeatured: boolean;
  declare price: number;
  declare shortDescription: string;
  declare description: string;
  declare productUrl: string;
  declare category: string[];
  declare ownerId: ForeignKey<User["id"]>;
  declare tags: string[];
  declare owner?: NonAttribute<User>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare deletedAt: CreationOptional<Date> | null;
}

export function initializeProjectModel(sequelize: Sequelize) {
  return Project.init(
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
      ownerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
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
      sequelize: sequelize,
      modelName: "projects",
    }
  );
}

export type ProjectCreateInput = InferCreationAttributes<
  Project,
  { omit: "deletedAt" | "createdAt" | "updatedAt" | "id" }
>;

export type ProjectFetchInput = InferAttributes<
  Project,
  { omit: "deletedAt" | "createdAt" | "updatedAt" }
>;

export { Project };
