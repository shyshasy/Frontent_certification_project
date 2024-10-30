<template>
  <div id="app">
    <Header @language-changed="changeLanguage" />
    <div class="container">
      <div class="language-selector-container">
        <select @change="changeLanguage($event.target.value)" class="language-selector">
          <option value="fr">Français</option>
          <option value="en">English</option>
          <option value="ar">العربية</option>
        </select>
      </div>
      <router-view />
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from './components/Layout/Header.vue';
import Footer from './components/Layout/Footer.vue';

export default {
  components: {
    Header,
    Footer,
  },
  methods: {
    changeLanguage(lang) {
      this.$i18n.locale = lang; // Change la langue dans vue-i18n
    },
  },
};
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

#app {
  font-family: 'Arial', sans-serif; /* Police simple et moderne */
  text-align: center;
  color: #444; /* Couleur du texte plus douce */
  background-color: #f7f7f7; /* Fond gris clair pour une sensation d'espace */
  min-height: 100vh; /* Remplir tout l'écran */
  display: flex;
  flex-direction: column; /* Alignement vertical */
  align-items: center; /* Centrage horizontal */
  padding: 20px 15px; /* Espacement autour de l'application avec padding latéral */
}

.container {
  width: 100%;
  max-width: 600px; /* Largeur maximale ajustée pour un design plus étroit */
  background: #ffffff; /* Fond blanc pour un contraste agréable */
  border-radius: 10px; /* Coins arrondis pour un effet doux */
  padding: 20px; /* Espacement interne */
  
  /* Bordure avec dégradé et épaisseur augmentée */
  border: 12px solid; /* Épaisseur de la bordure augmentée */
  border-image: linear-gradient(45deg, #ffffff, #007bff) 1; /* Dégradé vif du blanc au bleu */

  /* Ombre légère */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); /* Ombre réduite pour une apparence plus douce */
  margin: 20px auto; /* Marge auto pour centrer le conteneur */
}

.language-selector-container {
  margin: 40px 0 20px; /* Espacement supérieur augmenté pour séparer de la navbar */
}

.language-selector {
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 2px solid #007bff; /* Couleur vive pour le contour */
  background-color: #f0f8ff; /* Fond légèrement coloré */
  color: #333; /* Couleur du texte */
  transition: border-color 0.3s, background-color 0.3s; /* Transition douce pour le contour et le fond */
}

/* Suppression de l'effet de survol */
.language-selector:hover {
  border-color: #007bff; /* Conserve la couleur au survol */
  background-color: #f0f8ff; /* Conserve la nuance de fond au survol */
}

.language-selector:focus {
  outline: none; /* Retire le contour par défaut */
  border-color: #0056b3; /* Couleur de contour lors de la mise au point */
}
</style>
