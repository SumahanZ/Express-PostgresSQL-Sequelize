import express from "express";
import { initializeRoute } from "./routeInitializer";

export function createApp() {
  const app = express();
  app.use(express.json());
  initializeRoute(app);
  return app;
}
