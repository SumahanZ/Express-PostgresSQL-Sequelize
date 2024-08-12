import { Request, Response, NextFunction } from "express";
import { CreateProjectInput, UpdateProjectInput } from "../../schemas/project_schema";
import * as ProjectService from "./project_service";
import { BadRequestError, NotFoundError } from "../../errors/errors";
import { User } from "../users/user_model";

export async function createProjectHandler(
  req: Request<{}, {}, CreateProjectInput["body"]>,
  res: Response,
  next: NextFunction
) {
  try {
    const createdProject = await ProjectService.createProject({
      ...req.body,
      ownerId: parseInt(req.body.ownerId),
    });

    if (!createdProject) throw new NotFoundError("Project failed to be created");

    return res.status(201).send(createdProject);
  } catch (err: any) {
    return next(err);
  }
}

export async function getProjectHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const project = await ProjectService.fetchProject({
      where: {
        id: req.params.id,
      },
    });

    if (!project) throw new NotFoundError("No project fetched");

    return res.status(200).send(project);
  } catch (err: any) {
    return next(err);
  }
}

export async function updateProjectHandler(
  req: Request<UpdateProjectInput["params"], {}, UpdateProjectInput["body"]>,
  res: Response,
  next: NextFunction
) {
  try {
    const selectedProject = await ProjectService.fetchProject({
      where: {
        id: req.params.id,
      },
    });

    if (
      selectedProject?.dataValues &&
      selectedProject.dataValues.ownerId !== res.locals.user.dataValues.id
    )
      throw new BadRequestError("The current user isn't the owner of the project");

    if (!req.body) throw new BadRequestError("No request body was passed");
    const updatedProject: number[] = await ProjectService.updateProject(req.body, {
      where: {
        id: req.params.id,
      },
      returning: true,
    });

    if (!updatedProject) throw new NotFoundError("No project updated");

    return res.status(201).send(updatedProject[1]);
  } catch (err: any) {
    return next(err);
  }
}

export async function deleteProjectHandler(
  req: Request<{ id: string }>,
  res: Response<{}, { user: User }>,
  next: NextFunction
) {
  try {
    const selectedProject = await ProjectService.fetchProject({
      where: {
        id: req.params.id,
      },
    });

    if (
      selectedProject?.dataValues &&
      selectedProject.dataValues.ownerId !== res.locals.user.dataValues.id
    ) {
      throw new BadRequestError("The current user isn't the owner of the project");
    }

    const deletedProject = await ProjectService.deleteProject({
      where: {
        id: req.params.id,
      },
    });

    if (!deletedProject) throw new BadRequestError("No project deleted");

    return res.status(202).send({
      msg: "Successfully deleted project",
    });
  } catch (err: any) {
    return next(err);
  }
}
