import { Router } from "express";
import challengeController from "../controllers/challenge.controller.js";
import { isAllowed } from "../middlewares/auth.middleware.js";

const router = Router();

router.get('/challenges', challengeController.getChallengesGrouped); // Tous les challenges groupés par catégorie
router.get('/leaderboard', challengeController.getLeaderboard); // Leaderboard des joueurs
router.get('/challenges/:id', challengeController.getById); // Détails d'un challenge par son id
router.post('/challenges', isAllowed('user'), challengeController.create); // Créer un nouveau challenge

export default router;