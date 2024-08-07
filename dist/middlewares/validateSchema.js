"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSchema = void 0;
const validateSchema = (schema) => (req, res, next) => {
    try {
        schema.parse({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        next();
        return;
    }
    catch (err) {
        return res.status(400).send(err.errors);
    }
};
exports.validateSchema = validateSchema;
