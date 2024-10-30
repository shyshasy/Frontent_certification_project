import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { createI18n } from 'vue-i18n';
import en from '../../src/locales/en';
import fr from '../../src/locales/fr';
import ar from '../../src/locales/ar';

// Configuration des messages de traduction
const messages = {
  en,
  fr,
  ar,
};

// Création de l'instance i18n
const i18n = createI18n({
  locale: 'fr', // Langue par défaut
  messages,
});

// Création de l'application Vue
const app = createApp(App);

// Utilisation de l'i18n dans l'application
app.use(i18n);

// Montée de l'application
app.mount('#app');
