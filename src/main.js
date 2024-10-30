import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import 'bootstrap/dist/css/bootstrap.min.css'; // Styles Bootstrap
import 'font-awesome/css/font-awesome.css'; // Styles Font Awesome

// Importer vue-i18n et les fichiers de traduction
import { createI18n } from 'vue-i18n';
import en from './locales/en'; // Importer le fichier de traduction en anglais
import fr from './locales/fr'; // Importer le fichier de traduction en français
import ar from './locales/ar'; // Importer le fichier de traduction en arabe

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

// Création de l'application Vue et ajout de i18n et du routeur
createApp(App)
  .use(router)
  .use(i18n) // Ajouter i18n à l'application
  .mount('#app');
