import { Router } from "express";
import { validateRole } from "../../middlewares/validateRole";
import {
  createProjectHandler,
  getAllProjectHandler,
  getProjectHandler,
} from "./project_controller";
import { validateToken } from "../../middlewares/validateToken";

const router = Router();

router.get(
  "/projects/:id",
  [validateToken, validateRole(["admin", "user", "superadmin"])],
  getProjectHandler
);
router.get(
  "/projects/:userId",
  [validateToken, validateRole(["admin", "user", "superadmin"])],
  getAllProjectHandler
);
router.post(
  "/projects",
  [validateToken, validateRole(["admin", "user", "superadmin"])],
  createProjectHandler
);
router.put("/projects:id", [validateToken, validateRole(["admin", "user", "superadmin"])]);
router.delete("/projects/:id", [validateToken, validateRole(["admin", "user", "superadmin"])]);

router.use("/api", router);

export default router;
