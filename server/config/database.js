const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/contact_app"
    );

    console.log(`MongoDB connecté: ${conn.connection.host}`);

    // Gestion des événements de connexion
    mongoose.connection.on("error", (err) => {
      console.error("Erreur MongoDB:", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.log(" MongoDB déconnecté");
    });

    // Fermeture propre de la connexion
    process.on("SIGINT", async () => {
      await mongoose.connection.close();
      console.log("Connexion MongoDB fermée");
      process.exit(0);
    });
  } catch (error) {
    console.error("Erreur de connexion MongoDB:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
