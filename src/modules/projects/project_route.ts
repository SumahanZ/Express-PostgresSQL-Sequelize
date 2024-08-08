import { Router } from "express";
import { validateRole } from "../../middlewares/validateRole";
import {
  createProjectHandler,
  deleteProjectHandler,
  getProjectHandler,
  updateProjectHandler,
} from "./project_controller";
import { validateSchema } from "../../middlewares/validateSchema";
import { updateProjectInputSchema } from "../../schemas/project_schema";

const router = Router();

router.get("/projects/:id", [validateRole(["admin", "user", "superadmin"])], getProjectHandler);

router.post("/projects", [validateRole(["admin", "user", "superadmin"])], createProjectHandler);

router.patch(
  "/projects/:id",
  [validateRole(["admin", "user", "superadmin"]), validateSchema(updateProjectInputSchema)],
  updateProjectHandler
);

router.delete(
  "/projects/:id",
  [validateRole(["admin", "user", "superadmin"])],
  deleteProjectHandler
);

router.use("/api", router);

export default router;
