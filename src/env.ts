import { cleanEnv, str, num } from "envalid";
import dotenv from "dotenv";

dotenv.config();

const env = cleanEnv(process.env, {
  SERVER_PORT: num(),
  SALT_ROUNDS: num(),
  ACCESS_TOKEN_LIFE: str({ default: "10m" }),
  REFRESH_TOKEN_LIFE: str({ default: "1y" }),
  DATABASE_USERNAME: str(),
  DATABASE_PASSWORD: str(),
  DATABASE_NAME: str(),
  DATABASE_HOST: str(),
  DATABASE_USERNAME_TEST: str(),
  DATABASE_PASSWORD_TEST: str(),
  DATABASE_NAME_TEST: str(),
  DATABASE_HOST_TEST: str(),
  NODE_ENV: str({ choices: ["development", "test", "production"] }),
});

export default env;
