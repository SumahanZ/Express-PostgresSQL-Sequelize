"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const envalid_1 = require("envalid");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const env = (0, envalid_1.cleanEnv)(process.env, {
    SERVER_PORT: (0, envalid_1.num)(),
    SALT_ROUNDS: (0, envalid_1.num)(),
    ACCESS_TOKEN_LIFE: (0, envalid_1.str)({ default: "10m" }),
    REFRESH_TOKEN_LIFE: (0, envalid_1.str)({ default: "1y" }),
    DATABASE_USERNAME: (0, envalid_1.str)(),
    DATABASE_PASSWORD: (0, envalid_1.str)(),
    DATABASE_NAME: (0, envalid_1.str)(),
    DATABASE_HOST: (0, envalid_1.str)(),
    NODE_ENV: (0, envalid_1.str)(),
});
exports.default = env;
