import dotenv from "dotenv";
import { Sequelize } from "sequelize";
import env from "../env";

dotenv.config();

const connection = new Sequelize(env.DATABASE_NAME, env.DATABASE_USERNAME, env.DATABASE_PASSWORD, {
  host: env.DATABASE_HOST,
  dialect: "postgres",
});

export default connection;
