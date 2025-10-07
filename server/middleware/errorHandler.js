/**
 * Middleware pour gérer les erreurs
 * @param {Error} err - L'erreur à traiter
 * @param {Request} req - La requête Express
 * @param {Response} res - La réponse Express
 * @param {Function} next - La fonction next d'Express
 */
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  console.error(`❌ Erreur: ${err.message}`);
  if (process.env.NODE_ENV === "development") {
    console.error(err.stack);
  }

  res.status(statusCode).json({
    success: false,
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
  });
};

/**
 * Middleware pour gérer les routes non trouvées
 * @param {Request} req - La requête Express
 * @param {Response} res - La réponse Express
 * @param {Function} next - La fonction next d'Express
 */
const notFound = (req, res, next) => {
  const error = new Error(`Route non trouvée: ${req.originalUrl}`);
  res.status(404);
  next(error);
};

module.exports = { errorHandler, notFound };
