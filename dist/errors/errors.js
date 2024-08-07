"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = exports.InternalServerError = exports.BadRequestError = void 0;
const customError_1 = require("./customError");
class BadRequestError extends customError_1.CustomError {
    constructor(message) {
        super(message || "Bad request", 400);
    }
}
exports.BadRequestError = BadRequestError;
class InternalServerError extends customError_1.CustomError {
    constructor(message) {
        super(message || "Internal Server Error", 500);
    }
}
exports.InternalServerError = InternalServerError;
class NotFoundError extends customError_1.CustomError {
    constructor(message) {
        super(message || "Not Found", 404);
    }
}
exports.NotFoundError = NotFoundError;
