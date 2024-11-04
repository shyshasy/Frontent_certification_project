import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',  // Utilisez 'gmail' pour envoyer via Gmail
  auth: {
    user: 'shyshasy@gmail.com', // Votre adresse Gmail
    pass: '14801781' // Le mot de passe d'application généré
  }
});

export const sendResetEmail = (to, link) => {
  const mailOptions = {
    from: 'shyshasy@gmail.com',
    to: to,
    subject: 'Réinitialisation de votre mot de passe',
    text: `Cliquez sur ce lien pour réinitialiser votre mot de passe : ${link}`
  };

  return transporter.sendMail(mailOptions);
};
