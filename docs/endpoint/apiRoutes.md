# Routes API Backend – GamerChallenges

Documentation des endpoints de l'API  
(Projet Apothéose O'clock – version actuelle – janvier 2026)

## 1. Authentification


| Méthode | Route              | Description                                      | Auth requise | Body / Query Params                              | Priorité |
|---------|--------------------|--------------------------------------------------|--------------|--------------------------------------------------|----------|
| POST    | `/auth/register`   | Inscription d’un nouvel utilisateur              | Non          | `{ email, pseudo, password, name? }`             | ★★★★★    |
| POST    | `/auth/login`      | Connexion → retourne un JWT                      | Non          | `{ email ou pseudo, password }`                  | ★★★★★    |
| GET     | `/auth/me`         | Récupérer le profil de l’utilisateur connecté    | Oui (JWT)    | —                                                | ★★★★     |


## 2. Jeux (Games)

| Méthode | Route                   | Description                                                                 | Auth requise | Query / Params                                   | Priorité |
|---------|-------------------------|-----------------------------------------------------------------------------|--------------|--------------------------------------------------|----------|
| GET     | `/games`                | Liste paginée de tous les jeux                                              | Non          |                                                  | ★★★★★    |
| GET     | `/games/:gameId`        | Détails d’un jeu + ses challenges associés (envoi participation possible)   | Non          | —                                                | ★★★★★    |

 
Possibilité d’envoyer une participation comme preuve directement depuis cette page (user only).


## 3. Challenges

| Méthode | Route                              | Description                                                      | Auth requise | Body / Params                                            | Priorité |
|---------|------------------------------------|------------------------------------------------------------------|--------------|----------------------------------------------------------|----------|
| GET     | `/challenges/:challengeId`         | Détails complet d’un challenge (règles, stats, participations)  | Non           |                                                        | ★★★★★    |
| POST    | `/challenges`                      | Créer un nouveau challenge (lié à un jeu)                        | Oui (JWT)    | `{ gameId, name, description, rules, level, time_limit?, difficulty?, points? }` | ★★★★     |
| POST    | `/challenges/:challengeId/participate` | Soumettre une participation / preuve pour ce challenge       | Oui (JWT)    | `{ video_url, duration?, comment? }`                     | ★★★★     |

## 4. Contributions (Participations / Preuves vidéo)

| Méthode | Route                                      | Description                                           | Auth requise | Body / Params                          | Priorité |
|---------|--------------------------------------------|-------------------------------------------------------|--------------|----------------------------------------|----------|
| POST    | `/challenges/:challengeId/contributions`   | Soumettre une nouvelle preuve / participation         | Oui (JWT)    | `{ video_url, duration?, comment? }`   | ★★★★     |

**Note** : Préférer la route imbriquée sous `/challenges/:challengeId/contributions` plutôt qu’une route plate `/contributions` pour plus de clarté.



**********************************************************************************************************************************

Les routes ci-dessous ne sont pas à utiliser pour le moment


## 5. Votes & Évaluations

| Méthode | Route                                           | Description                                          | Auth requise | Body / Params               | Priorité |
|---------|-------------------------------------------------|------------------------------------------------------|--------------|-----------------------------|----------|
| POST    | `/challenges/:challengeId/vote`                 | Voter / noter le challenge lui-même                  | Oui (JWT)    | `{ rating: 1-5 }` ou `{ like: true }` | ★★★      |
| POST    | `/contributions/:contributionId/vote`           | Voter / noter une participation spécifique           | Oui (JWT)    | `{ rating: 1-5 }` ou `{ like: true }` | ★★★      |
| GET     | `/challenges/:challengeId/votes`                | Statistiques des votes du challenge                  | Non          | —                           | ★★★      |
| GET     | `/contributions/:contributionId/votes`          | Statistiques des votes d’une participation           | Non          | —                           | ★★★      |

## 6. Bonus / Post-MVP (optionnel – si le temps le permet)

| Méthode | Route              | Description                              | Auth requise | Priorité |
|---------|--------------------|------------------------------------------|--------------|----------|
| GET     | `/leaderboard`     | Classement global des joueurs            | Non          | ★★       |


## Bonnes pratiques générales

- **Authentification** : JWT Bearer Token  
  → `Authorization: Bearer <token>`
- **Validation** : Joi ou Zod pour valider les body des POST/PUT/PATCH
- **Erreurs** : Codes HTTP appropriés + JSON clair  
  ex. `{ "success": false, "message": "Erreur description", "errors": [] }`
- **Pagination** : systématique sur les listes → `?page=1&limit=20&sort=createdAt&order=desc`
- **Sécurité** : Middleware de protection des routes privées + rate limiting (login, register, soumissions vidéo)
- **CORS** : Configurer pour autoriser le frontend (localhost:5173 + domaine prod)

**Flux utilisateur conseillé**  
Accueil → Liste des jeux → Détail jeu → Liste / détail challenge → Soumission preuve vidéo → Votes / stats
