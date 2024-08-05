import env from "./env";
import connectDB from "./utils/connectDB";
import { createApp } from "./utils/createApp";
import log from "./utils/logger";
import { Request, Response } from "express";
import sequelize from "./config/database_config";
import { User } from "./modules/users/user_model";

const app = createApp();

const PORT = env.SERVER_PORT || 3005;

app.get("/health-check", async (_req: Request, res: Response) => {
  const users = await sequelize.query(`SELECT * FROM users`, {
    model: User,
    mapToModel: true,
  });

  return res.status(200).json(users);
});

app.listen(PORT, async () => {
  log.info(`Listening at http://localhost:${PORT}`);
  await connectDB();
});
