# 📋 Description du Projet pour CV
## Application de Gestion de Contacts

---

## 📌 Titre du Projet
**Application Web de Gestion de Contacts avec Authentification JWT**

---

## 🎯 Description du Projet
Application web full-stack moderne permettant aux utilisateurs de gérer leur carnet de contacts personnel. L'application offre un système d'authentification sécurisé, une interface utilisateur intuitive en React, et une API REST complète pour la gestion des contacts.

**URL en ligne :**
- Frontend : https://mycontacts-eric.netlify.app
- Backend API : https://mycontacts-ozo1.onrender.com
- Documentation API : https://mycontacts-ozo1.onrender.com/api-docs

---

## 🛠️ Technologies Utilisées

### **Frontend**
- **React 19.2** (TypeScript)
- **React Router DOM** - Navigation
- **Axios** - Appels API HTTP
- **CSS3** - Styling personnalisé
- **TypeScript** - Typage statique

### **Backend**
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **MongoDB** (MongoDB Atlas) - Base de données NoSQL
- **Mongoose** - ODM pour MongoDB
- **JWT (JSON Web Tokens)** - Authentification
- **bcryptjs** - Hachage des mots de passe
- **CORS** - Configuration cross-origin
- **Helmet** - Sécurité HTTP
- **Morgan** - Logging des requêtes
- **Swagger/OpenAPI** - Documentation API

### **Déploiement**
- **Netlify** - Hébergement frontend
- **Render** - Hébergement backend
- **MongoDB Atlas** - Base de données cloud

---

## ✨ Fonctionnalités Principales

### **1. Authentification & Sécurité**
- ✅ Inscription d'utilisateurs avec validation
- ✅ Connexion avec JWT token
- ✅ Hachage sécurisé des mots de passe (bcrypt, 12 rounds)
- ✅ Middleware d'authentification pour protéger les routes
- ✅ Gestion automatique des tokens (stockage localStorage)
- ✅ Déconnexion sécurisée
- ✅ Isolation des données par utilisateur

### **2. Gestion des Contacts (CRUD complet)**
- ✅ **Création** : Ajouter de nouveaux contacts (prénom, nom, téléphone)
- ✅ **Lecture** : Liste de tous les contacts de l'utilisateur
- ✅ **Modification** : Mise à jour des informations de contact
- ✅ **Suppression** : Suppression de contacts avec confirmation
- ✅ Validation des données (email, téléphone unique)
- ✅ Messages d'erreur personnalisés

### **3. Interface Utilisateur**
- ✅ Design moderne et responsive
- ✅ Formulaires d'authentification (login/register)
- ✅ Modal de création/édition de contacts
- ✅ Modal de confirmation de suppression
- ✅ Gestion des états de chargement
- ✅ Affichage des messages d'erreur
- ✅ Interface intuitive et accessible

### **4. API REST**
- ✅ Routes RESTful complètes
- ✅ Documentation Swagger/OpenAPI interactive
- ✅ Gestion d'erreurs centralisée
- ✅ Validation des requêtes
- ✅ Codes de statut HTTP appropriés
- ✅ Format de réponse JSON uniforme

---

## 🏗️ Architecture du Projet

### **Structure Backend (Server)**
```
server/
├── config/
│   └── database.js          # Configuration MongoDB
├── controllers/
│   ├── authController.js    # Contrôleurs authentification
│   └── contactController.js # Contrôleurs contacts
├── middleware/
│   ├── auth.js              # Middleware JWT
│   └── errorHandler.js      # Gestion des erreurs
├── models/
│   ├── User.js              # Modèle utilisateur
│   └── Contact.js           # Modèle contact
├── routes/
│   ├── auth.js              # Routes authentification
│   └── contacts.js          # Routes contacts
└── index.js                 # Point d'entrée serveur
```

### **Structure Frontend (Client)**
```
client/
├── src/
│   ├── components/
│   │   ├── AuthForm.tsx     # Formulaire login/register
│   │   ├── ContactCard.tsx  # Carte de contact
│   │   ├── ContactList.tsx  # Liste des contacts
│   │   ├── ContactModal.tsx # Modal création/édition
│   │   ├── DeleteModal.tsx  # Modal suppression
│   │   └── Header.tsx       # En-tête avec logout
│   ├── services/
│   │   └── api.ts           # Configuration Axios & API calls
│   ├── App.tsx              # Composant principal
│   └── index.tsx            # Point d'entrée React
```

---

## 🔐 Sécurité Implémentée

- ✅ **Hachage de mots de passe** : bcrypt avec 12 rounds de salage
- ✅ **JWT Tokens** : Authentification stateless avec expiration
- ✅ **Middleware de protection** : Routes protégées par authentification
- ✅ **Validation des données** : Validation côté serveur pour toutes les entrées
- ✅ **CORS configuré** : Protection cross-origin avec whitelist
- ✅ **Helmet.js** : Headers de sécurité HTTP
- ✅ **Isolation des données** : Chaque utilisateur voit uniquement ses contacts
- ✅ **Variables d'environnement** : Secrets stockés sécurément

---

## 📡 API Endpoints

### **Authentification**
- `POST /api/auth/register` - Inscription
- `POST /api/auth/login` - Connexion
- `GET /api/auth/profile` - Profil utilisateur (protégé)

### **Contacts** (toutes protégées)
- `GET /api/contacts` - Liste des contacts
- `POST /api/contacts` - Créer un contact
- `GET /api/contacts/:id` - Détails d'un contact
- `PATCH /api/contacts/:id` - Modifier un contact
- `DELETE /api/contacts/:id` - Supprimer un contact

---

## 🚀 Points Forts du Projet

1. **Architecture Full-Stack** : Application complète frontend + backend
2. **TypeScript** : Code typé pour une meilleure maintenabilité
3. **Sécurité renforcée** : Authentification JWT, hachage bcrypt, protection CORS
4. **Documentation API** : Swagger/OpenAPI interactive pour tester l'API
5. **Déploiement Cloud** : Application déployée et accessible en ligne
6. **Gestion d'erreurs** : Messages d'erreur clairs et gestion centralisée
7. **UX optimisée** : Modals, confirmations, états de chargement
8. **Code structuré** : Architecture MVC, séparation des responsabilités

---

## 📝 Format CV (Version courte)

**Application de Gestion de Contacts** | Full-Stack Web Application
- Développement d'une application web full-stack de gestion de contacts avec authentification JWT
- **Stack technique** : React 19 + TypeScript, Node.js + Express, MongoDB, JWT
- Implémentation d'un système d'authentification sécurisé (bcrypt, JWT tokens)
- Développement d'une API REST complète avec documentation Swagger/OpenAPI
- Interface utilisateur responsive avec modals, gestion d'état et validation
- Déploiement sur Netlify (frontend) et Render (backend) avec MongoDB Atlas
- Gestion complète CRUD des contacts avec isolation des données par utilisateur

---

## 📝 Format CV (Version détaillée)

**Application Web de Gestion de Contacts** | Projet Personnel | [Date]
- **Technologies** : React 19, TypeScript, Node.js, Express.js, MongoDB, JWT, Axios
- **Description** : Application web full-stack permettant la gestion personnelle de contacts avec authentification sécurisée
- **Responsabilités** :
  - Développement frontend avec React et TypeScript (interface responsive, modals, gestion d'état)
  - Conception et développement backend avec Node.js/Express (API REST, middleware, validation)
  - Implémentation de l'authentification JWT avec hachage sécurisé des mots de passe (bcrypt)
  - Configuration et gestion de la base de données MongoDB avec Mongoose
  - Documentation complète de l'API avec Swagger/OpenAPI
  - Déploiement et configuration sur Netlify (frontend) et Render (backend)
  - Gestion d'erreurs, validation des données, sécurité CORS et isolation des données
- **Résultat** : Application déployée et fonctionnelle accessible en ligne

---

## 🎓 Compétences Développées

- **Développement Frontend** : React, TypeScript, gestion d'état, composants réutilisables
- **Développement Backend** : Node.js, Express, API REST, middleware, routing
- **Base de données** : MongoDB, Mongoose, modélisation de schémas, requêtes
- **Authentification** : JWT, bcrypt, sécurisation des routes, gestion des tokens
- **Sécurité** : Hachage de mots de passe, CORS, Helmet, validation des données
- **Déploiement** : Netlify, Render, MongoDB Atlas, configuration de production
- **Documentation** : Swagger/OpenAPI, README, commentaires de code
- **Outils** : Git, npm, Postman/Thunder Client (tests API)

---

## 📞 Informations de Contact du Projet

- **Lien Frontend** : https://mycontacts-eric.netlify.app
- **Lien Backend API** : https://mycontacts-ozo1.onrender.com
- **Documentation API** : https://mycontacts-ozo1.onrender.com/api-docs

---

## 💡 Suggestions pour Entretien

1. **Démo** : Montrer l'application en ligne et expliquer les fonctionnalités
2. **Code** : Présenter la structure du projet et expliquer les choix techniques
3. **Sécurité** : Expliquer les mesures de sécurité (JWT, bcrypt, CORS)
4. **Challenges** : Parler des problèmes rencontrés (CORS, validation, déploiement)
5. **Améliorations futures** : Recherche de contacts, export CSV, photos de profil

---

**Date de création** : [À compléter avec la date]  
**Statut** : ✅ En production et accessible en ligne




