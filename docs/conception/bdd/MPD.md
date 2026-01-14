# MPD

> Modèle Physique de Données (MPD) du projet

## Schéma MPD

App dbdiagram.io: https://dbdiagram.io/d/GamerChallenge-6967690ed6e030a02401c436

```mermaid
// Use DBML to define your database structure
// Docs: https://dbml.dbdiagram.io/docs

Table user {
  id integer [primary key, increment]
  nom varchar [not null]
  pseudo varchar [not null, unique]
  password varchar [not null]
  id_role  integer [not null]
}

Table role {
  id integer [primary key, increment]
  nom enum('user','admin')
}

Table challenge{
  id integer [primary key, increment]
  name  varchar [not null]
  description  varchar [not null]
  rules varchar [not null]
  level integer [not null]
  average_duration integer [not null] // le moyenne du temps de réalisatiob en ms du challenge par l'utilisateur
  id_user  integer [not null]
  id_game  integer [not null]
  Note: 'Le challenge et le défis'
}
Table vote_challenge {
  id integer [primary key, increment]
  id_challenge integer [not null]
  id_user integer [not null]
}

Table participation {
  id integer [primary key, increment]
  video_url varchar [not null]
  description varchar [not null]
  duration integer [not null] // le temps en ms de réalisation de la participation au challenge par l'utilisateur
  id_user  integer [not null]
  id_challenge  integer [not null]
}
Table vote_participation {
  id integer [primary key, increment]
  id_participation   integer [not null]
  id_user   integer [not null]
}

Table game {
  id integer [primary key, increment]
  name varchar [not null]
  description varchar [not null]
}

Ref: user.id_role > role.id
Ref: challenge.id_user > user.id
Ref: challenge.id_game > game.id
Ref: participation.id_user > user.id
Ref: participation.id_challenge > challenge.id
Ref: vote_participation.id_user > user.id
Ref: vote_participation.id_participation > participation.id
Ref: vote_challenge.id_user > user.id
Ref: vote_challenge.id_challenge > challenge.id
```