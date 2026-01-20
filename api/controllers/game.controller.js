import { Game, Challenge, User } from '../models/index.js';
import BaseController from './base.controller.js';

class GameController extends BaseController {
    constructor() {
        super(Game, 'Game');
    }

    // Cette méthode permets de customiser ce que l'on veut récupérer(notamment les jointures entre games et challenges)
    getRequestOptions(req) {

        // Si on demande explicitement l'inclusion des challenges
        if (req.query.include === 'challenges') {
            return [{ model: Challenge, as: 'challenges' }];
        }
        // Cette méthode permets de renvoyer la liste des challenges associés à un jeu. On renvoie null si on ne veut pas de jointure (si pas de challenges associés à un jeux alors les jeux s'affichent quand même)
        return null;
    }
}

export default new GameController();