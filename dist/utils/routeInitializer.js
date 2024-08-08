"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeRoute = initializeRoute;
const user_route_1 = __importDefault(require("../modules/users/user_route"));
const project_route_1 = __importDefault(require("../modules/projects/project_route"));
function initializeRoute(app) {
    app.use(user_route_1.default);
    app.use(project_route_1.default);
}
