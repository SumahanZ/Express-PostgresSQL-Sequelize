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
exports.createProject = createProject;
exports.fetchProject = fetchProject;
exports.fetchProjects = fetchProjects;
exports.updateProject = updateProject;
exports.deleteProject = deleteProject;
const project_model_1 = require("./project_model");
const errors_1 = require("../../errors/errors");
function createProject(input) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return project_model_1.Project.create(input);
        }
        catch (err) {
            throw new errors_1.InternalServerError("Something happened when trying to create project");
        }
    });
}
function fetchProject(option) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return project_model_1.Project.findOne(option);
        }
        catch (err) {
            throw new errors_1.InternalServerError("Something happened when trying to fetch the project");
        }
    });
}
function fetchProjects(option) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return project_model_1.Project.findAll(option);
        }
        catch (err) {
            throw new errors_1.InternalServerError("Something happened when trying to fetch projects");
        }
    });
}
function updateProject(input, option) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return project_model_1.Project.update(input, option);
        }
        catch (err) {
            throw new errors_1.InternalServerError("Something happened when trying to update project");
        }
    });
}
function deleteProject(option) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return project_model_1.Project.destroy(option);
        }
        catch (err) {
            throw new errors_1.InternalServerError("Something happened when trying to delete project");
        }
    });
}
