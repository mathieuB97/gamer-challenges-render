
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import errorMiddleware from './middlewares/error.middleware.js';

// Import des routeurs
import authRouteur from './routes/auth.router.js';
import gameRouter from './routes/game.router.js';
import challengeRouter from './routes/challenge.router.js';
import contributionRouter from './routes/contribution.router.js';
import voteRouter from './routes/vote.router.js';

// Charger les variables d'environnement dès le début
dotenv.config();

const app = express();

// 1. MIDDLEWARES DE BASE (Sécurité et Parsing)
app.use(cors({
  origin: 'http://localhost:5173'
}));

// Doit être AVANT les routes pour que req.body soit lisible
app.use(express.json());

// 2. MIDDLEWARES PERSONNALISÉS
// Doit être AVANT les routes pour que res.sendResponse existe dans les contrôleurs
app.use((req, res, next) => {
  res.sendResponse = (data) => res.status(200).json(data);
  next();
});

// 4. BRANCHEMENT DES ROUTES
app.use(authRouteur);
app.use(gameRouter);
app.use(challengeRouter);
app.use(contributionRouter);

app.use(voteRouter);

// 6. MIDDLEWARE GLOBAL DE GESTION DES ERREURS
// Doit être APRES les routes pour attraper les erreurs lancées dans les contrôleurs via next(error)
app.use(errorMiddleware);

// 5. DÉMARRAGE
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 API started at http://localhost:${PORT}`);
});