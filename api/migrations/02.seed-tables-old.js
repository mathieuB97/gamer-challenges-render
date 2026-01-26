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
		await sequelize.sync({ force: true }); 

		console.log('✅ Tables créées/recréées avec succès!'); 

		// ==============
		// ** éléments du JSON
		// ==============

		const challenges = data.challenges;
		const games = data.games;
		const contributions = data.contributions;
		const user_challenge = data.user_challenge;
		const user_contribution = data.user_contribution;

		console.log('📊 Données à importer:');
		console.log(`- ${roles.length} rôles`);
		console.log(`- ${users.length} utilisateurs`);
		console.log(`- ${games.length} jeux`);
		console.log(`- ${challenges.length} challenges`);
		console.log(`- ${contributions.length} contributions`);
		console.log(`- ${user_challenge.length} participations aux challenges`);
		console.log(`- ${user_contribution.length} votes sur contributions`);
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
				// On mappe "duration_minutes" du JSON vers "duration" de la BDD
				duration: contribution.duration_minutes
			});
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

					// Méthode magique fournie par Sequelize (correspond à l'alias 'collab_contributions')
					await myUser.addCollab_contribution(myContribution);
				} else {
					throw Error('myContribution is null')
				}
			} else {
				throw Error('myUser is null')
			}
		}

		// =================
		// ** Liens entre user et challenge (participants/votes)
		// =================

		// Objet Challenge initialisé à null
		let myChallenge = null;

		for (let element of user_challenge) {

			// Pour chaque "element" : {user_id, challenge_id}
			// Faire une recherche dans la BDD pour récupérer un objet User grace à user_id
			// Faire une recherche dans la BDD pour récupérer un objet Challenge grace a challenge_id
			// Faire le lien entre l'objet User et l'objet Challenge 

			// Recherche dans la BDD de la User à modifier
			// SELECT
			myUser = await User.findByPk(element.user_id);

			if (myUser) {
				// recherche dans la BDD du Challenge 
				// SELECT
				myChallenge = await Challenge.findByPk(element.challenge_id);

				if (myChallenge) {
					// Le User et le Challenge existent.
					// Je peux ajouter le Challenge dans la liste des challenges participés pour l'User 

					// Méthode magique fournie par Sequelize (correspond à l'alias 'participated_challenges')
					await myUser.addParticipated_challenge(myChallenge);
				} else {
					throw Error('myChallenge is null')
				}
			} else {
				throw Error('myUser is null for challenge participation')
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