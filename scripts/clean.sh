#!/bin/bash
set -e

# Couleurs pour l'affichage
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${YELLOW}Nettoyage des conteneurs et volumes Docker...${NC}"

# Arrêter tous les services
echo -e "${GREEN}Arrêt des services...${NC}"
docker compose down

# Supprimer les volumes (optionnel - demander confirmation)
read -p "Voulez-vous supprimer les volumes (données de base de données) ? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${YELLOW}Suppression des volumes...${NC}"
    docker compose down -v
fi

# Nettoyage des images et conteneurs inutilisés
echo -e "${GREEN}Nettoyage des ressources Docker inutilisées...${NC}"
docker system prune -f

echo -e "${GREEN}Nettoyage terminé${NC}"