import express from "express";

import authRoutes from '../routes/auth.routes.js';

const app = express();
const PORT = 3000;
//routes//
app.use(express.json());

app.use(authRoutes);

// Route de test
app.get("/", (req, res) => {
  res.send("🚀 Serveur Express opérationnel !");
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`✅ Serveur lancé sur http://localhost:${PORT}`);
});
