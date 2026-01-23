🚀 Guide d'Installation et Maintenance - Gamer ChallengesCe guide détaille la procédure pour lancer, gérer et dépanner l'environnement de développement utilisant Docker.⚙️ Structure du ProjetPlaintext/
├── api/               → Backend Node.js (Dockerfile inclus)
├── client/
│   └── myapp/         → Frontend Vite (Dockerfile inclus)
├── docker-compose.yml → Orchestrateur des services
└── postgres_data/     → Volume local (créé par Docker pour la BDD)
🛠️ 1. Prérequis (Avant de lancer)Si tu es sur un environnement Linux (type Teleporter/Ubuntu), PostgreSQL est souvent déjà installé et bloque le port 5432.Libérer le port 5432 :Bashsudo service postgresql stop
🐳 2. Lancement de l'EnvironnementDepuis la racine du projet :Premier lancement ou modification des Dockerfiles :Bashdocker compose up -d --build
Lancement quotidien (sans rebuild) :Bashdocker compose up -d
🗄️ 3. Initialisation de la Base de DonnéesIndispensable au premier lancement ou après un down -v pour créer les tables et injecter les jeux :Bash# A. Créer la structure des tables (Migrations)
docker exec -it gamerChallenges_api npm run db:create

# B. Remplir les données initiales (Seeds)
docker exec -it gamerChallenges_api npm run db:seed
🔍 4. Commandes de Diagnostic (Debug)CommandeUtilitédocker psVérifier que les 3 conteneurs sont bien Up.docker compose logs -fVoir les erreurs de tous les services en temps réel.docker compose logs -f apiVoir uniquement les logs du backend.docker statsVoir la consommation RAM/CPU des conteneurs.🔄 5. Gestion du DéveloppementMettre à jour les servicesRelancer l'API (après modification de code sans nodemon) :Bashdocker compose restart api
Ajouter un package npm (ex: dans l'API) :docker exec -it gamerChallenges_api npm install <nom_du_package>Puis rebuild : docker compose up -d --buildAccéder à l'intérieur des conteneursTerminal API : docker exec -it gamerChallenges_api shTerminal BDD (SQL) : docker exec -it gamerChallenges_db psql -U gamer -d gamer🧹 6. NettoyageArrêter les services proprement :Bashdocker compose stop
Supprimer les conteneurs (conserve les données BDD) :Bashdocker compose down
Réinitialisation totale (⚠️ supprime toutes les données BDD) :Bashdocker compose down -v
docker system prune -f
🌐 7. Accès aux ServicesFrontend (Vite/Svelte) : http://localhost:5173Backend (API Node) : http://localhost:3000Base de données : localhost:5432
