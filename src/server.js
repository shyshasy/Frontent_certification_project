// Importer express, cors et dotenv
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Charger les variables d'environnement
dotenv.config();

// Créer une application express
const app = express();

// Définir le port (prendre celui du fichier .env ou 3002 par défaut)
const PORT = process.env.PORT || 3002;

// Middleware pour parser les données JSON dans les requêtes
app.use(express.json());
app.use(cors()); // Ajoutez le middleware CORS ici

// Définir la route de login
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    // Remplacer par la logique de votre application
    const users = [
        { email: 'user@example.com', password: 'password123' }
    ];

    const user = users.find(user => user.email === email);
    
    if (user && user.password === password) {
        return res.json({ message: 'Authentification réussie' });
    }

    res.status(401).json({ message: 'Identifiants invalides' });
});

// Lancer le serveur
app.listen(PORT, () => {
    console.log(`Serveur lancé sur le port ${PORT}`);
});
