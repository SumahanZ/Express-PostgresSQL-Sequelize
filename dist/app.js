"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = __importDefault(require("./env"));
const connectDB_1 = __importDefault(require("./utils/connectDB"));
const createApp_1 = require("./utils/createApp");
const logger_1 = __importDefault(require("./utils/logger"));
const database_config_1 = __importDefault(require("./config/database_config"));
const user_model_1 = require("./modules/users/user_model");
const app = (0, createApp_1.createApp)();
const PORT = env_1.default.SERVER_PORT || 3005;
app.get("/health-check", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield database_config_1.default.query(`SELECT * FROM users`, {
        model: user_model_1.User,
        mapToModel: true,
    });
    return res.status(200).json(users);
}));
app.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.info(`Listening at http://localhost:${PORT}`);
    yield (0, connectDB_1.default)();
}));
