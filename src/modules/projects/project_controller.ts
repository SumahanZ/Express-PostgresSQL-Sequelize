import { Request, Response } from "express";
import { CreateProjectInput } from "../../schemas/project_schema";
import * as ProjectService from "./project_service";
import { BadRequestError } from "../../errors/errors";

export async function createProjectHandler(
  req: Request<{}, {}, CreateProjectInput["body"]>,
  res: Response
) {
  const createdProject = await ProjectService.createProject(req.body);
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

export async function updateProjectHandler(req: Request<{ id: number }, {}, {}>, res: Response) {
  const updatedProject = await ProjectService.updateProject();
  if (!updatedProject) throw new BadRequestError("No project updated");
  return res.status(201).send(updatedProject);
}

export async function deleteProjectHandler(req: Request, res: Response) {
  const deletedProject = await ProjectService.deleteProject();
  if (!deletedProject) throw new BadRequestError("No project deleted");
  return res.status(204).send(deletedProject);
}
