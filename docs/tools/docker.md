# Docker

Nous avons mis en place des conteneurs Docker pour gagner en **simplicité**, en **productivité** et en **portabilité**.\
Notre projet est sous la forme MVC (Model-View-Controller) avec un frontend en Svelte séparé du backend en Node.js/Express.\
Nous avons créé trois conteneurs Docker distincts :
| Conteneur  Names       | Description                                  |
|------------------------|----------------------------------------------|
| gamerChallenges_client | Conteneur pour le frontend Svelte            |
| gamerChallenges_api    | Conteneur pour le backend Node.js/Express    |
| gamerChallenges_db     | Conteneur pour la base de données PostgreSQL |

## Prérequis

Installez Docker et Docker Compose.

## Lancement des conteneurs

### mode développement

#### Maintenant
> prise en compte des nouveaux modules npm installés, prise en compte des modifications de code backend et frontend, affichage des logs en temps réel.

```bash
docker compose up # lance les conteneurs en mode développement
```
 pour la prod il faudra faire un docker compose -f docker-compose.prod.yml up et gérer ça avec PM2 pour le backend et une build statique pour le frontend.

#### Avant
> pas moyen de suivre les logs en temps réel, pas de prise en compte de l'ajout de modules npm, pas de prise en compte des modifs de code sans rebuild de l'image.

Pour lancer les conteneurs en mode développement, depuis la racine du projet, exécutez :

```bash
docker compose up -d
# il nous faudrait un flag pour exprimer le mode dev ou s'appuyer sur un fichier .docker-env avec une variable d'environnement qui sera soit DOCKER_ENV=development soit DOCKER_ENV=production
```
#### mode développement

1. Prise en compte des nouveaux modules npm installés sans reconstruire l'image.
2. Prise en compte des modifications de code backend et frontend sans reconstruire l'image.
3. Affichage des logs en temps réel.

### mode production (WIP)

1. démarrage des conteneurs via PM2 pour le backend et via une build statique pour le frontend.
2. Créer des fichiers distincts pour les logs d'erreurs pour chaque service : frontend, backend, base de données.
3. idéalement, un email de notification en cas d'erreur critique.

## Issues

Actuellement notre docker compose nous freine dans le développement pour les raisons suivantes :
- Lors de la modification des variables d'environnement, il nous faut reconstruire complètement l'image du service concerné.
- Lors de l'installation de nouveaux modules npm, idem.
- L'affichage des logs n'est pas optimal. Exemple un ```console.log``` dans le backend n'apparaît que si nous reconstruisons l'image.
- La gestion de la base de données avec postgres nous pose problème.
    - Nous devons vérifier que postgres n'est pas en cours d'exécution avant de lancer le conteneur.
    - ```sudo systemctl status postgresql``` doit retourner inactive. Sinon, le conteneur gamerChallenges_db ne peut pas utiliser le port 5432. Nous aurions pu mapper un autre port, mais cela aurait nécessité des modifications supplémentaires dans le code.
    - ```systemctl list-unit-files --type=service | grep postgres``` permet de lister les services postgres actives.
    - Stopper le service postgres local ```sysctl stop postgresql```
    - Désactiver le démarrage automatique postgres au démarrage ```sudo systemctl disable postgresql```
    - La solution serait d'afficher un message d'erreur clair si le port 5432 est déjà utilisé et de suggérer la cmd qui permet de stopper le service local. Il faudrait ajouter cette vérification dans le fichier docker-compose.yml dans le service gamerChallenges_db.