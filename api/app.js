import express from "express";

const app = express();
const PORT = 3000;

// Route de test
app.get("/", (req, res) => {
  res.send("🚀 Serveur Express opérationnel !");
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`✅ Serveur lancé sur http://localhost:${PORT}`);
});
