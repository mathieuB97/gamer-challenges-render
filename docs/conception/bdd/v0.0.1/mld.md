UTILISATEUR (id, password, email, username, #role_id, #défi_id)

ROLE (id, nom)

JEUX VIDEO (id, nom, genre, description, #défi_id)

DEFI (id, nom, difficulté , durée, #jeux_id, #utilisateur_id)

PARTICIPATION (id, video, #defi_id, #utilisateur_id)