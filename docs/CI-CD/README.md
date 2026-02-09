# CI/CD et Déploiement — GamerChallenges

Ce guide explique la stack Docker actuelle, l’usage des profils `dev` / `prod`, les fichiers d’environnement et le rôle de Nginx.

## Prérequis

Sur la VM cloud ou autre serveur Linux (genre il nous faut un serveur qui permet de faire tourner Node au minimum)

- Docker et Docker Compose installé (version récente).
  - [Get Docker](https://docs.docker.com/engine/install/ubuntu/#installation-methods)
- Node.js (NVM) et npm suivre les instructions [Get Node.js](https://nodejs.org/en/download)
- Git si pas installé [Git installation](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- Créer un accès SSH pour votre GitHub ou le GitHub de l'école O'Clock [GitHub SSH](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)
- Le reste de la stack (Postgres, Nginx, etc.) est géré via Docker Compose, donc pas besoin d’installer ces services directement sur l’OS de la VM 🎉

## Vue d’ensemble

- **DEV (local)** :
  - Services : `db` (Postgres), `api` (Node/Express), `client` (Vite/Svelte).
  - Hot reload (volumes montés), logs en direct dans le terminal.
- **PROD (VM)** :
  - Services : `db` (Postgres), `api-prod` (Node/Express build prod), `nginx` (sert le front buildé + reverse proxy `/api`).
  - Nginx est uniquement en conteneur, rien n’est installé sur l’OS.

Tout est défini dans un **seul fichier** : `docker-compose.yml`.

## Services et profils Docker Compose

Dans `docker-compose.yml` :

- `db` :
  - Image `postgres:17-alpine`.
  - Volume persistant `postgres_data`.
  - Profils : `dev`, `prod` (BD partagée entre les deux modes).
  - Port exposé : `5432` (pratique en local; à fermer si besoin en prod durcie).
- `api` (dev) :
  - Profils : `dev` uniquement.
  - Build depuis `api/Dockerfile`.
  - Volumes : montage du code pour hot reload.
  - Port exposé : `3000`.
- `client` (dev) :
  - Profils : `dev` uniquement.
  - Build depuis `client/myapp/Dockerfile`.
  - Volumes : montage du code pour Vite.
  - Port exposé : `5173`.
- `api-prod` :
  - Profils : `prod` uniquement.
  - Build depuis `api/Dockerfile.prod` (dépendances prod uniquement, pas de volumes).
  - Pas de port exposé sur l’hôte (écoute sur `3000` uniquement dans le réseau Docker).
- `nginx` :
  - Profils : `prod` uniquement.
  - Build multi‑stage depuis `nginx/Dockerfile` : build front Svelte puis image Nginx.
  - Expose `80:80` (point d’entrée HTTP unique en prod).
  - Reverse proxy `/api/` → service Docker `api-prod:3000`.

Rappel sur les profils :

- `docker compose --profile dev up` → démarre `db`, `api`, `client`.
- `docker compose --profile prod up -d --build` → démarre `db`, `api-prod`, `nginx`.

Sans `--profile`, aucun service ne démarre (tous ont un profil explicite).

<span style="color:red">**!important**</span> sur les VM cloud en prod il se peut que Docker ai besoin de droits sudo, donc la commande peut être `sudo docker compose ...`.

## Fichiers d’environnement

### Base de données

- Fichier : `.database.env` (non committé, basé sur `.database.example.env`).
- Rôle : uniquement les secrets Postgres + éventuellement `DATABASE_URL`.
- Exemple :

```dotenv
POSTGRES_USER=gamer
POSTGRES_PASSWORD=gamer
POSTGRES_DB=gamer
DATABASE_URL=postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@db:5432/${POSTGRES_DB}
```

`db`, `api` et `api-prod` utilisent ce fichier via `env_file`.

### API (backend)

- Dev : `api/.env` (basé sur `api/.env.example`).
  - Chargé par `dotenv` dans `api/app.js`.
- Prod : `api/.env.prod` (non committé, basé sur `api/.env.prod.example`).
  - Injecté dans `api-prod` via :

```yaml
env_file:
  - .database.env
  - api/.env.prod
```

- Variables typiques :

```dotenv
PORT=3000
JWT_SECRET=...
CORS_ORIGINS=...
```

### Frontend (client)

- Dev : `client/myapp/.env` ou `.env.development` :

```dotenv
VITE_API_URL=http://localhost:3000
```

- Prod : `client/myapp/.env.production` :

```dotenv
VITE_API_URL=/api
```

Le build front utilisé par Nginx est produit avec `VITE_API_URL=/api`, afin que toutes les requêtes passent par le reverse proxy.

## Nginx

- Dockerfile : `nginx/Dockerfile` (multi‑stage Node + Nginx).
- Config : `nginx/default.conf` :
  - `root /usr/share/nginx/html;` (sert le build Vite).
  - SPA : `try_files $uri $uri/ /index.html;` (refresh sur les routes front OK).
  - Proxy API :

```nginx
location /api/ {
    proxy_pass http://api-prod:3000/;
    # headers X-Forwarded-* et Host sont également passés
}
```

  - Logs Nginx redirigés vers `stdout`/`stderr` pour `docker compose logs`.

## Stratégie CORS (API)

- Implémentation dans `api/app.js` :
  - Lecture de `process.env.CORS_ORIGINS` (CSV) → allowlist.
  - Exemple dev :

```dotenv
CORS_ORIGINS=http://localhost:5173,http://localhost
```

  - Exemple prod :

```dotenv
CORS_ORIGINS=http://localhost,https://www.votre-domaine.com
```

- Comportement :
  - Si `Origin` absent (curl/Postman) → autorisé.
  - Si `Origin` présent et dans la liste → `Access-Control-Allow-Origin` positionné sur cette origin + `Access-Control-Allow-Credentials: true`.
  - Sinon → requête rejetée par CORS.

## Commandes principales

### DEV (local)

Depuis la racine du projet :

```bash
docker compose --profile dev up
```

Critères :

- Front Vite : `http://localhost:5173`.
- API dev : `http://localhost:3000`.
- DB : Postgres sur `localhost:5432`.

### PROD (profil prod local / VM)

Depuis la racine :

```bash
docker compose --profile prod up -d --build
```

Actions :

- Front servi par Nginx : `http://localhost/` (port 80).
- API accessible via `http://localhost/api/...`.
- Refresh sur les routes front OK (SPA).
- Logs :
  - `docker compose logs -f api-prod`
  - `docker compose logs -f nginx`

## Portabilité

Pour déployer sur une nouvelle VM :

- Copier le repo (ou uniquement `docker-compose.yml`, le dossier `nginx/`, `api/`, `client/`).
- Créer les fichiers d’env :
  - `.database.env`
  - `api/.env.prod`
  - `client/myapp/.env.production`
- Lancer :

```bash
docker compose --profile prod up -d --build
```

La stack est ainsi portable VM→VM avec uniquement Docker et les fichiers d’env appropriés.

## Améliorations

- docker-compose.yml supprimer les ports exposés en prod (sécurité). Implique pour rester simple de dupliquer le service `db` en `db-prod` (profil prod) sans ports. api dépend de db alors que api-prod dépend de db-prod. En prod on met dans .env.prod un DATABASE_URL=...@db-prod:5432/... Actuellement le port 5432 est exposé même en prod, ce qui n’est pas idéal pour la sécurité. Donc faire la tache ci dessus en priorité.

## Livrer sur VM cloud

- Préparer la VM (Docker installé, ports 80/443 ouverts).
- Copier les fichiers nécessaires via git (donc installer git).
- Créer les fichiers d’env sur la VM `cp .database.example.env .database.env` + `cp api/.env.prod.example api/.env.prod` + `cp client/myapp/.env.example client/myapp/.env` éditer les valeurs.
- Lancer la stack prod : `docker compose --profile prod up -d --build`.
- Créer les tables dans la base de données `docker compose exec api-prod npm run db:create`
- Seed les tables `docker compose exec api-prod npm run db:seed`
- Accéder à l’application via le domaine ou l’IP de la VM.
- Et voilà !