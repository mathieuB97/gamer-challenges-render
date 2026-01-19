# Correspondances Routes Frontend ↔ Routes Backend (API)

Tableau récapitulatif des pages frontend et des endpoints backend qu'elles utilisent principalement.  


| Route Frontend (URL)                          | Page / Composant               | Méthode HTTP principale | Routes Backend appelées (principales)                                                                 | Type d'action principale | Accessible sans connexion ? | Remarques / Utilisation principale |
|-----------------------------------------------|--------------------------------|--------------------------|-------------------------------------------------------------------------------------------------------|--------------------------|-----------------------------|------------------------------------|
| `/`                                           | HomePage                       | GET                      | - GET `/api/games`<br>- GET `/api/challenges`<br>- GET `/api/leaderboard`                             | Chargement données       | Oui                         | Accueil : top jeux, défis trending, mini-classement |
| `/games`                                      | GamesListPage                  | GET                      | GET `/api/games`                                                                                      | Liste complète           | Oui                         | Catalogue de tous les jeux disponibles |
| `/games/:gameId`                              | GameDetailPage                 | GET                      | - GET `/api/games/:gameId`<br>- GET `/api/games/:gameId/challenges`                                   | Détail + liste           | Oui                         | Détail jeu + tous les challenges associés |
| `/games/:gameId/create-challenge`             | CreateChallengePage            | POST                     | POST `/api/challenges`                                                                                | Création                 | Non                         | Formulaire de proposition de challenge (lié au jeu) |
| `/games/:gameId/challenges/:challengeId`      | ChallengeDetailPage            | GET                      | - GET `/api/challenges/:challengeId`<br>- GET `/api/challenges/:challengeId/contributions`<br>- GET `/api/challenges/:challengeId/votes` | Détail + participations + stats | Oui                         | Page centrale : description, vidéos, stats |
| `/games/:gameId/challenges/:challengeId` (action) | ChallengeDetailPage        | POST                     | - POST `/api/challenges/:challengeId/vote`<br>- POST `/api/contributions/:contributionId/vote`       | Vote                     | Oui                         | Voter pour le challenge ou une participation |
| `/inscription`                                | RegisterPage                   | POST                     | POST `/api/auth/register`                                                                             | Inscription              | Oui                         | Création de compte |
| `/connexion`                                  | LoginPage                      | POST                     | POST `/api/auth/login`                                                                                | Connexion                | Oui                         | Connexion + stockage JWT |
| (Utilisé globalement – header/profil)         | — (store utilisateur)          | GET                      | GET `/api/auth/me`                                                                                    | Infos utilisateur        | Non (après login)           | Chargement profil utilisateur connecté |

### Résumé rapide des correspondances essentielles

| Action utilisateur principale                  | Page frontend concernée                  | Routes backend principales appelées                          |
|------------------------------------------------|------------------------------------------|--------------------------------------------------------------|
| Voir la liste des jeux                         | `/games`                                 | GET `/api/games`                                             |
| Voir les détails d’un jeu + ses challenges     | `/games/:gameId`                         | GET `/api/games/:gameId` + GET `/api/games/:gameId/challenges` |
| Proposer un nouveau challenge                  | `/games/:gameId/create-challenge`        | POST `/api/challenges`                                       |
| Voir un challenge en détail                    | `/games/:gameId/challenges/:challengeId` | GET `/api/challenges/:challengeId` + GET contributions + GET votes |
| Voter pour un challenge                        | même page                                | POST `/api/challenges/:challengeId/vote`                     |
| Voter pour une participation                   | même page                                | POST `/api/contributions/:contributionId/vote`               |
| S’inscrire                                     | `/inscription`                           | POST `/api/auth/register`                                    |
| Se connecter                                   | `/connexion`                             | POST `/api/auth/login`                                       |
| Récupérer infos utilisateur connecté           | Toutes les pages (store)                 | GET `/api/auth/me`                                           |

Ce tableau montre parfaitement comment **chaque page frontend** consomme les routes backend.  
Il est idéal pour la documentation de ton projet d'apothéose.

Tu peux le copier tel quel ou l'ajouter à ton cahier des charges.

Si tu veux qu'on passe à l'implémentation (exemple de fichier `api.js`, configuration du routeur Svelte, ou code d'une page spécifique), dis-le-moi ! 🚀
