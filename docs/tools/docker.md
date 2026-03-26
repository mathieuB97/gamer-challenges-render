# Docker

Nous avons mis en place des conteneurs Docker pour gagner en **simplicité**, en **productivité** et en **portabilité**.\
Notre projet est sous la forme MVC (Model-View-Controller) avec un frontend en Svelte séparé du backend en Node.js/Express.\
Nous avons créé trois conteneurs Docker distincts :
| Conteneur  Names       | Description                                  |
|------------------------|----------------------------------------------|
| gamerChallenges_client | Conteneur pour le frontend Svelte            |
| gamerChallenges_api    | Conteneur pour le backend Node.js/Express    |
| gamerChallenges_db     | Conteneur pour la base de données PostgreSQL |

## Prérequis

Installez Docker et Docker Compose.


## Injection des variables d'environnement dans les conteneurs Docker

Lorsque vous utilisez Docker Compose avec la clé `env_file`, Docker lit le fichier d'environnement (ex : `.database.env`) sur votre machine hôte et injecte chaque variable comme variable d'environnement dans le conteneur ciblé.

**Aucun volume n'est utilisé pour transmettre ces variables.** Elles sont transmises via le mécanisme d'environnement du système d'exploitation du conteneur.

**Schéma du mécanisme :**

```
┌──────────────┐
│ .database.env│
└──────┬───────┘
(lu par Docker Compose)
       │
       ▼
┌────────────────────────────┐
│ Variables d'env injectées  │
│ dans le conteneur (API)    │
└──────┬─────────────────────┘
       │
       ▼
┌────────────────────────────┐
│ process.env (Node.js)      │
│ ou $NOM_VAR (sh/bash)      │
└────────────────────────────┘
```

Ainsi, votre application (ex : Node.js) accède directement aux variables via `process.env`, sans avoir à lire le fichier .env ou .database.env elle-même.

## Volumes Docker

Les volumes Docker servent à **stocker de manière persistante les données** générées et utilisées par les conteneurs, même après leur arrêt ou suppression. Pour Postgres, cela signifie que la base de données (tables, utilisateurs, données) est conservée dans un volume dédié (ex : `projet-gamer-challenges_postgres_data`).

### Commandes utiles

- **Lister tous les volumes Docker :**
  ```sh
  docker volume ls
  ```
- **Supprimer un volume spécifique :**
  ```sh
  docker volume rm projet-gamer-challenges_postgres_data
  ```
- **Supprimer tous les volumes non utilisés :**
  ```sh
  docker volume prune
  ```

### Attention lors de la suppression d'un volume

Supprimer un volume efface **définitivement toutes les données** qu'il contient. Pour Postgres, cela réinitialise la base de données : nouveaux utilisateurs, nouveaux mots de passe, base vide.

> ⚠️ **Ne jamais supprimer un volume en production sans sauvegarde préalable !**

En développement, cela permet de repartir d'une base propre, mais en production cela entraînerait une perte totale de données.

### Cas d'usage typique en développement

Si vous modifiez les variables d'environnement de la base (utilisateur, mot de passe, nom de la base) dans `.database.env`, il faut supprimer le volume pour que Postgres prenne en compte ces nouvelles valeurs :

```sh
docker compose down -v
docker compose up
```

Cela supprime le volume associé au projet, puis relance les conteneurs avec une base fraîche, initialisée selon les nouvelles variables.




## Lancement des conteneurs

```bash
# Lancer les conteneurs normalement
docker compose --profile <dev|prod> up

# Si vous avez modifié le fichier d'environnement (.database.env),
# il faut forcer la recréation des conteneurs pour que les nouvelles variables soient prises en compte :
# 1. suppression le volume associé à la base de données pour éviter les conflits de données
docker compose down -v
# 2. relancer les conteneurs avec le profil souhaité
docker compose --profile <dev|prod> up --force-recreate

# Ou bien, pour tout réinitialiser (y compris les volumes, donc les données de la base !)
# ATTENTION : cette commande supprime toutes les données persistées
docker compose down -v && docker compose --profile <dev|prod> up --build
```

### mode développement

#### Maintenant
> prise en compte des nouveaux modules npm installés, prise en compte des modifications de code backend et frontend, affichage des logs en temps réel.

```bash
docker compose --profile dev up # lance les conteneurs en mode développement
docker compose --profile dev up --build  # lance les conteneurs en mode développement et rebuild les images
# ou
docker compose --profile prod up -d # lance les conteneurs en mode production !important utiliser pm2 pour le backend et une build statique pour le frontend
```

```bash
# pour stopper les conteneurs
docker stop gamerChallenges_api # backend
docker stop gamerChallenges_client # frontend
docker stop gamerChallenges_db # base de données
# pour supprimer les conteneurs
docker rm gamerChallenges_api
docker rm gamerChallenges_client
docker rm gamerChallenges_db
# pour accéder au conteneur client
docker compose exec client sh
# pour accéder au conteneur api
docker compose exec api sh
# pour accéder au conteneur db
docker compose exec db sh
# lister les images
docker compose images
# recréer les tables dans la base de données
docker exec -it gamerChallenges_api npm run db:create
# re seed les tables dans la base de données
docker exec -it gamerChallenges_api npm run db:seed
```

#### Avant
> pas moyen de suivre les logs en temps réel, pas de prise en compte de l'ajout de modules npm, pas de prise en compte des modifs de code sans rebuild de l'image.

Pour lancer les conteneurs en mode développement, depuis la racine du projet, exécutez :

```bash
docker compose up -d
# il nous faudrait un flag pour exprimer le mode dev ou s'appuyer sur un fichier .docker-env avec une variable d'environnement qui sera soit DOCKER_ENV=development soit DOCKER_ENV=production
```

#### mode développement

1. Prise en compte des nouveaux modules npm installés sans reconstruire l'image.
2. Prise en compte des modifications de code backend et frontend sans reconstruire l'image.
3. Affichage des logs en temps réel.

## Issues

Actuellement notre docker compose nous freine dans le développement pour les raisons suivantes :
- Lors de la modification des variables d'environnement, il nous faut reconstruire complètement l'image du service concerné.
- Lors de l'installation de nouveaux modules npm, idem.
- L'affichage des logs n'est pas optimal. Exemple un ```console.log``` dans le backend n'apparaît que si nous reconstruisons l'image.
- La gestion de la base de données avec postgres nous pose problème.
    - Nous devons vérifier que postgres n'est pas en cours d'exécution avant de lancer le conteneur.
    - ```sudo systemctl status postgresql``` doit retourner inactive. Sinon, le conteneur gamerChallenges_db ne peut pas utiliser le port 5432. Nous aurions pu mapper un autre port, mais cela aurait nécessité des modifications supplémentaires dans le code.
    - ```systemctl list-unit-files --type=service | grep postgres``` permet de lister les services postgres actives.
    - Stopper le service postgres local ```sysctl stop postgresql```
    - Désactiver le démarrage automatique postgres au démarrage ```sudo systemctl disable postgresql```
    - La solution serait d'afficher un message d'erreur clair si le port 5432 est déjà utilisé et de suggérer la cmd qui permet de stopper le service local. Il faudrait ajouter cette vérification dans le fichier docker-compose.yml dans le service gamerChallenges_db.