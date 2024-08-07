"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.signUpHandler = signUpHandler;
exports.loginHandler = loginHandler;
const UserService = __importStar(require("./user_service"));
const lodash_1 = require("lodash");
const jwtUtils_1 = require("../../utils/jwtUtils");
const env_1 = __importDefault(require("../../env"));
const errors_1 = require("../../errors/errors");
function signUpHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const newUser = yield UserService.createUser(req.body);
        if (!newUser)
            throw new errors_1.BadRequestError("User failed to be created");
        const user = (0, lodash_1.omit)(newUser, ["password"]);
        return res.status(201).json(user);
    });
}
function loginHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        const validatedUser = yield UserService.validatePassword(email, password);
        if (!validatedUser)
            throw new errors_1.BadRequestError("Email or password is not valid");
        const accessToken = (0, jwtUtils_1.signJWT)(validatedUser, {
            expiresIn: env_1.default.ACCESS_TOKEN_LIFE,
        });
        if (!accessToken)
            throw new errors_1.BadRequestError("Failed to generate access token");
        const refreshToken = (0, jwtUtils_1.signJWT)(validatedUser, {
            expiresIn: env_1.default.REFRESH_TOKEN_LIFE,
        });
        if (!refreshToken)
            throw new errors_1.BadRequestError("Failed to generate refresh token!");
        return res.status(200).json({ accessToken, refreshToken, user: validatedUser });
    });
}
