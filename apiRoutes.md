# Routes API Backend – GamerChallenges



## 1. Authentification

| Méthode | Route                     | Description                                      | Auth requise ? | Corps attendu (body)                     | Priorité |
|---------|---------------------------|--------------------------------------------------|----------------|------------------------------------------|----------|
| POST    | `/auth/register`          | Inscription d’un nouvel utilisateur              | Non            | `{ email, pseudo, password, name? }`     | ★★★★★   |
| POST    | `/auth/login`             | Connexion → retourne JWT                         | Non            | `{ email ou pseudo, password }`          | ★★★★★   |
| GET     | `/auth/me`                | Récupérer les infos de l’utilisateur connecté    | Oui            | —                                        | ★★★★    |

## 2. Jeux (Games)

| Méthode | Route                     | Description                                      | Auth ? | Paramètres / Query                       | Priorité |
|---------|---------------------------|--------------------------------------------------|--------|------------------------------------------|----------|
| GET     | `/games`                  | Liste de tous les jeux                           | Non    | `?search=...&category=...&limit=20&page=1` | ★★★★★   |
| GET     | `/games/:gameId`          | Détails d’un jeu spécifique ainsi que ses challenges associés                      | Non    | —                                        | ★★★★★   |

## 3. Challenges

| Méthode | Route                                      | Description                                            | Auth ? | Corps / Paramètres                       | Priorité |
|---------|--------------------------------------------|--------------------------------------------------------|--------|------------------------------------------|----------||
| GET     | `/challenges/:challengeId`                 | Détails complet d’un challenge (règles, stats…)        | Non    | —                                        | ★★★★★   |
| POST    | `/challenges`                              | Créer un nouveau challenge                             | Oui    | `{ gameId, name, description, rules, level, time_limit? }` | ★★★★    |

## 4. Contributions (Participations / Preuves vidéo)

| Méthode | Route                                            | Description                                            | Auth ? | Corps / Paramètres                       | Priorité |
|---------|--------------------------------------------------|--------------------------------------------------------|--------|------------------------------------------|----------|
| GET     | `/challenges/:challengeId/contributions`         | Liste des participations pour un challenge             | Non    | `?sort=votes_desc&limit=5`               | ★★★★    |
| POST    | `/challenges/:challengeId/contributions`         | Soumettre une nouvelle participation                   | Oui    | `{ video_url, duration? }`               | ★★★★    |

## 5. Votes

| Méthode | Route                                             | Description                                            | Auth ? | Corps attendu                            | Priorité |
|---------|---------------------------------------------------|--------------------------------------------------------|--------|------------------------------------------|----------|
| POST    | `/challenges/:challengeId/vote`                   | Voter pour le challenge (ex: 1-5 étoiles ou like)      | Oui    | `{ rating: 1-5 }` ou `{ vote: true }`    | ★★★     |
| POST    | `/contributions/:contributionId/vote`             | Voter pour une participation spécifique                | Oui    | `{ rating: 1-5 }` ou `{ vote: true }`    | ★★★     |
| GET     | `/challenges/:challengeId/votes`                  | Statistiques votes du challenge                        | Non    | —                                        | ★★★     |
| GET     | `/contributions/:contributionId/votes`            | Statistiques votes d’une participation                 | Non    | —                                        | ★★★     |

## 6. Bonus / Optionnel (post-MVP ou si temps)

| Méthode | Route              | Description                                      | Auth ? | Priorité |
|---------|--------------------|--------------------------------------------------|--------|----------|
| GET     | `/leaderboard`     | Classement global des joueurs                    | Non    | ★★      |

### Bonnes pratiques générales

- **Authentification** : Utiliser JWT Bearer Token dans l’en-tête `Authorization: Bearer <token>`
- **Validation** : Joi ou Zod pour valider les body des POST/PUT
- **Erreurs** : Codes HTTP appropriés (400, 401, 403, 404, 500) + message clair
- **Pagination** : Ajouter systématiquement `?page=1&limit=20&sort=...` sur les listes
- **Sécurité** : Middleware pour protéger les routes privées + rate limiting si possible

Remark : accueil → jeux → détail jeu → challenges → détail challenge → votes/stats
