"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const sequelize_1 = require("sequelize");
const env_1 = __importDefault(require("../env"));
dotenv_1.default.config();
const connection = new sequelize_1.Sequelize(env_1.default.DATABASE_NAME, env_1.default.DATABASE_USERNAME, env_1.default.DATABASE_PASSWORD, {
    host: env_1.default.DATABASE_HOST,
    dialect: "postgres",
});
exports.default = connection;
