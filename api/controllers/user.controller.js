import { User } from '../models/index.js';
import BaseController from './base.controller.js';


class UserController extends BaseController {
    constructor() {
        super(User);
    }
    // Pas besoin de redéfinir getAll ni getById, hérités de BaseController
}

export default new UserController();
