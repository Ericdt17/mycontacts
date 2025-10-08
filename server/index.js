const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
require("dotenv").config();

const connectDB = require("./config/database");
const authRoutes = require("./routes/auth");
const contactRoutes = require("./routes/contacts");
const { errorHandler, notFound } = require("./middleware/errorHandler");

const app = express();

connectDB();

const ALLOWED_ORIGINS = [
  "http://localhost:4000",
  "https://mycontacts-eric.netlify.app",
];

app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin) return cb(null, true);
      return cb(null, ALLOWED_ORIGINS.includes(origin));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.options("*", cors());

app.use(
  helmet({
    crossOriginResourcePolicy: false,
    contentSecurityPolicy: false,
  })
);

app.use(morgan("combined"));

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Contact App API",
      version: "1.0.0",
      description:
        "API pour l'application de gestion de contacts avec authentification JWT",
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 5500}`,
        description: "Serveur de développement",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./routes/*.js", "./models/*.js"],
};

const specs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use("/api/auth", authRoutes);
app.use("/api/contacts", contactRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Bienvenue sur l'API Contact App!",
    documentation: "/api-docs",
    version: "2.0.0",
    endpoints: {
      authentication: "/api/auth",
      contacts: "/api/contacts",
      documentation: "/api-docs",
    },
  });
});

app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur le port ${PORT}`);
  console.log(
    `📖 Documentation disponible sur http://localhost:${PORT}/api-docs`
  );
});
