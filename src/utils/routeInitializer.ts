import userRoute from "../modules/users/user_route";
import projectRoute from "../modules/projects/project_route";
import { Express } from "express";

export function initializeRoute(app: Express) {
  app.use(userRoute);
  app.use(projectRoute);
}
