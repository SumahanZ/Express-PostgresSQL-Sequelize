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
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = validateToken;
const lodash_1 = require("lodash");
const jwtUtils_1 = require("../utils/jwtUtils");
function validateToken(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const accessToken = (0, lodash_1.get)(req, "headers.authorization", "").replace(/^Bearer\s/, "");
        const refreshToken = (0, lodash_1.get)(req, "headers.x-refresh");
        if (!accessToken)
            return next();
        const { decodedToken, expired, valid } = (0, jwtUtils_1.verifyJWT)(accessToken);
        if (decodedToken && valid) {
            res.locals.user = decodedToken;
            return next();
        }
        if (expired && typeof refreshToken === "string") {
            const { decodedToken, expired } = (0, jwtUtils_1.verifyJWT)(refreshToken);
            if (expired)
                return res.status(400).send("Refresh token is invalid");
            const newAccessToken = (0, jwtUtils_1.signJWT)({ decodedToken }, {
                expiresIn: process.env.ACCESS_TOKEN_LIFE,
            });
            res.setHeader("x-access-token", newAccessToken);
            res.locals.user = decodedToken;
            return next();
        }
        return next();
    });
}
