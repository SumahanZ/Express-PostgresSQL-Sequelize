import { Router } from "express";
import { validateSchema } from "../../middlewares/validateSchema";
import { loginUserInputSchema, signUpUserInputSchema } from "../../schemas/user_schema";
import { getAllProjectByUserIdHandler, loginHandler, signUpHandler } from "./user_controller";
import { validateRole } from "../../middlewares/validateRole";

const router = Router();

router.post("/signup", validateSchema(signUpUserInputSchema), signUpHandler);
router.post("/login", validateSchema(loginUserInputSchema), loginHandler);
router.get(
  "/users/:userId/projects",
  [validateRole(["admin", "user", "superadmin"])],
  getAllProjectByUserIdHandler
);
router.use("/api", router);

export default router;
