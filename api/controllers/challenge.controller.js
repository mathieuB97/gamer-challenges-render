import { Challenge, Game, User } from '../models/index.js';
import BaseController from './base.controller.js';

class ChallengeController extends BaseController {
    constructor() {
        // On passe le modèle Challenge au BaseController
        super(Challenge, 'Challenge');
    }

    getRequestOptions(req) {
        return [
            { model: Game, as: 'game' },
            { model: User, as: 'creator' }
        ];
    }
}

export default new ChallengeController();