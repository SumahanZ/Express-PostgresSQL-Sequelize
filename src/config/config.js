const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  development: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    dialect: "postgres",
  },

  test: {
    username: process.env.DATABASE_USERNAME_TEST,
    password: process.env.DATABASE_PASSWORD_TEST,
    database: process.env.DATABASE_NAME_TEST,
    host: process.env.DATABASE_HOST_TEST,
    dialect: "postgres",
  },

  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "postgres",
  },
};
