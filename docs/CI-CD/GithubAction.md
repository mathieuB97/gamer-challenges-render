# Stratégie de déploiement continu (CD) avec GitHub Actions

Ce document décrit comment nous utilisons GitHub Actions pour assurer le déploiement continu de GamerChallenges sur la VM mise à disposition par l'école.

Objectif : garder une chaîne CD **simple, lisible et adaptée au MVP**, en s'appuyant sur les outils standards Git, git‑flow, GitHub Actions.

---

## Contexte et principes

- Le dépôt GitHub principal est un **repository d'organisation** : `O-clock-Florence/projet-gamer-challenges`.
- Nous utilisons **git flow** en local pour gérer les versions :
  - `develop` : branche d'intégration des développements.
  - `main` : branche de référence pour la production.
  - `release/*` : branches de release gérées via `git flow release start/finish`.
- Le projet est conteneurisé via Docker et orchestré avec `docker compose` à la racine du dépôt.
  - Le profil `prod` lance les services nécessaires à la production (base de données, API, Nginx + front).

Nous visons une CD **centrée sur les releases** : c'est la validation d'une release (et son push sur GitHub) qui déclenche un déploiement sur la VM.

---

## Choix de l'architecture CI/CD

### Option retenue : runner GitHub hébergé + SSH (vs runner self‑hosted)

Nous ne disposons pas des droits administrateur sur le dépôt d'organisation pour ajouter un runner self‑hosted directement sur la VM. L'option **runner self‑hosted** (installé sur la VM) n'est donc pas exploitable par l'équipe sans intervention spécifique de l'organisation.

Nous avons donc retenu l'option suivante :

- Utiliser un **runner GitHub standard (hébergé par GitHub)** pour exécuter les jobs GitHub Actions.
- Depuis ces jobs, se connecter en **SSH** à la VM de l'école pour :
  - récupérer la dernière version du code (`git pull` sur la branche de production),
  - reconstruire et redéployer les conteneurs Docker en mode production.

Ce choix permet :

- d'avoir une configuration CD **entièrement décrite dans un seul fichier YAML** (`.github/workflows/deploy-on-release.yml` par exemple),
- de ne pas ajouter de scripts ou d'outils supplémentaires côté projet (MVP, lisible),
- de rester compatible avec les contraintes de droits de l'organisation GitHub.

---

## Déclencheur du déploiement

Nous utilisons **git flow** pour gérer les releases.

Le scénario est le suivant :

1. En local, nous préparons une release avec
  - `git flow release start vX.Y.Z` (création de la branche `release/vX.Y.Z`).
2. Une fois la release validée, nous terminons le cycle avec :
  - `git flow release finish vX.Y.Z`.
3. Cette commande effectue, en local :
  - un merge de la branche de release vers `main` et `develop`.
  - la création d'un **tag** de version `vX.Y.Z`.
4. Enfin, nous poussons les modifications vers GitHub :
  - `git push origin main develop --tags`.

Le **déclencheur GitHub Actions** sera configuré sur :

- les **push de tags** correspondant à une release (par exemple `v*.*.*`).

Concrètement :

- Lorsqu'un tag de release (par ex. `v1.0.0`) est poussé sur GitHub, le workflow GitHub Actions est déclenché.
- Ce workflow exécute ensuite la séquence de déploiement vers la VM.

Ce choix permet de :

- lier clairement une livraison en production à une **version taguée** du code,
- garder un modèle simple
  - ***"une release validée + tag poussée = un déploiement"***.

---

## Secrets et configuration côté GitHub

Pour que le runner GitHub puisse se connecter à la VM, nous utilisons les **secrets GitHub Actions** au niveau du dépôt d'organisation.

Les secrets suivants seront créés dans :

- `Settings` → `Security` → `Secrets and variables` → `Actions`.

Secrets minimum :

- `SSH_HOST` : nom de domaine ou adresse IP publique de la VM.
- `SSH_USER` : utilisateur SSH disposant des droits nécessaires pour déployer (accès au dépôt + Docker).
- `SSH_PORT` : port SSH (par défaut `22`, sinon la valeur configurée sur la VM).
- `SSH_PRIVATE_KEY` : clé privée SSH utilisée par le runner pour s'authentifier sur la VM.
- `APP_PATH` : chemin absolu du dossier du projet sur la VM (par exemple `/home/student/projet-gamer-challenges`).

Ces secrets ne sont **jamais commités dans le dépôt** : ils sont injectés au moment de l'exécution du workflow GitHub Actions.

---

## Stratégie de déploiement sur la VM

Le workflow GitHub Actions exécutera, de manière simplifiée, les étapes suivantes :

1. **Checkout du code** côté runner GitHub.
2. (Optionnel mais recommandé) **Build & tests**
  - exécuter les tests unitaires minimum (backend / frontend),
  - vérifier que le projet est dans un état stable avant déploiement.
3. **Connexion SSH à la VM** en utilisant les secrets précédemment définis.
4. Sur la VM
  - se placer dans le dossier du projet :
    - `cd $APP_PATH`,
    - récupérer la dernière version de la branche de production sera toujours `main`
      - `git pull origin main`,
      - redéployer les conteneurs en mode production à partir du `docker-compose.yml`
        - `docker compose --profile prod up -d --build`.

Ainsi, la VM reste l'unique point de vérité pour l'exécution des conteneurs, tandis que GitHub Actions ne sert qu'à :

- orchestrer la séquence "tag → tests → SSH → déploiement",
- centraliser l'historique des déploiements (onglet **Actions** du dépôt).

---

## Évolutions possibles (post-MVP)

Pour rester fidèle à l'objectif MVP, la première version de cette CD se contente de :

- reconstruire **tous** les conteneurs concernés par le profil `prod` à chaque release,
- ne gérer qu'un seul environnement cible (la VM de l'école).

Des évolutions possibles, hors périmètre immédiat du MVP :

- **Déploiements conditionnels** selon les modifications :
  - déclencher uniquement le rebuild des services API / client / Nginx en fonction des chemins modifiés,
  - utiliser `paths` / `paths-ignore` ou des conditions `if:` dans le YAML.
- **Multiplication des environnements** :
  - ajout d'un environnement de pré‑production avec un autre serveur / une autre VM.
- **Notifications** :
  - envoi d'un message sur un canal (Discord, Slack, etc.) en fin de déploiement.

Ces pistes restent optionnelles et ne doivent être envisagées qu'une fois le flux CD de base stabilisé et validé.