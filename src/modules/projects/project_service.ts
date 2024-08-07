import { DestroyOptions, FindOptions, UpdateOptions } from "sequelize";
import { Project, ProjectCreateInput, ProjectFetchInput } from "./project_model";
import { InternalServerError } from "../../errors/errors";

export async function createProject(input: ProjectCreateInput) {
  try {
    return Project.create(input);
  } catch (err: any) {
    throw new InternalServerError("Something happened when trying to create project");
  }
}

export async function fetchProject(option: FindOptions<ProjectFetchInput>) {
  try {
    return Project.findOne(option);
  } catch (err: any) {
    throw new InternalServerError("Something happened when trying to fetch the project");
  }
}

export async function fetchProjects(option?: FindOptions<ProjectFetchInput>) {
  try {
    return Project.findAll(option);
  } catch (err: any) {
    throw new InternalServerError("Something happened when trying to fetch projects");
  }
}

export async function updateProject(option?: UpdateOptions<ProjectFetchInput>) {
  try {
    return Project.findAll(option);
  } catch (err: any) {
    throw new InternalServerError("Something happened when trying to update project");
  }
}

export async function deleteProject(option?: DestroyOptions<ProjectFetchInput>) {
  try {
    return Project.destroy(option);
  } catch (err: any) {
    throw new InternalServerError("Something happened when trying to delete project");
  }
}
