import express from "express";
import { initializeRoute } from "./routeInitializer";
import { errorHandler } from "../middlewares/globalError";
import "express-async-errors";
import { validateToken } from "../middlewares/validateToken";

export function createApp() {
  const app = express();
  app.use(express.json());
  app.use(validateToken);
  initializeRoute(app);
  app.use(errorHandler);
  return app;
}
