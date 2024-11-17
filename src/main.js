import { createApp } from 'vue'; // Import de la fonction principale pour créer l'app
import App from './App.vue'; // Import du composant principal de l'application
import router from './router'; // Import du routeur Vue
import 'bootstrap/dist/css/bootstrap.min.css'; // Import des styles Bootstrap
import 'font-awesome/css/font-awesome.css'; // Import des icônes Font Awesome
import '../src/assets/main.css'; // Import de votre fichier CSS principal

// Importation de Vue I18n et des fichiers de traduction
import { createI18n } from 'vue-i18n';
import en from './locales/en'; // Traduction en anglais
import fr from './locales/fr'; // Traduction en français
import ar from './locales/ar'; // Traduction en arabe

// Importation et configuration de Pinia
import { createPinia } from 'pinia';

// Importation de Vue Toastification pour les toasts
import Toast, { POSITION } from 'vue-toastification'; // Importer Toastification
import 'vue-toastification/dist/index.css'; // Importer les styles de Toastification

// Configuration des traductions
const messages = {
  en,
  fr,
  ar,
};

const i18n = createI18n({
  locale: 'fr', // Langue par défaut
  messages,
});

// Création de l'application Vue
const app = createApp(App);

// Configuration de Pinia et ajout à l'application
const pinia = createPinia();
app.use(pinia); // Utilisation de Pinia pour l'état global

// Configuration du routeur et ajout à l'application
app.use(router); // Utilisation du routeur

// Configuration de i18n et ajout à l'application
app.use(i18n); // Utilisation de vue-i18n pour la gestion des langues

// Configuration de Vue Toastification et ajout à l'application
app.use(Toast, {
  position: POSITION.BOTTOM_RIGHT, // Position des toasts
  timeout: 5000, // Durée d'affichage des toasts
  closeOnClick: true, // Fermer le toast lorsqu'on clique dessus
  pauseOnHover: true, // Pause sur hover
  draggable: true, // Permet de faire glisser le toast
});

// Montée de l'application Vue
app.mount('#app');
