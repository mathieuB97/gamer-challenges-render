import Joi from 'joi';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

import HttpError from '../utils/HttpError.js';

import { Challenge, Contribution, Game, Role, User } from '../models/index.js'

export function validateUser(req, res, next) {

	// Schema du JSON attendu
	const userSchema = Joi.object({
		pseudo: Joi.string().alphanum().min(3).max(30),
		email: Joi.string().email(),
		password: Joi.string().min(1).max(30).required(),
	}).xor('pseudo', 'email');
	// impose que exactement un des deux champs [pseudo, email] soit présent

	const validation = userSchema.validate(req.body)

	if (validation.error) {
		// ERROR le JSON de la request n'est pas valide !
		// Erreur => lance une nouvelle erreur, elle sera attrapée par le middleware de gestion des erreurs
		// Equivalent de : return next(new HttpError(validation.error, 400));
		throw new HttpError("login ou mot de passe invalides", 400);
	}

	// Je ne suis pas rentré dans le IF, le body est valide donc j'appel le middleware suivant
	next();
}

export async function validateToken(req, res, next) {

	// 1. chercher le token qui est dans l'entête HTTP de la requete
	// entete sous forme de clé / valeur ==> Authorization: "Bearer < token >"
	// Valeur attendue : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJpYXQiOjE3NjU5NjEzNzcsImV4cCI6MTc2NTk2NDk3N30.t9_Iare4Fh7CG59hpjHtSesnbAG1HzEFErAI5hNtdVo"
	const bearerToken = req.headers.authorization;

	// 2. Est-ce que bearerToken existe et commence par "Bearer "
	if (!bearerToken || !bearerToken.startsWith("Bearer ")) {
		// Pas de authorization OU pas de bearer ==> lance une erreur 401 unauthorized qui sera attrapée par le errorHandler
		throw new HttpError("Authorization token missing or invalid", 401)
	}

	// 3. extraire le token de chaine de caractère
	// split découpe une string selon un séparateur et retourne un tableau de sous string
	// ici ça crée un tableau avec deux cases [Bearer] [eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJpYXQiOjE3NjU5NjEzNzcsImV4cCI6MTc2NTk2NDk3N30.t9_Iare4Fh7CG59hpjHtSesnbAG1HzEFErAI5hNtdVo]
	// index 0 du tableau : "Bearer"
	// index 1 du tableau : le token 
	const token = bearerToken.split(" ")[1];

	// 4. Utiliser JWT pour vérifier le token. Doc : https://www.npmjs.com/package/jsonwebtoken
	jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {

		// Token invalide => il a été modifié par le client ou il est expiré, etc.
		if (err) {
			console.log(err)
			throw new HttpError("Authorization token missing or invalid", 401)
		}

		// token valide !
		// decoded contient les données du token :  {
		// 		"user_id": 1,
		//  	"iat": 1765961377,
		//		"exp": 1765964977
		//	}
		// 5. Ajouter dans la requete (req) une nouvelle constante "user_id" qui contient l'id de l'utilisateur
		// cet id est extrait des valeurs du token
		req.user_id = decoded.user_id;
	});

	// Retrouver l'utilisateur dans la BDD avec son role
	const user = await User.findByPk(req.user_id,
		{
			attributes: [],
			include: {
				model: Role,
				as: 'role', // alias défini dans l'association USER <-> model/index.js
				attributes: ['name']
			}
		}
	);

	// Enregistrer dans la requete le role de l'utilisateur
	req.user_role = user.role.name;

	// 5. passe au middleware suivante
	next();
}


// requiredRole ==> role minimum pur accéder à la route
// requiredRole prend comme valeur, soit "user", soit "admin"
export function isAllowed(requiredRole = '') {
	return async (req, res, next) => {

		try {

			if (requiredRole === req.user_role || "admin" === req.user_role) {
				// Fin de la fonction, on appelle le middleware suivant
				return next();
			}

			// Par défaut tout est refusé
			throw new HttpError('Invalid Credentials', 401);

		} catch (error) {
			next(error);
		}

	}
}

export async function isAllowedv2(req, res, next) {

	try {

		// verbe HTTP de la requete : GET, POST, PATCH, DELETE, etc.
		const verbeHTTP = req.method;
		// chemin de la requète '/lists/', '/lists/:id', '/cards/:id', etc.
		const ressource = req.route.path;

		// Recherche à partir de la table Permission : 
		//  - jointure vers la table Role pour trouver le role de l'utilisateur connecté
		//  - jointure vers la table Action pour trouver le verbe HTTP + l'URL de la requete
		// Si on trouve une permission, l'utilisateur peut continuer
		// Si pas de réponse, on bloque la requête 
		const permission = await Permission.findOne(
			{
				// double jointure !
				include: [
					{
						// jointure 1 vers la table role
						model: Role,
						as: 'role',
						where: { name: req.user_role } // Filtre sur le rôle de l'utilisateur connecté
					},
					{
						// jointure 2 vers la table action
						model: Action,
						as: 'action',
						where: {
							verbe: verbeHTTP, // verbe HTTP de la requête
							ressource: ressource // URL de la requete
						}
					}
				]
			}
		)

		if (!permission) {
			// Pas de permission, on bloque la requête
			throw new HttpError('Invalid Credentials', 401);
		}

		// Suivant ;)
		next();

	} catch (error) {
		next(error);
	}

}