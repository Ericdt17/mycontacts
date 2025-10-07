const jwt = require("jsonwebtoken");
const User = require("../models/User");

/**
 * Middleware pour protéger les routes avec authentification JWT
 * @desc    Vérifier si l'utilisateur est authentifié
 * @access  Middleware
 */
const requireAuth = async (req, res, next) => {
  try {
    let token;

    // Vérifier si le token est présent dans les headers
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      // Extraire le token du header Authorization
      token = req.headers.authorization.split(" ")[1];
    }

    // Vérifier si le token existe
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Accès refusé. Token manquant.",
      });
    }

    try {
      // Vérifier et décoder le token
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || "fallback_secret_key"
      );

      // Vérifier si l'utilisateur existe encore
      const user = await User.findById(decoded.userId);
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Token invalide. Utilisateur non trouvé.",
        });
      }

      // Attacher l'utilisateur à la requête
      req.user = {
        userId: user._id,
        email: user.email,
      };

      next();
    } catch (jwtError) {
      console.error("Erreur JWT:", jwtError.message);

      // Gestion spécifique des erreurs JWT
      let message = "Token invalide";
      if (jwtError.name === "TokenExpiredError") {
        message = "Token expiré";
      } else if (jwtError.name === "JsonWebTokenError") {
        message = "Token malformé";
      }

      return res.status(401).json({
        success: false,
        message,
      });
    }
  } catch (error) {
    console.error("Erreur dans le middleware requireAuth:", error);
    res.status(500).json({
      success: false,
      message: "Erreur serveur lors de l'authentification",
    });
  }
};

/**
 * Middleware optionnel pour récupérer l'utilisateur si authentifié
 * @desc    Récupérer l'utilisateur s'il est authentifié (sans bloquer l'accès)
 * @access  Middleware
 */
const optionalAuth = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (token) {
      try {
        const decoded = jwt.verify(
          token,
          process.env.JWT_SECRET || "fallback_secret_key"
        );
        const user = await User.findById(decoded.userId);

        if (user) {
          req.user = {
            userId: user._id,
            email: user.email,
          };
        }
      } catch (jwtError) {
        // En cas d'erreur JWT, on continue sans utilisateur
        console.log("Token invalide en mode optionnel:", jwtError.message);
      }
    }

    next();
  } catch (error) {
    console.error("Erreur dans le middleware optionalAuth:", error);
    next(); // On continue même en cas d'erreur
  }
};

module.exports = {
  requireAuth,
  optionalAuth,
};
