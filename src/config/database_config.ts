import dotenv from "dotenv";
import { Sequelize } from "sequelize";
import env from "../env";
import { initializeUserModel, User } from "../modules/users/user_model";
import { initializeProjectModel, Project } from "../modules/projects/project_model";

dotenv.config();

class DatabaseConnectionConfig {
  connection: Sequelize | null = null;
  projectModel: unknown;

  constructor() {
    this.connect({
      name: env.DATABASE_NAME,
      username: env.DATABASE_USERNAME,
      password: env.DATABASE_PASSWORD,
      host: env.DATABASE_HOST,
    });
  }

  connect(options: { name: string; username: string; password: string; host: string }) {
    this.connection = new Sequelize(options.name, options.username, options.password, {
      host: options.host,
      dialect: "postgres",
    });

    this._initializeModels();
  }

  async close() {
    if (this.connection instanceof Sequelize) {
      await this.connection.close();
    }
  }

  async drop() {
    await this.connection?.drop();
  }

  _initializeModels() {
    if (this.connection) {
      initializeUserModel(this.connection);
      initializeProjectModel(this.connection);
      this._initializeRelationships();
    }
  }

  _initializeRelationships() {
    User.hasMany(Project, {
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
      as: "projects",
      foreignKey: "ownerId",
    });

    Project.belongsTo(User, {
      as: "owner",
      foreignKey: "ownerId",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  }
}

export default new DatabaseConnectionConfig();
