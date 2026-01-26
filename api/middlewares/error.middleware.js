import HttpError from '../utils/HttpError.js';

// Middleware global de gestion des erreurs Express
export default function errorMiddleware(err, req, res, next) {
  let errorToSend = err instanceof HttpError
    ? err
    : new HttpError(err.message || 'Erreur serveur', err.statusCode || 500);

  if (process.env.NODE_ENV !== 'production') {
    console.error('[HttpError]', errorToSend);
  }

  res.status(errorToSend.statusCode).json({
    error: errorToSend.message,
    statusCode: errorToSend.statusCode
  });
}
