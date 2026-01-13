# 🎮 GamerChallenges — Cahier des charges

## 1. 📌 Présentation du projet

**Nom du projet** : GamerChallenges  
**Type** : Plateforme communautaire compétitive gaming  
**Description** :  
GamerChallenges est une plateforme qui permet aux joueurs de **proposer**, **relever** et **voter** pour des défis (challenges) sur une grande variété de jeux vidéo.  
Les utilisateurs soumettent des preuves vidéo de leurs réalisations, la communauté vote pour les meilleures performances et un classement valorise les joueurs les plus actifs et les plus appréciés.

**Contexte** : Projet d’apothéose réalisé **en équipe de 4 développeurs** dans le cadre de la formation **O’Clock** – Janvier 2026

## 2. 🎯 Besoins et objectifs

### 2.1 🧩 Problèmes identifiés

Les communautés gaming sont très fragmentées (YouTube, Twitch, Discord, Reddit, forums…) et il manque aujourd’hui une plateforme **centralisée**, **ludique** et **compétitive** qui permette de :

- Créer et relever facilement des défis entre joueurs
- Valider objectivement les performances via des preuves vidéo
- Récompenser et valoriser les meilleures réalisations par le vote communautaire
- Mettre en lumière les joueurs les plus talentueux et les plus actifs

### 2.2 🎯 Objectifs du projet

- Offrir une expérience intuitive pour **proposer**, **relever** et **voter** des défis
- Permettre la soumission de preuves vidéo (upload ou lien externe)
- Mettre en place un système de votes démocratique pour les défis et les participations
- Valoriser les meilleurs joueurs via un **leaderboard** dynamique
- Créer une véritable communauté autour de la compétition, du fun et du partage gaming

## 3. 🧠 Fonctionnalités

### 🔥 MVP – Fonctionnalités prioritaires

- 🏠 **Page d’accueil** : présentation + défis populaires + défis récents + mini-leaderboard
- 🔐 **Inscription & Connexion** : création de compte + authentification sécurisée (JWT)
- 📝 **Proposition de challenge** : formulaire (titre, jeu, description, règles, difficulté, tags…)
- 📄 **Page détail challenge** : description complète, règles, liste des participations vidéo
- 🎥 **Soumission de participation** : upload vidéo ou lien YouTube/Twitch + commentaire optionnel
- 👍 **Système de votes** : vote pour les défis proposés + vote pour les meilleures participations
- 🏆 **Leaderboard** : classement global (défis réussis + votes obtenus)

### 🌱 Évolutions futures (post-MVP)

- 💬 Système de commentaires sur les participations
- 🔍 Filtres & recherche avancée (par jeu, difficulté, popularité, date…)
- 🏅 Système de récompenses (badges, points, niveaux)
- 🔔 Notifications (nouveau vote, nouveau commentaire, défi relevé…)
- Profil utilisateur détaillé + galerie de participations

## 4. 🛠️ Stack technique

### 🎨 Frontend
- Svelte (ou SvelteKit)
- Tailwind CSS
- Vite
- Fetch API + gestion d’état légère (stores Svelte)

### ⚙️ Backend
- Node.js + Express
- PostgreSQL
- Sequelize (ORM)
- JWT pour l’authentification

## 5. 👥 Cible & personas

- **Public principal** : Joueurs passionnés de jeux vidéo (amateurs → semi-pros)
- Âge moyen : 16–35 ans
- Habitués aux plateformes sociales et communautaires
- Tous niveaux de compétence acceptés (le fun et la créativité priment)

## 6. 🌐 Navigateurs compatibles

- Google Chrome ≥ dernière version
- Mozilla Firefox ≥ dernière version
- Microsoft Edge ≥ dernière version
- Safari ≥ dernière version

## 7. 🎨 UX/UI – Principes directeurs

### UX – Parcours utilisateurs clés
- Découverte rapide des défis tendances
- Proposition de challenge simple et guidée
- Consultation et vote rapide sur les participations
- Valorisation personnelle via le profil et le leaderboard

### UI – Éléments majeurs de la page d’accueil

**Header**  
- Logo GamerChallenges  
- Barre de recherche (jeux / défis / tags)  
- Boutons Connexion / Inscription  
- Menu navigation (Accueil, Challenges, Leaderboard, Proposer)

**Contenu principal**  
- Hero banner dynamique (slogan + CTA « Proposer un défi » / « Voir les challenges »)  
- Section « Défis tendance » (cartes avec miniature jeu + titre + compteur votes)  
- Section « Derniers défis ajoutés »  
- Section « Meilleures participations récentes » (vignettes vidéo)  
- Mini-leaderboard latéral ou bas de page

**Footer**  
- Liens mentions légales  
- Politique de confidentialité & RGPD  
- Copyright © GamerChallenges 2026

**Ambiance graphique globale**  
- Dark mode par défaut  
- Accents néon (bleu électrique + violet/magenta)  
- Effets subtils de glow & micro-animations sur interactions

## 8. 👥 Équipe & rôles

- **Manu de Vries** :  
- **Brahim El Ghachi** :  
- **Michael Sauviat** :  
- **Mathieu Bordes** :

**Projet réalisé dans le cadre de la formation O’Clock – Apothéose – Janvier 2026**

---

Bonne chance à toute l’équipe pour cette apothéose ! 🚀  
N’hésitez pas à me dire si vous voulez approfondir une section (wireframes, user stories, MCD, etc.)
