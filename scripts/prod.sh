#!/bin/bash
set -e

# Couleurs pour l'affichage
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}Déploiement en mode production...${NC}"

# Vérifier que le fichier .env.prod existe
if [ ! -f .env.prod ]; then
    echo -e "${RED}ERREUR: Fichier .env.prod introuvable${NC}"
    echo -e "${YELLOW}Créez le fichier .env.prod en copiant le modèle :${NC}"
    echo -e "   ${GREEN}cp .env.prod.example .env.prod${NC}"
    echo -e "${YELLOW}Puis modifiez OBLIGATOIREMENT les valeurs de sécurité.${NC}"
    exit 1
fi

# Vérifier que les fichiers docker-compose existent
if [ ! -f docker-compose.prod.yml ]; then
    echo -e "${RED}ERREUR: Fichier docker-compose.prod.yml introuvable${NC}"
    echo -e "${YELLOW}Assurez-vous d'avoir créé la configuration Docker complète${NC}"
    exit 1
fi

# Build des images de production
echo -e "${GREEN}Construction des images de production...${NC}"
docker compose -f docker-compose.yml -f docker-compose.prod.yml --env-file .env.prod build

# Démarrage en mode détaché
echo -e "${GREEN}Démarrage des services de production...${NC}"
docker compose -f docker-compose.yml -f docker-compose.prod.yml --env-file .env.prod up -d

echo -e "${GREEN}Services démarrés en mode production${NC}"
echo -e ""
echo -e "${YELLOW}Commandes utiles :${NC}"
echo -e "   ${BLUE}docker compose logs -f${NC}              # Voir tous les logs"
echo -e "   ${BLUE}docker compose logs -f api${NC}          # Logs backend uniquement"
echo -e "   ${BLUE}docker compose logs -f client${NC}       # Logs frontend uniquement"
echo -e "   ${BLUE}docker compose ps${NC}                   # Statut des services"
echo -e "   ${BLUE}docker compose down${NC}                 # Arrêter tous les services"
echo -e ""
echo -e "${GREEN}Application accessible sur les ports configurés${NC}"