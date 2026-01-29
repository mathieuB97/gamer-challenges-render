# Correspondances Routes Frontend ↔ Routes Backend (API)

Documentation des routes frontend et leur correspondance avec l'API  
(Projet Apothéose O'clock – Mise à jour : 29 janvier 2026)

**Base URL Frontend :** `http://localhost:5173`  
**Base URL Backend :** `http://localhost:3000`

---

## Routes Frontend Implémentées

| Route Frontend (URL)                          | Page / Composant               | Méthode HTTP principale | Routes Backend appelées (principales)                                                                 | Type d'action principale | Accessible sans connexion ? | Remarques / Utilisation principale |
|-----------------------------------------------|--------------------------------|--------------------------|-------------------------------------------------------------------------------------------------------|--------------------------|-----------------------------|------------------------------------|
| `/`                                           | Home.svelte                    | GET                      | - GET `/challenges/latest`<br>- GET `/votes/top-challenges`<br>- GET `/leaderboard`<br>- **GET `/challenges/search/filter` 🆕** | Chargement données       | Oui                         | Accueil : top challenges, nouveaux défis, leaderboard, **filtres de recherche** |
| `/jeux`                                       | Games.svelte                   | GET                      | GET `/games`                                                                                          | Liste complète           | Oui                         | Catalogue de tous les jeux disponibles |
| `/jeux/:id/challenges`                        | ChallengeLists.svelte          | GET                      | - GET `/games/:id`<br>- GET `/games/:id/challenges`                                                  | Détail + liste           | Oui                         | Liste des challenges d'un jeu spécifique |
| `/jeux/:id/creation-challenge`                | CreateChallenge.svelte         | POST                     | POST `/challenges`                                                                                    | Création                 | Non (JWT requis)            | Formulaire de proposition de challenge (lié au jeu) |
| `/detail-challenge/:id`                       | DetailsChallenge.svelte        | GET, POST                | - GET `/challenges/:id`<br>- POST `/votes/challenge/:id`<br>- POST `/contributions`                  | Détail + participations + vote | Oui (vote: JWT requis)   | Page centrale : description, vidéos, stats, votes |
| `/inscription`                                | Register.svelte                | POST                     | POST `/auth/register`                                                                                 | Inscription              | Oui                         | Création de compte |
| `/connexion`                                  | Connexion.svelte               | POST                     | POST `/auth/login`                                                                                    | Connexion                | Oui                         | Connexion + stockage JWT (redirection vers home) |
| `/a-propos`                                   | About.svelte                   | —                        | —                                                                                                     | Page statique            | Oui                         | Présentation du projet |
| `/rgpd`                                       | RGPD.svelte                    | —                        | —                                                                                                     | Page statique            | Oui                         | Politique de confidentialité |
| `/contact`                                    | Contact.svelte                 | —                        | —                                                                                                     | Page statique            | Oui                         | Formulaire de contact |
| `*` (route inconnue)                          | NotFound.svelte                | —                        | —                                                                                                     | Page erreur 404          | Oui                         | Page non trouvée |
| (Header/Store global)                         | Header.svelte                  | GET                      | GET `/auth/me`                                                                                        | Infos utilisateur        | Non (après login)           | Chargement profil utilisateur connecté |

---

## Redirections

| Route Frontend (ancienne)                     | Redirige vers                    | Remarque |
|-----------------------------------------------|----------------------------------|----------|
| `/liste-challenges/:id`                       | `/jeux/:id/challenges`           | Redirection vers la nouvelle nomenclature |

---

## Résumé des Actions Utilisateur

| Action utilisateur principale                  | Page frontend concernée                  | Routes backend principales appelées                          |
|------------------------------------------------|------------------------------------------|--------------------------------------------------------------|
| Voir la page d'accueil avec filtres            | `/`                                      | GET `/challenges/latest`, GET `/votes/top-challenges`, GET `/leaderboard`, **GET `/challenges/search/filter`** |
| **Filtrer les challenges**                     | `/` 🆕                                   | **GET `/challenges/search/filter?gameId=X&level=Y&sortBy=Z`** |
| Voir la liste des jeux                         | `/jeux`                                  | GET `/games`                                                 |
| Voir les challenges d'un jeu                   | `/jeux/:id/challenges`                   | GET `/games/:id`, GET `/games/:id/challenges`                |
| Proposer un nouveau challenge                  | `/jeux/:id/creation-challenge`           | POST `/challenges`                                           |
| Voir un challenge en détail                    | `/detail-challenge/:id`                  | GET `/challenges/:id`                                        |
| Voter pour un challenge                        | `/detail-challenge/:id`                  | POST `/votes/challenge/:id`                                  |
| Soumettre une participation (vidéo)            | `/detail-challenge/:id`                  | POST `/contributions`                                        |
| Voter pour une participation                   | `/detail-challenge/:id`                  | POST `/votes/contribution/:id`                               |
| S'inscrire                                     | `/inscription`                           | POST `/auth/register`                                        |
| Se connecter                                   | `/connexion`                             | POST `/auth/login`                                           |
| Récupérer infos utilisateur connecté           | Toutes les pages (store)                 | GET `/auth/me`                                               |
| Voir le classement des joueurs                 | `/` (section leaderboard)                | GET `/leaderboard`                                           |
| Consulter la politique RGPD                    | `/rgpd`                                  | —                                                            |
| Contacter l'équipe                             | `/contact`                               | —                                                            |

---

## Fonctionnalités Frontend Principales

### 🏠 Page d'accueil (/)
- **Top Challenges** : Carrousel des challenges les plus votés
- **Nouveaux Challenges** : Les 7 derniers challenges créés
- **Leaderboard** : Classement des meilleurs joueurs
- **🆕 Filtres de recherche** : Filtrer par jeu, niveau (facile/moyen/difficile) et popularité

### 🎮 Catalogue des jeux (/jeux)
- Liste complète des jeux disponibles
- Accès aux challenges de chaque jeu

### 🏆 Liste des challenges d'un jeu (/jeux/:id/challenges)
- Tous les challenges associés à un jeu spécifique
- Possibilité de créer un nouveau challenge (utilisateur connecté)

### 📝 Création de challenge (/jeux/:id/creation-challenge)
- Formulaire de création de challenge
- Authentification requise (JWT)

### 🎯 Détail d'un challenge (/detail-challenge/:id)
- Description complète du challenge
- Liste des participations (vidéos)
- Système de votes (challenge et participations)
- Soumission de participation (authentification requise)

### 🔐 Authentification
- **Inscription** : Création de compte avec email, pseudo, mot de passe
- **Connexion** : Authentification avec JWT, redirection automatique vers la home

---

## Nouveautés / Changelog

### 29 janvier 2026
- ✅ Ajout des **filtres de recherche** sur la page d'accueil (jeu, niveau, popularité)
- ✅ Correction de la redirection après connexion (toujours vers `/`)
- ✅ Mise à jour complète de la documentation des routes frontend

---

## Notes Techniques

- **Router** : Utilisation de `page.js` pour la navigation SPA
- **Authentification** : JWT stocké dans localStorage
- **Store global** : Svelte stores pour `authStore` et `userStore`
- **API Client** : Fonction centralisée `api()` dans `lib/api.js`
- **Protection des routes** : Middleware client-side pour vérifier l'authentification

---

**Version Frontend :** 1.0.0  
**Date de mise à jour :** 29 janvier 2026
