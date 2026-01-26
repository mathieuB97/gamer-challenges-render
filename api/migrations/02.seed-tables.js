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
			role = await Role.findOne({ where: { name: roleName } })

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
		// ** import des games
		// =================

		for (let game of games) {
			// INSERT
			await Game.create(game)
		}

		// =================
		// ** import des challenges
		// =================

		for (let challenge of challenges) {
			// INSERT
			await Challenge.create(challenge);
		}

		// =================
		// ** import des contributions
		// =================

		for (let contribution of contributions) {
			// On crée un objet propre pour correspondre au modèle Sequelize
			await Contribution.create({
				video_url: contribution.video_url,
				challenge_id: contribution.challenge_id,
				user_id: contribution.user_id,
				duration: contribution.duration
			});
		}

		// =================

		// =================
		// ** Liens entre user et contribution (user_contribution)
		// =================
		let myUser = null;
		let myContribution = null;
		for (let element of user_contribution) {
			myUser = await User.findByPk(element.user_id);
			myContribution = await Contribution.findByPk(element.contribution_id);
			if (myUser && myContribution) {
				// L'alias généré par Sequelize est addCollab_contribution (voir as: 'collab_contributions')
				await myUser.addCollab_contribution(myContribution);
			} else {
				throw Error('user_contribution: user or contribution not found');
			}
		}

		// =================
		// ** Liens entre user et challenge (user_challenge)
		// =================
		let myChallenge = null;
		for (let element of user_challenge) {
			myUser = await User.findByPk(element.user_id);
			myChallenge = await Challenge.findByPk(element.challenge_id);
			if (myUser && myChallenge) {
				// L'alias généré par Sequelize est addParticipated_challenge (voir as: 'participated_challenges')
				await myUser.addParticipated_challenge(myChallenge);
			} else {
				throw Error('user_challenge: user or challenge not found');
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