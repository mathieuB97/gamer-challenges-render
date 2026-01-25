import HttpError from '../utils/HttpError.js';

export function validateIdParam(req, res, next) {
    const { id } = req.params;
    if (!id || isNaN(Number(id)) || !Number.isInteger(Number(id))) {
        // id doit être un nombre entier
        return next(new HttpError('Paramètre id invalide, un nombre entier est requis', 400));
    }
    next();
}
