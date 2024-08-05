import env from "./env";
import connectDB from "./utils/connectDB";
import { createApp } from "./utils/createApp";
import log from "./utils/logger";
import { Request, Response } from "express";
import { QueryTypes } from "sequelize";

const app = createApp();

const PORT = env.SERVER_PORT || 3005;

app.get("/health-check", (_req: Request, res: Response) => {
  return res.sendStatus(200);
});

app.listen(PORT, async () => {
  log.info(`Listening at http://localhost:${PORT}`);
  await connectDB();
});
