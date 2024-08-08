"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
const customError_1 = require("../errors/customError");
function errorHandler(err, _req, res, _next) {
    if (err instanceof customError_1.CustomError) {
        return res.status(err.statusCode).send({ msg: err.message });
    }
    return res.status(500).send({ msg: "Something unexpected happened" });
}
