const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         _id:
 *           type: string
 *           description: ID unique de l'utilisateur
 *         email:
 *           type: string
 *           format: email
 *           description: Adresse email unique de l'utilisateur
 *         password:
 *           type: string
 *           description: Mot de passe hashé (non retourné dans les réponses)
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Date de création du compte
 *       example:
 *         _id: "507f1f77bcf86cd799439011"
 *         email: "user@example.com"
 *         createdAt: "2023-10-01T10:00:00.000Z"
 */

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "L'email est requis"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Veuillez entrer un email valide",
      ],
    },
    password: {
      type: String,
      required: [true, "Le mot de passe est requis"],
      minlength: [6, "Le mot de passe doit contenir au moins 6 caractères"],
      select: false, // Ne pas retourner le mot de passe dans les requêtes par défaut
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Ajoute automatiquement createdAt et updatedAt
    versionKey: false, // Supprime le champ __v
  }
);

// L'index unique est déjà créé automatiquement par la propriété unique: true

// Middleware pour hasher le mot de passe avant de sauvegarder
userSchema.pre("save", async function (next) {
  // Si le mot de passe n'a pas été modifié, passer au suivant
  if (!this.isModified("password")) {
    return next();
  }

  try {
    // Hasher le mot de passe avec bcrypt
    const saltRounds = 12;
    this.password = await bcrypt.hash(this.password, saltRounds);
    next();
  } catch (error) {
    next(error);
  }
});

// Méthode pour comparer les mots de passe
userSchema.methods.comparePassword = async function (enteredPassword) {
  try {
    return await bcrypt.compare(enteredPassword, this.password);
  } catch (error) {
    throw new Error("Erreur lors de la comparaison du mot de passe");
  }
};

// Méthode pour retourner l'utilisateur sans le mot de passe
userSchema.methods.toSafeObject = function () {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

// Méthode statique pour trouver un utilisateur par email avec mot de passe
userSchema.statics.findByCredentials = async function (email, password) {
  const user = await this.findOne({ email }).select("+password");

  if (!user) {
    throw new Error("Utilisateur non trouvé");
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new Error("Mot de passe incorrect");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
