import { Router } from "express";
import gameController from "../controllers/game.controller.js";

const router = Router();

router.get('/games', gameController.getAll);
router.get('/games/:id', gameController.getById);

export default router;