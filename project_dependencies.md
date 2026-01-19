📝 Récapitulatif des Dépendances du Projet
Ce document recense les outils et bibliothèques installés pour assurer le bon fonctionnement, la sécurité et la communication du projet.

🖥️ Back-end (Node.js & Express)
🏗️ Architecture & Base de données
Express : Framework minimaliste pour gérer les routes API et les requêtes HTTP.

Sequelize : ORM (Object-Relational Mapping) pour interagir avec la base de données via des objets JavaScript.

PG (node-postgres) : Pilote (driver) permettant la communication entre Node.js et PostgreSQL.

🔐 Sécurité & Authentification
Argon2 : Algorithme de hachage robuste pour sécuriser les mots de passe en base de données (plus performant que bcrypt).

JSON Web Token (JWT) : Système de jetons pour l'authentification et la sécurisation des échanges entre le client et le serveur.

Express XSS Sanitizer : Middleware pour nettoyer les entrées utilisateur et prévenir les attaques par injection de scripts (XSS).

Cors : Permet de définir les origines autorisées à interagir avec l'API (nécessaire pour la communication avec le Front-end).

🛠️ Utilitaires & Validation
Dotenv : Gestion des variables d'environnement (clés secrètes, ports, identifiants DB) via un fichier .env.

Joi : Bibliothèque de validation de schémas pour s'assurer que les données reçues (corps de requête, paramètres) sont conformes.

🎨 Front-end (SvelteKit)
Vite : Outil de build ultra-rapide qui gère le rechargement à chaud (HMR) et le bundling.

SvelteKit : Framework basé sur Svelte pour construire des applications web modernes, gérant nativement le routage, le rendu côté serveur (SSR) et l'hydratation.
