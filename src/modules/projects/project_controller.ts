import { NextFunction, Request, Response } from "express";
import { CreateProjectInput } from "../../schemas/project_schema";

export async function createProjectHandler(
  req: Request<{}, {}, CreateProjectInput["body"]>,
  res: Response,
  next: NextFunction
) {}

export async function getAllProjectHandler(req: Request, res: Response, next: NextFunction) {}

export async function getProjectHandler(req: Request, res: Response, next: NextFunction) {}

export async function updateProjectHandler(req: Request, res: Response, next: NextFunction) {}

export async function deleteProjectHandler(req: Request, res: Response, next: NextFunction) {}
