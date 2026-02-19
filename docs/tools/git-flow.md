# Git Flow

Git Flow permet d’adopter un workflow Git simple, robuste et adapté aux projets collaboratifs.

## Installation

Installez le package globalement :

```bash
npm install -g gitflow
```

## Initialisation du projet

Dans le répertoire de votre projet :

```bash
git flow init
```

Validez les noms de branches proposés (par défaut : `develop`, `feature`, `release`, `hotfix`, `support`).

## Cycle de développement

### Créer une branche de feature

```bash
git flow feature start <nom-de-la-feature>
```

Travaillez sur votre feature, puis demandez une Pull Request (code review) sur Github.

### Finir une feature

Après validation de la PR, fusionnez la branche dans `develop` :

```bash
git flow feature finish <nom-de-la-feature>
```

La branche est supprimée et le code intégré à `develop`.

## Liens utiles
- [Documentation officielle Git Flow](https://github.com/nvie/gitflow)
- [GitHub Flow vs Git Flow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)

---

> Git Flow structure le développement en équipe, facilite les releases, hotfix et support, et clarifie le cycle de vie des branches.