#!/bin/bash

# Couleurs pour l'affichage
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Paramètre optionnel pour le service spécifique
SERVICE=${1:-""}

if [ -z "$SERVICE" ]; then
    echo -e "${GREEN}Affichage des logs de tous les services:${NC}"
    echo -e "${YELLOW}Utilisez Ctrl+C pour arrêter l'affichage des logs${NC}"
    echo -e ""
    docker compose logs -f
else
    echo -e "${GREEN}Affichage des logs du service: ${BLUE}$SERVICE${NC}"
    echo -e "${YELLOW}Utilisez Ctrl+C pour arrêter l'affichage des logs${NC}"
    echo -e ""
    docker compose logs -f $SERVICE
fi