# 🎮 GamerChallenges — Cahier des charges

## 1. 📌 Présentation du projet

**Nom du projet** : GamerChallenges
  
GamerChallenges est une plateforme communautaire permettant aux joueurs de **proposer**, **relever** et **voter** pour des défis (challenges) sur différents jeux vidéo.  
Les utilisateurs soumettent des preuves vidéo de leurs réalisations, et la communauté vote pour élire les meilleures performances.  
Un classement met en avant les joueurs les plus actifs et les plus performants.  

Ce projet est réalisé **en équipe de 4 développeurs**, dans le cadre du projet d’apothéose de la formation **O’Clock**.

## 2. 🎯 Définition des besoins et des objectifs

### 2.1 🧩 Problèmes identifiés (besoins)

Les communautés gaming sont dispersées (YouTube, Twitch, Discord, etc.) et il manque une plateforme **centralisée**, **ludique** et **compétitive** permettant :  
- de créer et relever des défis entre joueurs  
- de valider les performances via vidéos + votes  
- de valoriser les joueurs les plus actifs  

**GamerChallenges répond aux besoins suivants :**  
- Permettre aux utilisateurs de proposer et relever des défis sur différents jeux vidéo  
- Favoriser l’interaction communautaire via les votes  
- Mettre en avant les joueurs les plus actifs grâce à un tableau des leaders  
- Concevoir une application fonctionnelle, sécurisée et évolutive, respectant les bonnes pratiques du web  

### 2.2 🎯 Objectifs du projet (solutions)

- Offrir une plateforme intuitive pour créer et relever des défis  
- Permettre aux utilisateurs de soumettre des vidéos comme preuve de participation  
- Mettre en place un système de votes pour élire les meilleures performances  
- Proposer un leaderboard mettant en avant les joueurs les plus actifs et les plus votés  
- Construire une communauté autour du gaming, de la compétition et du partage  

## 3. 🧠 Fonctionnalités du projet

### 🔥 Fonctionnalités principales (MVP)

- 🏠 **Page d’accueil** : présentation du site, défis populaires, défis récents  
- 🔐 **Inscription / Connexion** : création de compte, authentification sécurisée  
- 📝 **Création de challenge** : formulaire (titre, description, règles, jeu concerné)  
- 📄 **Page de détail d’un challenge** : description, règles, participations vidéo  
- 🎥 **Soumission de participation** : upload vidéo ou lien externe (YouTube, Twitch…)  
- 👍 **Système de votes** : pour les défis et les participations  
- 🏆 **Leaderboard** : classement selon défis réalisés + votes obtenus  

### 🌱 Fonctionnalités secondaires (évolutions)

- 💬 Commentaires sur les participations  
- 🔍 Filtres de recherche (jeu, difficulté, popularité)  
- 🏅 Système de récompenses (badges, points, niveaux)  
- 🔔 Notifications (nouveau vote, commentaire, défi)  

## 4. 🛠️ Technologies utilisées

### 🎨 Frontend

#### Framework & outils

- Vite [serveur de dev + bundler Frontend]
- Svelte [framework UI compilant en HTML/CSS/JS côté client]
- Données
  - Fetch API (communication avec le backend)
  - Gestion des états (stores Svelte)
- CSS
  - Tailwind CSS (base, reset CSS)
  - Daisyui (composants UI)

#### Évolutions possible du Frontend
- SvelteKit pour un rendu côté serveur afin d'améliorer le SEO et les performances.

### ⚙️ Backend

#### Base de données
  - type PostgreSQL

#### Runtime
 - Node.js [runtime JavaScript côté serveur]

#### Framework
 - Express [serveur HTTP, routage, middlewares]
  - modules utilisés :
    - **cors**
      - gestion des requêtes cross-origin
    - **express-xss-sanitizer**
      - protection contre les attaques XSS
    - **dotenv**
      - gestion des variables d'environnement
    - **jsonwebtoken**
      - authentification via JWT
      - génération de tokens
      - vérification de tokens
      - gestion des sessions (expiration, renouvellement)
    - **bcrypt**
      - hachage des mots de passe
      - comparaison des mots de passe hachés
    - **Sequelize**
      - ORM pour la gestion de la base de données
      - création des modèles (tables)
      - gestion des relations entre les tables
      - exécution des requêtes SQL
    - **joi**
      - validation des données entrantes (schémas de validation)

## 5. 🎯 Cible du projet

- Joueurs amateurs et passionnés de jeux vidéo  
- Tous niveaux (débutant → confirmé)  
- Public jeune, connecté, habitué aux plateformes communautaires  

## 7. 🌐 UX/UI

### UX (User Experience)
- Page d'accueil,  
- Page d'inscription et de connexion,  
- Création, proposition d'un challenge par la communauté  
- Page de détail d'un challenge  
- Tableau d'affichage des meilleurs participants  

### UI (User Interface)
- **Page d'accueil** :  
  - Bloc de présentation du site  
  - Bloc affichant les défis en cours (derniers uploadés)  
  - Bloc affichant les défils les plus populaires (en fonction des votes)  
  - Bloc affichant les meilleurs participants (en fonction des votes et du nombre de participations)  
- **Filtres de recherche** : par jeux, par challenge et par popularité  

- **Header** :  
  - Filtre de recherche (par jeux, par challenge et par popularité)  
  - Lien vers la page de création de compte  
  - Lien vers la page de connexion de compte  
  - Logo "GamerChallenges"  
  - Navigation principale  

- **Footer** :  
  - Point RGPD (page informant les utilisateurs sur leurs droits concernant la protection des données)  
  - Copyright "GamerChallenge" 2026,  

## 6. 🌐 Navigateurs compatibles

- Google Chrome (dernière version)  
- Mozilla Firefox  
- Microsoft Edge  
- Safari  

## Role de chacun

Manu de Vries :  
Brahim El Ghachi :  
Michael Sauviat :  
Mathieu Bordes :  

---

Projet réalisé dans le cadre de la formation O’Clock – Apothéose – Janvier 2026
