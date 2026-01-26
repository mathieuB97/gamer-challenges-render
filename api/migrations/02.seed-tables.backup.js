// seed.js
import sequelize from '../models/sequelize.client.js';
import argon2 from 'argon2';
import { User, Role, Challenge, Game, Contribution } from '../models/index.js';

// Import des json pour seed la BDD
import data from './data-examples.json' with { type: 'json'};

async function seed() {
	console.log('🚀 Démarrage du seeding...');

	try {
		// force: true va DROP les tables avant de les recréer. Pour le dev uniquement !
		await sequelize.sync({ force: true });
		console.log('✅ Tables créées/recréées avec succès!');

		// ==============
		// ** éléments du JSON
		// ==============
		const roles = data.roles;
		const users = data.users;
		const games = data.games;
		const challenges = data.challenges;
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
		// ** import des roles
		// =================
		console.log('👑 Import des rôles...');
		for (let role of roles) {
			await Role.create(role);
		}
		console.log('✅ Rôles importés');

		// =================
		// ** import des utilisateurs
		// =================
		console.log('👤 Import des utilisateurs...');
		for (let user of users) {
			const roleName = user.roleName;
			const role = await Role.findOne({ where: { name: roleName } });
			
			if (!role) {
				throw new Error(`Rôle ${roleName} non trouvé`);
			}

			const hash = await argon2.hash(user.password);

			await User.create({
				email: user.email,
				pseudo: user.pseudo,
				password: hash,
				role_id: role.id
			});
		}
		console.log('✅ Utilisateurs importés');

		// =================
		// ** import des games
		// =================
		console.log('🎮 Import des jeux...');
		for (let game of games) {
			await Game.create(game);
		}
		console.log('✅ Jeux importés');

		// =================
		// ** import des challenges
		// =================
		console.log('🏆 Import des challenges...');
		for (let challenge of challenges) {
			await Challenge.create(challenge);
		}
		console.log('✅ Challenges importés');

		// =================
		// ** import des contributions
		// =================
		console.log('🎬 Import des contributions...');
		for (let contribution of contributions) {
			await Contribution.create({
				video_url: contribution.video_url,
				challenge_id: contribution.challenge_id,
				user_id: contribution.user_id,
				duration: contribution.duration_minutes
			});
		}
		console.log('✅ Contributions importées');

		// =================
		// ** Liens user_contribution (votes)
		// =================
		console.log('🔗 DÉBUT: Création des liens user-contribution...');
		console.log('Données user_contribution:', user_contribution);
		
		let countContributions = 0;
		for (let element of user_contribution) {
			console.log(`Processing: user_id=${element.user_id}, contribution_id=${element.contribution_id}`);
			
			try {
				await sequelize.query(`
					INSERT INTO user_contribution (user_id, contribution_id, created_at, updated_at)
					VALUES ($1, $2, NOW(), NOW())
				`, {
					bind: [element.user_id, element.contribution_id]
				});
				
				countContributions++;
				console.log(`✅ OK: user ${element.user_id} -> contribution ${element.contribution_id}`);
			} catch (error) {
				console.error(`❌ ERREUR insertion user_contribution:`, error.message);
			}
		}
		console.log(`✅ ${countContributions} liens user-contribution créés`);

		// =================
		// ** Liens user_challenge (participants)
		// =================
		console.log('🔗 DÉBUT: Création des liens user-challenge...');
		console.log('Données user_challenge:', user_challenge);
		
		let countChallenges = 0;
		for (let element of user_challenge) {
			console.log(`Processing: user_id=${element.user_id}, challenge_id=${element.challenge_id}`);
			
			try {
				await sequelize.query(`
					INSERT INTO user_challenge (user_id, challenge_id, created_at, updated_at)
					VALUES ($1, $2, NOW(), NOW())
				`, {
					bind: [element.user_id, element.challenge_id]
				});
				
				countChallenges++;
				console.log(`✅ OK: user ${element.user_id} -> challenge ${element.challenge_id}`);
			} catch (error) {
				console.error(`❌ ERREUR insertion user_challenge:`, error.message);
			}
		}
		console.log(`✅ ${countChallenges} liens user-challenge créés`);

		// Vérification finale
		const countUserContribution = await sequelize.query('SELECT COUNT(*) as count FROM user_contribution', { 
			type: sequelize.QueryTypes.SELECT 
		});
		const countUserChallenge = await sequelize.query('SELECT COUNT(*) as count FROM user_challenge', { 
			type: sequelize.QueryTypes.SELECT 
		});
		
		console.log(`📊 Vérification finale:`);
		console.log(`- Liens user_contribution: ${countUserContribution[0].count}`);
		console.log(`- Liens user_challenge: ${countUserChallenge[0].count}`);

		console.log('🎉 Seeding terminé avec succès!');

	} catch (error) {
		console.error('❌ Erreur lors du seeding:', error);
		console.error('Stack trace:', error.stack);
		throw error;
	} finally {
		await sequelize.close();
	}
}

await seed();