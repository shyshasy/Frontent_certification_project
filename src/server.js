// import fs from 'fs';
// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import path from 'path';
// import nodemailer from 'nodemailer'; // Importer nodemailer

// // Charger les variables d'environnement
// dotenv.config();

// // Créer une application express
// const app = express();

// // Définir le port (prendre celui du fichier .env ou 3002 par défaut)
// const PORT = process.env.PORT || 3002;

// // Middleware pour parser les données JSON dans les requêtes
// app.use(express.json());
// app.use(cors()); // Middleware CORS

// // Définir __dirname pour les ES Modules
// const __dirname = path.resolve();

// // Fonction pour charger les utilisateurs à partir de users.json
// const loadUsers = () => {
//     const filePath = path.join(__dirname, 'public', 'users.json'); // Chemin vers le fichier dans le dossier public
//     const data = fs.readFileSync(filePath, 'utf-8');
//     return JSON.parse(data);
// };

// // Configurer le transporteur de mails
// const transporter = nodemailer.createTransport({
//     service: 'gmail', // Utiliser un service de mail comme Gmail
//     auth: {
//         user: process.env.EMAIL_USER, // Votre adresse email
//         pass: process.env.EMAIL_PASS,  // Votre mot de passe d'application ou mot de passe normal
//     },
// });

// // Route pour la réinitialisation du mot de passe
// app.post('/api/reset-password', (req, res) => {
//     const { email } = req.body;

//     // Charger la liste des utilisateurs
//     const users = loadUsers();
//     const user = users.find(user => user.email === email);

//     if (!user) {
//         return res.status(404).json({ message: 'Utilisateur non trouvé' });
//     }

//     // Créer le lien de réinitialisation du mot de passe (à personnaliser selon vos besoins)
//     const resetLink = `http://localhost:${PORT}/reset-password?email=${encodeURIComponent(email)}`;

//     // Options de l'e-mail
//     const mailOptions = {
//         from: process.env.EMAIL_USER, // Votre adresse email
//         to: email,
//         subject: 'Réinitialisation du mot de passe',
//         text: `Cliquez sur le lien suivant pour réinitialiser votre mot de passe : ${resetLink}`,
//     };

//     // Envoyer l'e-mail
//     transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//             console.log('Erreur d\'envoi :', error);
//             return res.status(500).json({ message: 'Erreur lors de l\'envoi de l\'email' });
//         }
//         console.log('E-mail envoyé :', info.response);
//         return res.json({ message: `Un lien de réinitialisation a été envoyé à ${email}` });
//     });
// });

// // Définir la route de login
// app.post('/api/login', (req, res) => {
//     const { email, password } = req.body;

//     // Charger la liste des utilisateurs
//     const users = loadUsers();

//     // Log de la tentative de connexion
//     console.log(`Tentative de connexion avec : ${email}, ${password}`);

//     // Vérifier si l'utilisateur existe
//     const user = users.find(user => user.email === email);

//     // Log si l'utilisateur a été trouvé
//     if (user) {
//         console.log(`Utilisateur trouvé : ${JSON.stringify(user)}`);
//     } else {
//         console.log('Aucun utilisateur trouvé avec cet email');
//     }

//     // Vérifier le mot de passe
//     if (user && user.password === password) {
//         return res.json({ message: 'Authentification réussie' });
//     }

//     res.status(401).json({ message: 'Identifiants invalides' });
// });

// // Lancer le serveur
// app.listen(PORT, () => {
//     console.log(`Serveur lancé sur le port ${PORT}`);
// });
