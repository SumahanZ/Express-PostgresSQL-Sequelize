"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSchema = void 0;
const zod_1 = require("zod");
const zod_validation_error_1 = require("zod-validation-error");
const validateSchema = (schema) => (req, res, next) => {
    try {
        (0, zod_1.setErrorMap)(zod_validation_error_1.errorMap);
        schema.parse({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        next();
        return;
    }
    catch (err) {
        const validationError = (0, zod_validation_error_1.fromError)(err);
        return res.status(400).send(validationError.details);
    }
};
exports.validateSchema = validateSchema;
function removeChar(str, charToRemove) {
    return str.split(charToRemove).join("");
}
