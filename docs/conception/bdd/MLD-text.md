# MLD simplifié — GamerChallenges

## Règles de transformation (synthèse)
- Règle n°1 — Chaque entité du MCD devient une table du MLD avec une clé primaire technique `id` auto-générée. Les discriminants/identifiants métier ne sont ajoutés que s’ils ont une valeur métier utile, et portent une contrainte d’unicité.
- Règle n°2 — Si une cardinalité max. vaut 1, la clé étrangère est créée du côté où se trouve le 1 et référence l’identifiant de l’autre table.
- Règle n°3 — Si les deux cardinalités max. valent N (relation plusieurs-à-plusieurs), la relation devient une table de liaison avec deux clés étrangères vers les deux tables.

## Schéma MLD

> Nombre de tables : 7 dont 2 tables de liaison [VOTE_CHALLENGE, VOTE_PARTICIPATION]

- UTILISATEUR (id, nom, mot_de_passe, #role_id)
- ROLE (id, nom)
- CHALLENGE (id, nom, description, difficulté, durée, #utilisateur_id, #jeu_id)
- JEU (id, nom, description)
- PARTICIPATION (id, video_url, #utilisateur_id, #challenge_id)
- VOTE_CHALLENGE (#utilisateur_id, #challenge_id)
- VOTE_PARTICIPATION (#utilisateur_id, #participation_id)

## Contraintes et index

Clés étrangères:
  - UTILISATEUR.#role_id → ROLE.id

  - CHALLENGE.#utilisateur_id → UTILISATEUR.id
  - CHALLENGE.#jeu_id → JEU.id

  - PARTICIPATION.#utilisateur_id → UTILISATEUR.id
  - PARTICIPATION.#challenge_id → CHALLENGE.id

  - VOTE_CHALLENGE.#utilisateur_id → UTILISATEUR.id, #challenge_id → CHALLENGE.id

  - VOTE_PARTICIPATION.#utilisateur_id → UTILISATEUR.id, #participation_id → PARTICIPATION.id

- Unicité des votes:
  - VOTE_CHALLENGE (utilisateur_id, challenge_id) unique
  - VOTE_PARTICIPATION (utilisateur_id, participation_id) unique