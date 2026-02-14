# Mise en place HTTPS avec Nginx conteneurisé et Certbot

> Document en cours de rédaction (pair-coding).

Ce document décrit comment configurer HTTPS sur une VM avec :
- Nginx dans un conteneur Docker
- Certificats Let’s Encrypt gérés par Certbot installé sur l’hôte (VM cloud prêtée par l'école)

---

## 1. Objectifs et prérequis

### 1.1 Objectifs

- Exposer l'application Gamer Challenges en HTTPS via Nginx (reverse proxy) dans un conteneur Docker.
- Terminer TLS au niveau de Nginx, puis proxyfier en HTTP vers les conteneurs applicatifs (API / front).
- Utiliser des certificats Let’s Encrypt générés et renouvelés automatiquement par Certbot installé sur la VM hôte.
- Permettre aux collègues d'installer la même stack sur **leur propre VM** avec **leur propre nom de domaine** et **leur propre certificat**.

### 1.2 Prérequis

- Une VM Linux accessible rendue publique via [Gestion Serveur cloud de l'école](https://kourou.oclock.io/ressources/vm-cloud/) avec :
- Un nom de domaine pointant vers l'adresse IP publique de la VM (enregistrement DNS de type A / AAAA configuré).
  - Pour les VMs cloud de l'école, le nom de domaine est généré automatiquement à partir de nos pseudos GitHub, sous la forme : `<pseudo-github>-server.cloud.eddi.xyz`.
  - Exemple : pour le pseudo GitHub `manuelweb`, le domaine est `manuelweb-server.cloud.eddi.xyz`.
- Sur [kourou/vm-cloud](https://kourou.oclock.io/ressources/vm-cloud/), rendre la VM **publique** permet d'ouvrir au reste du monde les ports : `80`, `443`, `8080`, `8443`. Il faut vous assurer que le firewall de la VM ne bloque pas ces ports (par exemple avec `ufw` : `sudo ufw allow 80`, `sudo ufw allow 443`, `sudo ufw status`).
- Docker et docker-compose installés et fonctionnels sur la VM.
- Le projet Gamer Challenges déployé sur la VM, avec :
  - le conteneur Nginx basé sur `nginx/Dockerfile`,
  - l'API accessible depuis ce conteneur via le nom de service Docker (par ex. `api-prod:3000`).
- Accès sudo sur la VM pour :
  - installer `snapd` et `certbot`,
  - accéder à `/etc/letsencrypt`.

## 2. Installation de Certbot sur la VM cloud

### 2.1 Étape 1 : connexion à la VM

`ssh -v student@<pseudo-github>-server.cloud.eddi.xyz`

### 2.2 Étape 2 : installation de Certbot via snap

- `sudo snap install --classic certbot`, 
- vérifier que `certbot` est bien installé : `certbot --version` doit retourner `certbot 5.3.1` (ou une autre version).

### 2.3 Étape 3 : premier certificat Let’s Encrypt

Dans ce projet, Nginx tourne dans un conteneur Docker et écoute déjà sur le port `80`. Pour que Certbot puisse faire la vérification HTTP (challenge ACME), on va utiliser le mode `standalone` : Certbot lance brièvement son propre mini-serveur web sur le port `80`.

1. Arrêter temporairement le conteneur Nginx (pour libérer le port 80) :

  - `sudo docker stop gamerChallenges_nginx`

2. Lancer Certbot en mode `standalone` pour générer un certificat pour **votre** domaine :

  - `sudo certbot certonly --standalone -d <pseudo-github>-server.cloud.eddi.xyz`

  Remplacer `<pseudo-github>` par votre pseudo GitHub (ex. `manuelweb-server.cloud.eddi.xyz`).

3. Répondre aux questions de Certbot :

  - accepter les CGU de Let’s Encrypt,
  - fournir une adresse e-mail de contact,
  - choisir si vous acceptez ou non de partager votre e-mail.

4. Vérifier que les certificats ont bien été générés dans `/etc/letsencrypt` :

  - `sudo ls /etc/letsencrypt/live`
  - vous devez voir un dossier nommé comme votre domaine : `<pseudo-github>-server.cloud.eddi.xyz`.

5. Redémarrer le conteneur Nginx :

  - `sudo docker start gamerChallenges_nginx`

Les fichiers suivants seront utilisés plus tard dans la configuration Nginx :

- `/etc/letsencrypt/live/<pseudo-github>-server.cloud.eddi.xyz/fullchain.pem`
- `/etc/letsencrypt/live/<pseudo-github>-server.cloud.eddi.xyz/privkey.pem`

Ils seront montés en volume dans le conteneur Nginx et référencés dans la configuration TLS (section suivante).

## 3. Configuration de Nginx pour HTTPS

### 3.1 Étape 4 : monter les certificats dans le conteneur Nginx

L'image Docker Nginx du projet ne contient **pas** les certificats. Ils sont générés sur la VM dans `/etc/letsencrypt`. Pour que Nginx puisse les lire, il faut monter ce dossier dans le conteneur en lecture seule.

Dans le fichier `docker-compose.yml` (ou équivalent), ajouter un volume sur le service Nginx :

- sous le service `nginx` :

  - `volumes:`
    - `/etc/letsencrypt:/etc/letsencrypt:ro`

Par exemple :

```yaml
services:
  nginx:
    image: projet-gamer-challenges-nginx
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - /etc/letsencrypt:/etc/letsencrypt:ro
      - ./nginx/default.conf:/etc/nginx/conf.d/default.conf:ro
```

> Attention :
> - le chemin `/etc/letsencrypt` à gauche du `:` est sur la VM (hôte),
> - le chemin `/etc/letsencrypt` à droite du `:` est dans le conteneur,
> - l'option `:ro` (read-only) évite que le conteneur puisse modifier les certificats.

Après modification du fichier `docker-compose.yml`, il faudra **recréer** le conteneur Nginx pour que le volume soit pris en compte :

- `sudo docker compose up -d --force-recreate nginx`

La prochaine étape consistera à adapter la configuration Nginx (`nginx/default.conf`) pour activer l'écoute sur `443` en utilisant ces certificats.

### 3.2 Étape 5 : adapter nginx/default.conf pour HTTPS

Le fichier de configuration Nginx utilisé dans le conteneur est `nginx/default.conf`, monté dans `/etc/nginx/conf.d/default.conf`.

1. Rediriger tout le trafic HTTP vers HTTPS :

   Modifier (ou créer) le bloc `server` qui écoute sur le port `80` pour qu'il redirige vers `https` :

   ```nginx
   server {
     listen 80;
     server_name _;

     return 301 https://$host$request_uri;
   }
   ```

2. Ajouter un bloc `server` pour HTTPS (port 443) :

   Dans le même fichier, ajouter un second bloc `server` qui écoute sur `443` avec TLS activé et les chemins des certificats Let’s Encrypt :

   ```nginx
   server {
     listen 443 ssl;
     server_name _;

     ssl_certificate     /etc/letsencrypt/live/<pseudo-github>-server.cloud.eddi.xyz/fullchain.pem;
     ssl_certificate_key /etc/letsencrypt/live/<pseudo-github>-server.cloud.eddi.xyz/privkey.pem;

     # Serve SPA build
     root /usr/share/nginx/html;
     index index.html;

     # Proxy API to backend container (service Docker api-prod)
     location /api/ {
       proxy_pass http://api-prod:3000/;
       proxy_http_version 1.1;
       proxy_set_header Host $host;
       proxy_set_header X-Real-IP $remote_addr;
       proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
       proxy_set_header X-Forwarded-Proto $scheme;
       proxy_set_header Upgrade $http_upgrade;
       proxy_set_header Connection "upgrade";
     }

     # SPA routing: fallback to index.html
     location / {
       try_files $uri $uri/ /index.html;
     }

     # Cache static assets agressivement
     location ~* \.(ico|css|js|gif|jpe?g|png|svg|woff2?)$ {
       expires 30d;
       access_log off;
       try_files $uri $uri/ /index.html;
     }
   }
   ```

   - Remplacer `<pseudo-github>` par votre pseudo GitHub (ex. `manuelweb`).
   - Le bloc HTTPS reprend la même configuration que le bloc HTTP initial, mais avec `listen 443 ssl` et les directives `ssl_certificate` / `ssl_certificate_key`.

3. Recharger la configuration Nginx dans le conteneur :

   Si le conteneur tourne déjà :

   - `sudo docker exec gamerChallenges_nginx nginx -t` (vérifier la syntaxe)
   - `sudo docker exec gamerChallenges_nginx nginx -s reload` (recharger)

   Sinon, relancer le service via docker-compose :

   - `sudo docker compose up -d --force-recreate nginx`

À ce stade, l'application doit être accessible en HTTPS à l'adresse :

- `https://<pseudo-github>-server.cloud.eddi.xyz`

et toutes les requêtes HTTP (`http://...`) doivent être redirigées automatiquement vers HTTPS.

!important il faut ajouter le domaine maintenant en https dans votre fichier api/.env.prod sur la variable `CORS_ORIGINS` sans quoi les appels API depuis le front en HTTPS seront bloqués par le CORS.

- `CORS_ORIGINS=https://<pseudo-github>-server.cloud.eddi.xyz` # ne pas mettre de slash à la fin du domaine.
- Après modification de `api/.env.prod`, il faudra reconstruire et relancer le conteneur API pour que les changements soient pris en compte :
- `sudo docker compose up -d --force-recreate api-prod`
- Et voila ! Stack protégée par HTTPS avec Nginx et Certbot 🎉