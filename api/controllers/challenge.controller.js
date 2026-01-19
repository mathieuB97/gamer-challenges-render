import { user, Challenge } from '../models/index.js';
import BaseController from './base.controller.js';

class ChallengeController extends BaseController {
    constructor() {
        super(Challenge, 'Challenge');
    }
}

export default new ChallengeController();