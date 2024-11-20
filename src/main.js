import { createApp } from 'vue'; // Import de la fonction principale pour créer l'app
import App from './App.vue'; // Import du composant principal de l'application
import router from './router'; // Import du routeur Vue
import 'bootstrap/dist/css/bootstrap.min.css'; // Import des styles Bootstrap
import '../src/assets/main.css'; // Import de votre fichier CSS principal

// Importation de FontAwesome SVG Core
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faEye, faEdit, faTrash, faPlusCircle, faSave } from '@fortawesome/free-solid-svg-icons'; // Import des icônes nécessaires
import '@fortawesome/fontawesome-svg-core/styles.css'; // Import des styles pour FontAwesome

// Ajouter les icônes à la bibliothèque FontAwesome
library.add(faEye, faEdit, faTrash, faPlusCircle, faSave);

// Importation de Vue I18n et des fichiers de traduction
import { createI18n } from 'vue-i18n';
import en from './locales/en'; // Traduction en anglais
import fr from './locales/fr'; // Traduction en français
import ar from './locales/ar'; // Traduction en arabe

// Importation et configuration de Pinia
import { createPinia } from 'pinia';

// Importation de Vue Toastification pour les toasts
import Toast, { POSITION } from 'vue-toastification';
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
app.use(pinia);

// Configuration du routeur et ajout à l'application
app.use(router);

// Configuration de i18n et ajout à l'application
app.use(i18n);

// Configuration de Vue Toastification et ajout à l'application
app.use(Toast, {
  position: POSITION.BOTTOM_RIGHT,
  timeout: 5000,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
});

// Enregistrement global du composant FontAwesomeIcon
app.component('font-awesome-icon', FontAwesomeIcon);

// Montée de l'application Vue
app.mount('#app');
