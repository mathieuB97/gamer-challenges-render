import dotenv from "dotenv";
import express from "express";


import authRouteur from './routes/auth.router.js';

const app = express();


// Indique à express qu'on utiliser du JSON dans le body des requetes et des reponses HTTP
app.use(express.json()); 
 

// Router inscription + authentification
app.use(authRouteur);


// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 API started at http://localhost:${PORT}`);
});
