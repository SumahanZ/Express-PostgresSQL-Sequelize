import log from "../utils/logger";
import sequelize from "../config/database_config";

export default async function connectDB() {
  try {
    await sequelize.authenticate();
    log.info("Connected to DB");
  } catch (err) {
    log.info(`Could not connect to DB with error: ${err}`);
    process.exit(1);
  }
}
