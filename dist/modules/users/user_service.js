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
exports.createUser = createUser;
exports.fetchUser = fetchUser;
exports.fetchUsers = fetchUsers;
exports.validatePassword = validatePassword;
const user_model_1 = require("./user_model");
const lodash_1 = require("lodash");
const bcrypt_1 = __importDefault(require("bcrypt"));
const errors_1 = require("../../errors/errors");
function createUser(input) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return user_model_1.User.create(input);
        }
        catch (err) {
            throw new errors_1.InternalServerError("Something happened when trying to create user");
        }
    });
}
function fetchUser(option) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return user_model_1.User.findOne(option);
        }
        catch (err) {
            throw new errors_1.InternalServerError("Something happened when trying to fetch user");
        }
    });
}
function fetchUsers(option) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return user_model_1.User.findAll(option);
        }
        catch (err) {
            throw new errors_1.InternalServerError("Something happened when trying to fetch users");
        }
    });
}
function validatePassword(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const foundUser = yield user_model_1.User.findOne({
                where: {
                    email,
                },
            });
            if (!foundUser)
                return false;
            const isValidPassword = yield bcrypt_1.default.compare(password, foundUser.password);
            if (!isValidPassword)
                return false;
            return (0, lodash_1.omit)(foundUser, ["password"]);
        }
        catch (err) {
            throw new errors_1.InternalServerError("Something happened when trying to validate password");
        }
    });
}
