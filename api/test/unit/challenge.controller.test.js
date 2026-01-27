import dotenv from "dotenv";
import { describe, it, expect } from 'vitest';
// Importation du controller qu'on teste (challenge.controller)
import ChallengeController from '../../controllers/challenge.controller.js';
// Importation des modèles pour tester les jointures du challenge.controller
import { Game, User, Contribution } from '../../models/index.js';

// Charger les variables d'environnement dès le début
dotenv.config();

console.log(process.env.DATABASE_URL, "🚀🚀 DATABASE_URL")

describe('ChallengeController', () => {
  
  describe('getRequestOptions', () => {
    
    it('should include necessary associations for the challenge view', () => {
      // --- 1. ARRANGE (Organiser) ---
      // On crée un faux objet "requete" (vide) pour simuler le controleur
      const req = {};

      // --- 2. ACT (Agir) ---
      // On appelle la méthode qui définit les inclusions Sequelize
      const options = ChallengeController.getRequestOptions(req);

      // --- 3. ASSERT (Vérifier) ---
      // On récupère la liste des modèles inclus dans le tableau d'options (en ignorant les alias ou attributs)
      const includedModels = options.map(opt => opt.model);

      // On vérifie que les modèles clés sont présents pour garantir l'affichage
      expect(includedModels).toContain(Game);
      expect(includedModels).toContain(User);
      expect(includedModels).toContain(Contribution);
    });

    it('should explicitly include the creator pseudo for contributions', () => {
      // ARRANGE
      const req = {};

      // ACT
      const options = ChallengeController.getRequestOptions(req);
      // On cherche l'inclusion spécifique des contributions
      const contributionInclusion = options.find(opt => opt.as === 'contributions');

      // ASSERT
      // On vérifie que dans les contributions, on inclut bien le créateur avec son pseudo
      const creatorSubInclusion = contributionInclusion.include.find(inc => inc.as === 'creator');
      
      expect(creatorSubInclusion.attributes).toContain('pseudo');
    });

  });
});