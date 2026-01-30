# Routes API Backend – GamerChallenges

Documentation des endpoints de l'API  
(Projet Apothéose O'clock – Mise à jour : 29 janvier 2026)

**Base URL :** `http://localhost:3000`

---

## 1. Authentification

| Méthode | Route              | Description                                      | Auth requise | Body / Query Params                              | Priorité |
|---------|--------------------|--------------------------------------------------|--------------|--------------------------------------------------|----------|
| POST    | `/auth/register`   | Inscription d'un nouvel utilisateur              | Non          | `{ email, pseudo, password, name }`              | ★★★★★    |
| POST    | `/auth/login`      | Connexion → retourne un JWT                      | Non          | `{ email ou pseudo, password }`                  | ★★★★★    |
| GET     | `/auth/me`         | Récupérer le profil de l'utilisateur connecté    | Oui (JWT)    | —                                                | ★★★★     |

---

## 2. Jeux (Games)

| Méthode | Route                   | Description                                                                 | Auth requise | Query / Params                                   | Priorité |
|---------|-------------------------|-----------------------------------------------------------------------------|--------------|--------------------------------------------------|----------|
| GET     | `/games`                | Liste de tous les jeux                                                      | Non          | —                                                | ★★★★★    |
| GET     | `/games/:id`            | Détails d'un jeu par son ID                                                 | Non          | —                                                | ★★★★★    |
| GET     | `/games/:id/challenges` | Tous les challenges d'un jeu donné                                          | Non          | —                                                | ★★★★★    |

---

## 3. Challenges

| Méthode | Route                              | Description                                                      | Auth requise | Body / Query Params                                      | Priorité |
|---------|------------------------------------|------------------------------------------------------------------|--------------|----------------------------------------------------------|----------|
| GET     | `/challenges`                      | Liste de tous les challenges                                     | Non          | —                                                        | ★★★★★    |
| GET     | `/challenges/latest`               | Les 7 derniers challenges créés                                  | Non          | —                                                        | ★★★★★    |
| GET     | `/challenges/search/filter`        | **🆕 Filtrer les challenges** par jeu, niveau et popularité      | Non          | `?gameId=X&level=Y&sortBy=Z`                             | ★★★★★    |
| GET     | `/challenges/:id`                  | Détails complet d'un challenge (règles, stats, participations)   | Non          | —                                                        | ★★★★★    |
| POST    | `/challenges`                      | Créer un nouveau challenge (lié à un jeu)                        | Oui (JWT)    | `{ game_id, name, description, rules, level, time_limit_minutes? }` | ★★★★     |

### Filtres disponibles (`/challenges/search/filter`) :
- **`gameId`** : ID du jeu (optionnel, nombre)
- **`level`** : `easy`, `medium`, `hard` (optionnel)
- **`sortBy`** : `recent`, `popularity`, `name` (optionnel, défaut: `recent`)

**Exemple :**
```
GET /challenges/search/filter?gameId=1&level=hard&sortBy=popularity
```

---

## 4. Contributions (Participations / Preuves vidéo)

| Méthode | Route                                      | Description                                           | Auth requise | Body / Params                          | Priorité |
|---------|--------------------------------------------|-------------------------------------------------------|--------------|----------------------------------------|----------|
| POST    | `/contributions`                           | Soumettre une nouvelle preuve / participation         | Oui (JWT)    | `{ challenge_id, video_url, duration }`| ★★★★     |
| GET     | `/contributions/votes/me`                  | Récupérer les votes de mes contributions              | Oui (JWT)    | —                                      | ★★★      |

---

## 5. Votes & Évaluations

| Méthode | Route                                           | Description                                          | Auth requise | Query Params                | Priorité |
|---------|-------------------------------------------------|------------------------------------------------------|--------------|-----------------------------|----------|
| GET     | `/votes/challenge/:challengeId`                 | Nombre de votes d'un challenge                       | Non          | —                           | ★★★★     |
| POST    | `/votes/challenge/:challengeId`                 | Voter pour un challenge                              | Oui (JWT)    | —                           | ★★★★     |
| GET     | `/votes/contribution/:contributionId`           | Nombre de votes d'une contribution                   | Non          | —                           | ★★★★     |
| POST    | `/votes/contribution/:contributionId`           | Voter pour une contribution                          | Oui (JWT)    | —                           | ★★★★     |
| GET     | `/votes/top-contributors`                       | Top contributeurs par votes                          | Non          | `?limit=10`                 | ★★★★     |
| GET     | `/votes/top-challenges`                         | Top challenges par nombre de votes                   | Non          | `?limit=10`                 | ★★★★     |
| GET     | `/leaderboard`                                  | Classement des meilleurs utilisateurs                | Non          | —                           | ★★★★     |

---

## 6. Utilisateurs

| Méthode | Route              | Description                              | Auth requise | Priorité |
|---------|--------------------|------------------------------------------|--------------|----------|
| GET     | `/users`           | Liste de tous les utilisateurs           | Non          | ★★★      |
| GET     | `/user/:id`        | Détails d'un utilisateur par ID          | Non          | ★★★      |

---

## Bonnes pratiques générales

### Authentification
- **JWT Bearer Token** dans le header :  
  ```
  Authorization: Bearer <token>
  ```

### Validation
- Joi ou Zod pour valider les body des POST/PUT/PATCH
- Middleware `validateToken`, `validateRegister`, `validateUser`

### Gestion des erreurs
- Codes HTTP appropriés + JSON clair  
  ```json
  { 
    "success": false, 
    "message": "Description de l'erreur", 
    "statusCode": 400 
  }
  ```

### CORS
- Configuré pour autoriser le frontend : `http://localhost:5173`
- À configurer pour le domaine de production

### Middlewares appliqués
- **`validateToken`** : Vérifie la validité du token JWT
- **`isAllowed('user')`** : Vérifie que l'utilisateur a au moins le rôle "user"
- **`validateRegister`** : Valide les données d'inscription
- **`validateUser`** : Valide les données de connexion

---

## Flux utilisateur conseillé

```
Accueil 
  → Liste des jeux (/games)
    → Détail jeu (/games/:id)
      → Liste challenges du jeu (/games/:id/challenges)
        → Détail challenge (/challenges/:id)
          → Soumission preuve vidéo (/contributions)
            → Votes / stats (/votes/...)
```

---

**Version API :** 1.0.0  
**Date de mise à jour :** 29 janvier 2026
