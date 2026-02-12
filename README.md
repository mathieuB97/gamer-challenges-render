# README

## Livrable (TP) - GamerChallenges

- test unitaires (au moins 1)
- déploiement sur la VM O'Clock (mise en ligne du projet)
- terminer ce qui a était lister dans le MVP (cf docs/conception/cahier-des-charges.md section Fonctionnalités principales (MVP))
- vérifier le référentiel sur Kourou (présentation du projet lors du TP)

## Évolution

Mémorisation du niveau de difficulté choisi par l’utilisateur.

Nous avons ajouté la possibilité pour chaque utilisateur de mémoriser son évaluation de la difficulté d’un challenge (niveau : hard, medium, easy).
Pour cela, une nouvelle table de liaison devra être créée entre les utilisateurs et les challenges, permettant d’enregistrer le niveau sélectionné par chaque utilisateur pour chaque challenge.

Fonctionnalités apportées :

Un utilisateur peut choisir et enregistrer son ressenti sur la difficulté d’un challenge.
Cette information est persisté en base de données et pourra être exploitée pour des statistiques ou des recommandations personnalisées.
Implémentation technique :

Création d’un modèle Sequelize ChallengeEvaluation (ou ChallengeLevel) avec les champs : user_id, challenge_id, level.
Ajout des associations nécessaires dans les modèles Sequelize (User, Challenge).
API et interface adaptées pour permettre la sélection et la sauvegarde du niveau.

# GamerChallenges

> toute la documentation liée au projet est située dans le dossier `docs/` à la racine du dépôt.
```
docs/
├─ conception
├─ endpoint
├─ gamerChallenge_installation_docker.md
├─ project_dependencies.md
└─ tools
```

## Présentation Générale

- **Quoi ?** Une plateforme dédiée aux défis de jeux vidéo, permettant aux utilisateurs de proposer et relever des challenges sur différents jeux.
- **Qui ?** GamerChallenges (fictif) vise à rassembler les passionnés de jeux vidéo autour d'une communauté dynamique et compétitive.
- **Pour qui ?** Pour tous les amateurs de jeux vidéo, quel que soit leur niveau, cherchant à se mesurer aux autres et à partager leurs expériences.
- **Comment ?** En équipe à définir (positionnement via un formulaire de voeux) par l'équipe pédagogique. Organisation en méthode agile pour la gestion de projet.
- **Quand ?** En plusieurs sprints qui inclueront des tâches de : conception, code, déploiement, recettage, etc.
- **Pourquoi ?** Pour la réalisation d'un projet fictif à but pédagogique visant l'obtention du Titre Professionnel.

## Présentation du Projet de Développement

### Besoins Fonctionnels (Minimum Viable Product - MVP)

- **Page d'accueil** : présentation de GamerChallenges, des défis en cours et populaires.
- **Système d'inscription et de connexion** : gestion des utilisateurs.
- **Proposition de challenge** : les utilisateurs peuvent soumettre des défis à réaliser.
- **Page de détail d'un challenge** : description, règles et vidéos des participations
- **Votations** : possibilité de voter pour les défis proposés et les meilleures participations.
- **Soumission de participations** : les utilisateurs peuvent envoyer leurs vidéos pour prouver la réalisation des challenges.
- **Tableau des leaders** : affichage des utilisateurs ayant réalisé le plus de défis et obtenu le plus de votes.

### Propositions d’évolutions possibles

- **Système de commentaires** : les utilisateurs peuvent commenter les participations.
- **Filtres de recherche** : recherche par jeux, type de challenge, et popularité.
- **Système de récompenses** : badges ou points pour les utilisateurs en fonction de leurs participations et votes.

### Contraintes Techniques (notamment liées au TP)

- **Technologies** : choix libres mais justifiés.
- **Sécurité :** authentification sécurisée, protection contre les failles courantes (XSS, injections SQL, etc.).
- **Déploiement :** rédaction a minima d'une procédure de déploiement (CI/CD en bonus).
- **Responsive :** application développée en mobile first et responsive.
- **Accessibilité :** respect des normes d'accessibilité web [WCAG](https://www.w3.org/Translations/WCAG20-fr/).
- **RGPD et mentions légales :** mise en place des mentions légales liées au règlement général sur la protection des données (RGPD).
- **Versionning :** utilisation de Git et GitHub.
- **API** : consommer au moins une API (qu’elle soit interne ou externe). Un seul appel peut être suffisant, l’API ne doit pas forcément être utilisée pour tout le projet.
- **SEO** : appliquer les bonnes pratiques visant à maximiser le référencement du projet.
- **Bonus** :
    - conteneurisation (Docker) pour l'environnement de développement voire pour le déploiement,
    - éco-conception (optimisation des images, minification des fichiers, etc.).

### Informations & Ressources complémentaires

- Ne pas hésiter à utiliser des contenus “lorem ipsum” au moins le temps d'avoir un MVP fonctionnel.
- Inspiration graphique : à mi chemin entre des sites de communautés de gamers, plateformes de partage de contenu comme [YouTube](https://www.youtube.com) ou [Twitch](https://www.twitch.tv) et forums de jeux vidéo.

## Pour terminer

- Le projet est libre d'interprétation, l'équipe peut proposer ses propres choix techniques et fonctionnels. Il est donc évolutif et il ne faut pas hésiter à se l'approprier.
- L'accent doit être mis sur l'apprentissage et la mise en pratique des compétences acquises pendant la formation (objectif TP).
- L'équipe pédagogique assure l'accompagnement et conseille tout au long du projet. Elle interviendra aussi lors de la validation des choix techniques et fonctionnels. Elle sera garante de l'évaluation de la progression en vue de se préparer au mieux pour le TP.
- L'équipe pédagogique n'est en aucun cas positionnée en tant que représentante du client fictif du projet proposé.

:arrow_right: [Attendus sur le sprint 0](../.github/ISSUE_TEMPLATE/sp0-suivi-conception.md), dédié à la conception.