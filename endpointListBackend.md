# Endpoints Routeur - Version Minimaliste (MVP)

Cette liste représente les routes **strictement nécessaires** pour avoir un MVP fonctionnel de GamerChallenges.  
Elles couvrent l'authentification, la consultation des données publiques et les actions principales (création de challenge + participation + vote basique).


## 1. Authentification

| Méthode | Route                  | Description                                      | Auth requise ? | Corps attendu (body)                     |
|---------|------------------------|--------------------------------------------------|----------------|------------------------------------------|
| POST    | `auth/register`   | Inscription d’un nouvel utilisateur              | Non            | `{ email, pseudo, password, name? }`     |
| POST    | `auth/login`      | Connexion → retourne JWT                         | Non            | `{ email, password }` ou `{ pseudo, password }` |
| GET     | `auth/me`         | Infos de l’utilisateur connecté                  | Oui            | —                                        |

## 2. Jeux (Games) – Consultation publique

| Méthode | Route              | Description                              | Auth ? | Notes                              |
|---------|--------------------|------------------------------------------|--------|------------------------------------|
| GET     | `games`       | Liste tous les jeux                      | Non    | Option : ?search=... &category=... |
| GET     | `games/:id`   | Détails d’un jeu spécifique              | Non    | —                                  |

## 3. Challenges – Cœur du MVP

| Méthode | Route                               | Description                                            | Auth ? |
|---------|-------------------------------------|--------------------------------------------------------|--------|
| GET     | `challenges`                   | Liste tous les challenges (avec filtres optionnels)    | Non    |
| GET     | `challenges/:id`               | Détails d’un challenge + ses contributions             | Non    |
| POST    | `challenges`                   | Créer un nouveau challenge                             | Oui    |
| GET     | `games/:gameId/challenges`     | Liste des challenges liés à un jeu spécifique          | Non    |

## 4. Contributions (Participations / Preuves)

| Méthode | Route                                            | Description                                          | Auth ? |
|---------|--------------------------------------------------|------------------------------------------------------|--------|
| POST    | `challenges/:challengeId/contributions`     | Soumettre une participation (lien vidéo obligatoire) | Oui    |
| GET     | `challenges/:challengeId/contributions`     | Liste des participations pour ce challenge           | Non    |

## 5. Votes – Interaction communautaire minimale

| Méthode | Route                                             | Description                                          | Auth ? |
|---------|---------------------------------------------------|------------------------------------------------------|--------|
| POST    | `contributions/:contributionId/vote`         | Voter pour une participation (upvote)                | Oui    |
| GET     | `contributions/:contributionId/votes`        | Nombre de votes sur une participation                | Non    |

## 6. Leaderboard – Classement simple

| Méthode | Route              | Description                                          | Auth ? |
|---------|--------------------|------------------------------------------------------|--------|
| GET     | `leaderboard` | Classement global (top utilisateurs par votes + participations) | Non    |

### Notes importantes pour l’implémentation MVP

- **Authentification** : Toutes les routes marquées « Oui » doivent être protégées par un middleware JWT.
- **Validation** : Utiliser Joi pour valider les body des POST.
- **Réponses** : Toujours retourner du JSON cohérent (ex : `{ success: true, data: {...} }` ou `{ error: "message" }`).
- **Pagination** : Ajouter `?page=1&limit=10` sur les listes longues dès que possible.
- **Ordre de priorité** pour les sprints :
  1. Auth (register/login/me)
  2. Jeux (GET)
  3. Challenges (GET + POST)
  4. Contributions (POST + GET)
  5. Votes
  6. Leaderboard

Cette version minimale permet de tester le flux complet :  
**Inscription → Créer challenge → Soumettre participation → Voter → Voir leaderboard**
