"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signJWT = signJWT;
exports.verifyJWT = verifyJWT;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const keys_1 = require("../config/keys");
const privateKey = keys_1.privateKey;
const publicKey = keys_1.publicKey;
function signJWT(payload, options) {
    return jsonwebtoken_1.default.sign(payload, privateKey, Object.assign(Object.assign({}, options), { algorithm: "RS256" }));
}
function verifyJWT(token) {
    try {
        const decodedToken = jsonwebtoken_1.default.verify(token, publicKey);
        return {
            valid: true,
            expired: false,
            decodedToken,
        };
    }
    catch (err) {
        return {
            valid: false,
            expired: true,
            decodedToken: null,
        };
    }
}
