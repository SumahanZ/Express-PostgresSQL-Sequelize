"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = createApp;
const express_1 = __importDefault(require("express"));
const routeInitializer_1 = require("./routeInitializer");
const globalError_1 = require("../middlewares/globalError");
require("express-async-errors");
function createApp() {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    (0, routeInitializer_1.initializeRoute)(app);
    app.use(globalError_1.errorHandler);
    return app;
}
