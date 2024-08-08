import { Request, Response } from "express";
import { CreateProjectInput, UpdateProjectInput } from "../../schemas/project_schema";
import * as ProjectService from "./project_service";
import { BadRequestError } from "../../errors/errors";

export async function createProjectHandler(
  req: Request<{}, {}, CreateProjectInput["body"]>,
  res: Response
) {
  const createdProject = await ProjectService.createProject({
    ...req.body,
    ownerId: parseInt(req.body.ownerId),
  });

  if (!createdProject) throw new BadRequestError("Project failed to be created");
  return res.status(201).send(createdProject);
}

export async function getAllProjectHandler(req: Request, res: Response) {
  const projects = await ProjectService.fetchProjects({
    where: {
      id: req.params.userId,
    },
  });
  if (!projects) throw new BadRequestError("No projects were fetched");
  return res.status(201).send(projects);
}

export async function getProjectHandler(req: Request, res: Response) {
  const project = await ProjectService.fetchProject({
    where: {
      id: req.params.id,
    },
  });
  if (!project) throw new BadRequestError("No project fetched");
  return res.status(201).send(project);
}

export async function updateProjectHandler(
  req: Request<UpdateProjectInput["params"], {}, UpdateProjectInput["body"]>,
  res: Response
) {
  //check if current logged in user id is the same as the project owner id
  const selectedProject = await ProjectService.fetchProject({
    where: {
      id: req.params.id,
    },
  });

  if (selectedProject && selectedProject.ownerId !== req.params.id)
    throw new BadRequestError("The current user isn't the owner of the project");

  if (!req.body) throw new BadRequestError("No request body was passed");
  const updatedProject = await ProjectService.updateProject(req.body, {
    where: {
      id: req.params.id,
    },
  });
  if (!updatedProject) throw new BadRequestError("No project updated");
  return res.status(201).send(updatedProject);
}

export async function deleteProjectHandler(req: Request, res: Response) {
  //check if current logged in user id is the same as the project owner id
  const selectedProject = await ProjectService.fetchProject({
    where: {
      id: req.params.id,
    },
  });

  if (selectedProject && selectedProject.ownerId.toString() !== req.params.id)
    throw new BadRequestError("The current user isn't the owner of the project");
  const deletedProject = await ProjectService.deleteProject();
  if (!deletedProject) throw new BadRequestError("No project deleted");
  return res.status(204).send(deletedProject);
}
