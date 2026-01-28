import { User, Role } from "../models/index.js";
import HttpError from "../utils/HttpError.js";

import argon2 from "argon2";

import jwt from "jsonwebtoken";

// Import pour lecture des variables d'environnement
import "dotenv/config";

class AuthController {
  registerUser = async (req, res, next) => {
    try {
      // Récupérer le body de la requete
      const dataJson = req.body;

      // Verifier si le pseudo de l'utilisateur existe déjà dans la BDD
      const result = await User.findOne({
        where: { pseudo: dataJson.pseudo },
      });

      if (result) {
        // Si le résultat existe, c'est que le pseudo est déjà pris
        const error = new Error("Pseudo already exists");
        error.status = 409;
        throw error;
      }

      // Hasher le mot de passe pour mesure de sécurité
      const hash = await argon2.hash(dataJson.password);

      // Chercher le role "user" par défaut dans la table des rôles
      const defaultRole = await Role.findOne({ where: { name: "user" } });

      // Créer le nouvel utilisateur dans la BDD
      const newUser = await User.create({
        email: dataJson.email,
        name: dataJson.name, // Important car obligatoire dans ton modèle
        pseudo: dataJson.pseudo,
        password: hash,
        role_id: defaultRole.id, // Vérifie bien si c'est role_id ou roleId
      });

      if (!newUser) {
        const errorNotFound = new Error("User not created");
        errorNotFound.status = 500;
        throw errorNotFound;
      }

      // Si enregistrement réussi
      res.status(201).json({
        id: newUser.id,
        pseudo: newUser.pseudo,
      });
    } catch (error) {
      next(error); // transmettre l'erreur au middleware de gestion des erreurs
    }
  };

  login = async (req, res, next) => {
    try {
      // récupérer le body de la requête
      const dataJson = req.body;

      // chercher l'utilisateur dans la BDD via OU son pseudo OU son email
      const where = dataJson.pseudo
        ? { pseudo: dataJson.pseudo }
        : { email: dataJson.email };
      const userFromBDD = await User.findOne({ where: where });

      if (!userFromBDD) {
        // result est null, le pseudo n'existe pas
        throw new HttpError("login ou mot de passe incorrect", 401);
      }

      // comparer le mot de passe fourni avec celui en BDD (haché)
      if (!(await argon2.verify(userFromBDD.password, dataJson.password))) {
        // Le mot de passe ne correspond pas !
        throw new HttpError("login ou mot de passe incorrect", 401);
      }

      // Générer un token JWT avec l'id de l'utilisateur
      // process.env.JWT_SECRET doit contenir ta clé secrète
      const token = jwt.sign(
        { user_id: userFromBDD.id },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }, // le token expire dans 24 heures
      );

      // Répondre avec le token ET les données utilisateur
      res.status(200).json({ 
        token: token,
        user: {
          id: userFromBDD.id,
          pseudo: userFromBDD.pseudo,
          email: userFromBDD.email
        }
      });
    } catch (error) {
      next(error);
    }
  };
  getMe = async (req, res, next) => {
    try {
      // Récupère l'ID de l'utilisateur
      // Il a été ajouté dans req par le middleware validateToken
      // L'id vient des données du token
      const userId = req.user_id;

      // Chercher un utilisateur selon son ID
      // Retourne uniquement les informations du user SANS son Role
      // const user = await User.findByPk(userId);

      // Chercher un utilisateur par son ID avec son role
      // WHERE id = <userId>
      const user = await User.findByPk(userId, {
        // je veux uniquement les colonnes id et pseudo de la table User
        // Pas la colonne password
        // SELECT id, pseudo
        attributes: ["id", "pseudo"],
        // inlude => ajoute les données d'une autre table
        // JOINTURE INNER JOIN
        include: {
          // va chercher dans la table Role
          model: Role,
          // alias de l'association entre User et Role
          as: "role",
          // Je veux QUE la colonne 'name' cas, je veux pas la colonne id
          // SELECT name FROM Role
          attributes: ["name"],
        },
      });

      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  };
}

// Export de l'objet controller en entier
const myController = new AuthController();
export default myController;
