import { Router } from "express";
import contributionController from "../controllers/contribution.controller.js";

const router = Router();

router.post("/contributions", contributionController.create);

export default router;