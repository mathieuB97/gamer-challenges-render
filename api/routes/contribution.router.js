import { Router } from "express";
import contributionController from "../controllers/contribution.controller.js";
import { isAllowed, validateToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/contributions", validateToken, isAllowed('user'), contributionController.create);
// Récupérer toutes les contributions d'un user
// Route pour récupérer les votes sur contribution du user courant (via token)
router.get(
    "/contributions/votes/me",
    validateToken,
    isAllowed('user'),
    contributionController.getUserContributionVotes
);
// Récupérer les votes sur contributions d'un user grace à la table pivot user_contribution et le user_id récupéré via le token

export default router;