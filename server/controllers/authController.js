const jwt = require("jsonwebtoken");
const User = require("../models/User");

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET || "fallback_secret_key", {
    expiresIn: process.env.JWT_EXPIRE || "7d",
  });
};

const sendTokenResponse = (user, statusCode, res, message) => {
  const token = generateToken(user._id);

  res.status(statusCode).json({
    success: true,
    message,
    token,
    user: user.toSafeObject(),
  });
};

/**
 * @desc    Inscription d'un nouvel utilisateur
 * @route   POST /api/auth/register
 * @access  Public
 */
const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email et mot de passe sont requis",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Un utilisateur avec cet email existe déjà",
      });
    }

    const user = await User.create({
      email,
      password,
    });

    sendTokenResponse(user, 201, res, "Utilisateur créé avec succès");
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: "Données invalides",
        errors: messages,
      });
    }

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Un utilisateur avec cet email existe déjà",
      });
    }

    res.status(500).json({
      success: false,
      message: "Erreur serveur lors de l'inscription",
    });
  }
};

/**
 * @desc    Connexion d'un utilisateur
 * @route   POST /api/auth/login
 * @access  Public
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email et mot de passe sont requis",
      });
    }

    try {
      const user = await User.findByCredentials(email, password);

      sendTokenResponse(user, 200, res, "Connexion réussie");
    } catch (authError) {
      return res.status(401).json({
        success: false,
        message: "Identifiants invalides",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erreur serveur lors de la connexion",
    });
  }
};

/**
 * @desc    Récupérer le profil de l'utilisateur connecté
 * @route   GET /api/auth/profile
 * @access  Private
 */
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Utilisateur non trouvé",
      });
    }

    res.json({
      success: true,
      message: "Profil récupéré avec succès",
      user: user.toSafeObject(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erreur serveur lors de la récupération du profil",
    });
  }
};

module.exports = {
  register,
  login,
  getProfile,
};
