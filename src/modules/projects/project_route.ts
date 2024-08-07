import { Router } from "express";
import { validateRole } from "../../middlewares/validateRole";
import {
  createProjectHandler,
  getAllProjectHandler,
  getProjectHandler,
} from "./project_controller";

const router = Router();

router.get("/projects/:id", validateRole(["admin", "user", "superadmin"]), getProjectHandler);
router.get(
  "/projects/:userId",
  validateRole(["admin", "user", "superadmin"]),
  getAllProjectHandler
);
router.post("/projects", validateRole(["admin", "user", "superadmin"]), createProjectHandler);
router.put("/projects:id", validateRole(["admin", "user", "superadmin"]));
router.delete("/projects/:id", validateRole(["admin", "user", "superadmin"]));

router.use("/api", router);

export default router;
