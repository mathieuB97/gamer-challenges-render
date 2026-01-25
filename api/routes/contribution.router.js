import { Router } from "express";
import contributionController from "../controllers/contribution.controller.js";
import { isAllowed, validateToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/contributions", validateToken, isAllowed('user'), contributionController.create);
export default router;