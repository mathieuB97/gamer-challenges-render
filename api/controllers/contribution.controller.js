import { Contribution, User, Challenge } from '../models/index.js';
import BaseController from './base.controller.js';

class ContributionController extends BaseController {
    constructor() {
        super(Contribution, 'Contribution');
    }
    }

export default new ContributionController();