import { FindOptions } from "sequelize";
import { Project, ProjectInput } from "./project_model";
import { InternalServerError } from "../../errors/errors";

export async function createProject(input: ProjectInput) {
  try {
    return Project.create(input);
  } catch (err: any) {
    throw new InternalServerError("Something happened when trying to create Project");
  }
}

export async function fetchProject(option: FindOptions<ProjectInput>) {
  try {
    return Project.findOne(option);
  } catch (err: any) {
    throw new InternalServerError("Something happened when trying to fetch Project");
  }
}

export async function fetchProjects(option?: FindOptions<ProjectInput>) {
  try {
    return Project.findAll(option);
  } catch (err: any) {
    throw new InternalServerError("Something happened when trying to fetch users");
  }
}
