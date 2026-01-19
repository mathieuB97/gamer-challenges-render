import { User, Role } from '../models/index.js';
import argon2 from 'argon2'; 
import 'dotenv/config';

class AuthController {
    registerUser = async (req, res, next) => {
        try {
            // Récupérer le body de la requete
            const dataJson = req.body;
        
            // Verifier si le pseudo de l'utilisateur existe déjà dans la BDD
            const result = await User.findOne({ 
                where: { pseudo: dataJson.pseudo } 
            });

            if (result) {
                // Si le résultat existe, c'est que le pseudo est déjà pris
                const error = new Error('Pseudo already exists');
                error.status = 409;
                throw error;
            }

            // Hasher le mot de passe pour mesure de sécurité
            const hash = await argon2.hash(dataJson.password);

            // Chercher le role "user" par défaut dans la table des rôles
            const defaultRole = await Role.findOne({ where: { name: 'user' } });

            // Créer le nouvel utilisateur dans la BDD
            const newUser = await User.create({
                email: dataJson.email,
                name: dataJson.name, // Important car obligatoire dans ton modèle
                pseudo: dataJson.pseudo,
                password: hash,
                role_id: defaultRole.id // Vérifie bien si c'est role_id ou roleId
            });

            if (!newUser) {
                const errorNotFound = new Error('User not created');
                errorNotFound.status = 500;
                throw errorNotFound;
            }
        
            // Si enregistrement réussi
            res.status(201).json({
                id: newUser.id,
                pseudo: newUser.pseudo
            });

        } catch (error) {
            next(error); // transmettre l'erreur au middleware de gestion des erreurs
        }
    }
}

export default new AuthController();