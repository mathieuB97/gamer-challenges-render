import { Contribution, User, Challenge } from '../models/index.js';
import BaseController from './base.controller.js';

class ContributionController extends BaseController {
    constructor() {
        super(Contribution, 'Contribution');
    }

    // Fonction pour définir les options de requête, notamment les jointures
    getRequestOptions(req) {
        return [
            // Inclusion du modèle User, alias 'creator' dans les associations
            // et "attributes" pour ne récupérer que le pseudo
            { 
                model: User, 
                as: 'creator',
                attributes: ['pseudo'], 
            },

            // Inclusion du modèle Challenge, alias 'challenge' dans les associations
            { 
                model: Challenge, 
                as: 'challenge',
                attributes: ['name', 'game_id'],
            },
        ];
    }
}

export default new ContributionController();
