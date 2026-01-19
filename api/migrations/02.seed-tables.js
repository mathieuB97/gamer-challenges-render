// seed.js
import sequelize from '../models/sequelize.client.js';

import argon2 from 'argon2';

import { User, Role, Challenge, Game, Contribution } from '../models/index.js';

// Import des json pour seed la BDD
import data from './data-examples.json' with { type: 'json'};

async function seed() {
	console.log('Syncing database...');

	try {
		// force: true va DROP les tables avant de les recréer. Pour le dev uniquement !
		// await sequelize.sync({ force: true }); 

		// ==============
		// ** éléments du JSON
		// ==============

		const challenges = data.challenges;
		const games = data.games;
		const contributions = data.contributions;
        const user_challenge = data.user_challenge;
        const user_contribution = data.user_contribution;

		// =================
		// ** import des roles
		// =================

		// tableau des rôles
		const roles = data.roles;

		for (let role of roles) {
			// INSERT
			await Role.create(role);
		}

		// =================
		// ** import des utilisateurs
		// =================

		const users = data.users;

		let roleName = '';
		let role = {};
		// Parcours le tableau des users
		for (let user of users) {

			// roleName déclaré dans le JSON (on récupère dans le data-examples.json, le roleName de chaque) 
			const roleName = user.roleName;
			
			// Chercher dans la BDD le role qui s'appelle "roleName"
			role = await Role.findOne( { where: {name: roleName} })

			// TODO vérifier que role n'est pas null

			// 1 calcul le hash du mdp de user
			const hash = await argon2.hash(user.password);

			// 2. Dans la table user crée ce nouvel utilisateur ( voici les données à insérer )
			// INSERT
			await User.create(
				{
				email: user.email,      // Vient du JSON
                pseudo: user.pseudo,    // Vient du JSON (et pas "username")
                password: hash,
                role_id: role.id        // L'ID qu'on a récupéré juste au-dessus
				}
			);
		}


		// =================
		// ** import des challenges
		// =================

		for (let challenge of challenges) {
			// INSERT
			await Challenge.create(challenge);
		}

		// =================
		// ** import des games
		// =================

		for (let game of games) {
			// INSERT
			await Game.create(game)
		}

		// =================
		// ** import des contributions
		// =================

		for (let contribution of contributions) {
			// INSERT
			await Contribution.create(contribution)
		}

		// =================
		// ** Liens entre user et contribution
		// =================

		// Objet User initialisé à null
		let myUser = null;

		// Objet Contribution initialisé à null
		let myContribution = null;

		for (let element of user_contribution) {

			// Pour chaque "element" : {user_id, contribution_id}
			// Faire une recherche dans la BDD pour récupérer un objet User grace à user_id
			// Faire une recherche dans la BDD pour récupérer un objet Contribution grace a contribution_id
			// Faire le lien entre l'objet User et l'objet Contribution 

			// Recherche dans la BDD de la User à modifier
			// SELECT
			myUser = await User.findByPk(element.user_id);

			if (myUser) {
				// recherche dans la BDD de la Contribution 
				// SELECT
				myContribution = await Contribution.findByPk(element.contribution_id);

				if (myContribution) {
					// Le User et la Contribution existent.
					// Je peux ajouter la Contribution dans la liste des contributions pour l'User 

					// Méthode magique fournie par Sequelize au moment où on a déclaré User Belongs To Many Contribution
					await myUser.addContribution(myContribution);
				} else {
					throw Error('myContribution is null')
				}
			} else {
				throw Error('myUser is null')
			}
		}

		console.log('✅ Seeding complete!');

	} catch (error) {
		console.log('Error seeding BDD', error);
	} finally {
		// Ferme la connexion à la BDD
		await sequelize.close();
	}
}

await seed();