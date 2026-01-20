import { Router } from "express";
import challengeController from "../controllers/challenge.controller.js";

const router = Router();

router.get('/challenges/:id', challengeController.getById);
router.post('/challenges', challengeController.create);

export default router;