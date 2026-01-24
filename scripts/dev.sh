#!/bin/bash
set -e

# Couleurs pour l'affichage
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}Démarrage en mode développement...${NC}"

# Vérifier le port PostgreSQL
if lsof -Pi :5432 -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo -e "${RED}ERREUR: Port 5432 déjà utilisé par PostgreSQL local.${NC}"
    echo -e "${YELLOW}Stoppez le service PostgreSQL local avec ces commandes :${NC}"
    echo -e "   ${GREEN}sudo systemctl stop postgresql${NC}"
    echo -e "   ${GREEN}sudo systemctl disable postgresql${NC}"
    echo -e "${YELLOW}Puis relancez ce script.${NC}"
    exit 1
fi

echo -e "${GREEN}Port 5432 disponible${NC}"

# Vérifier que .env.dev existe
if [ ! -f .env.dev ]; then
    echo -e "${RED}ERREUR: Fichier .env.dev introuvable${NC}"
    echo -e "${YELLOW}Créez le fichier .env.dev en copiant le modèle :${NC}"
    echo -e "   ${GREEN}cp .env.dev.example .env.dev${NC}"
    echo -e "${YELLOW}Puis modifiez les valeurs selon vos besoins.${NC}"
    exit 1
fi

# Vérifier que les fichiers docker-compose existent
if [ ! -f docker-compose.dev.yml ]; then
    echo -e "${RED}ERREUR: Fichier docker-compose.dev.yml introuvable${NC}"
    echo -e "${YELLOW}Assurez-vous d'avoir créé la configuration Docker complète${NC}"
    exit 1
fi

echo -e "${GREEN}Lancement des conteneurs Docker en mode développement...${NC}"
echo -e "${YELLOW}Les logs s'affichent avec les préfixes suivants :${NC}"
echo -e "   ${BLUE}backend:${NC} pour l'API Node.js/Express"
echo -e "   ${GREEN}frontend:${NC} pour le client Svelte"
echo -e "   ${YELLOW}database:${NC} pour PostgreSQL"
echo -e ""
echo -e "${YELLOW}Utilisez Ctrl+C pour arrêter tous les services${NC}"
echo -e ""

# Lancer les services avec logs unifiés
docker compose -f docker-compose.yml -f docker-compose.dev.yml --env-file .env.dev up