import { Router } from "express";
import { validateSchema } from "../../middlewares/validateSchema";
import { loginUserInputSchema, signUpUserInputSchema } from "../../schemas/user_schema";
import { loginHandler, signUpHandler } from "./user_controller";

const router = Router();

router.post("/signup", validateSchema(signUpUserInputSchema), signUpHandler);
router.post("/login", validateSchema(loginUserInputSchema), loginHandler);
router.use("/api", router);

export default router;
