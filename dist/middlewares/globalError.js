"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const customError_1 = require("../errors/customError");
const errorHandler = (err, _req, res, _next) => {
    if (err instanceof customError_1.CustomError)
        return res.status(err.statusCode).send({ msg: err.message });
    return res.status(500).send({ msg: "Something unexpected happened" });
};
exports.errorHandler = errorHandler;
