import express from "express";
import { initializeRoute } from "./routeInitializer";
import { errorHandler } from "../middlewares/globalError";
import "express-async-errors";

export function createApp() {
  const app = express();
  app.use(express.json());
  initializeRoute(app);
  app.use(errorHandler);
  return app;
}
