import { Game, Challenge, User } from '../models/index.js';
import BaseController from './base.controller.js';


class GameController extends BaseController {
    constructor() {
        super(Game, 'Game');
    }

    // Cette méthode permets de customiser ce que l'on veut récupérer(notamment les jointures entre games et challenges)
    getRequestOptions(req) {
        if (req.query.include === 'challenges') {
            return [{ model: Challenge, as: 'challenges' }];
        }
        return null;
    }

    /**
     * GET /games/:id/challenges
     * Retourne tous les challenges d'un jeu donné
     */
    async getChallengesByGameId(req, res, next) {
        try {
            const gameId = req.params.id;
            const game = await Game.findByPk(gameId, {
                include: [{ model: Challenge, as: 'challenges' }],
            });
            if (!game) {
                return res.status(404).json({ message: "Jeu non trouvé" });
            }
            return res.json({ challenges: game.challenges });
        } catch (error) {
            next(error);
        }
    }
}

export default new GameController();