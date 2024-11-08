import 'emoji-picker-element';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import 'bootstrap/dist/css/bootstrap.min.css'; // Styles Bootstrap
import 'font-awesome/css/font-awesome.css'; // Styles Font Awesome
import '../src/assets/main.css'



// Importer vue-i18n et les fichiers de traduction
import { createI18n } from 'vue-i18n';
import en from './locales/en'; // Importer le fichier de traduction en anglais
import fr from './locales/fr'; // Importer le fichier de traduction en français
import ar from './locales/ar'; // Importer le fichier de traduction en arabe

// Importer et configurer Pinia
import { createPinia } from 'pinia';


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

// Création de l'application Vue et ajout de Pinia, i18n et du routeur
const app = createApp(App);

const pinia = createPinia(); // Créer une instance de Pinia
app.use(pinia); // Ajouter Pinia à l'application
app.use(router); // Ajouter le routeur
app.use(i18n); // Ajouter i18n à l'application

app.mount('#app'); // Monter l'application
