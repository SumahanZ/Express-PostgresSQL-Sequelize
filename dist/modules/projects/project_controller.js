"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.createProjectHandler = createProjectHandler;
exports.getProjectHandler = getProjectHandler;
exports.updateProjectHandler = updateProjectHandler;
exports.deleteProjectHandler = deleteProjectHandler;
const ProjectService = __importStar(require("./project_service"));
const errors_1 = require("../../errors/errors");
function createProjectHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const createdProject = yield ProjectService.createProject(Object.assign(Object.assign({}, req.body), { ownerId: parseInt(req.body.ownerId) }));
            if (!createdProject)
                throw new errors_1.BadRequestError("Project failed to be created");
            return res.status(201).send(createdProject);
        }
        catch (err) {
            return next(err);
        }
    });
}
function getProjectHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const project = yield ProjectService.fetchProject({
                where: {
                    id: req.params.id,
                },
            });
            if (!project)
                throw new errors_1.BadRequestError("No project fetched");
            return res.status(201).send(project);
        }
        catch (err) {
            return next(err);
        }
    });
}
function updateProjectHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const selectedProject = yield ProjectService.fetchProject({
                where: {
                    id: req.params.id,
                },
            });
            if ((selectedProject === null || selectedProject === void 0 ? void 0 : selectedProject.dataValues) &&
                selectedProject.dataValues.ownerId !== res.locals.user.dataValues.id)
                throw new errors_1.BadRequestError("The current user isn't the owner of the project");
            if (!req.body)
                throw new errors_1.BadRequestError("No request body was passed");
            const updatedProject = yield ProjectService.updateProject(req.body, {
                where: {
                    id: req.params.id,
                },
                returning: true,
            });
            if (!updatedProject)
                throw new errors_1.BadRequestError("No project updated");
            return res.status(201).send(updatedProject[1]);
        }
        catch (err) {
            return next(err);
        }
    });
}
function deleteProjectHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const selectedProject = yield ProjectService.fetchProject({
                where: {
                    id: req.params.id,
                },
            });
            if ((selectedProject === null || selectedProject === void 0 ? void 0 : selectedProject.dataValues) &&
                selectedProject.dataValues.ownerId !== res.locals.user.dataValues.id) {
                throw new errors_1.BadRequestError("The current user isn't the owner of the project");
            }
            const deletedProject = yield ProjectService.deleteProject({
                where: {
                    id: req.params.id,
                },
            });
            if (!deletedProject)
                throw new errors_1.BadRequestError("No project deleted");
            return res.status(202).send({
                msg: "Successfully deleted project",
            });
        }
        catch (err) {
            return next(err);
        }
    });
}
