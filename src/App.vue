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
  color: #333; /* Couleur du texte */
  background-color: #ffffff; /* Fond blanc pour une sensation d'espace */
  min-height: 100vh; /* Remplir tout l'écran */
  display: flex;
  flex-direction: column; /* Alignement vertical */
  align-items: center; /* Centrage horizontal */
  padding: 20px; /* Espacement autour de l'application */
}

.container {
  width: 100%; /* La largeur prend toute l'écran */
  background: #f8f9fa; /* Fond léger */
  padding: 20px; /* Espacement interne */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Ombre légère pour profondeur */
}

.language-selector-container {
  margin-bottom: 20px; /* Espacement sous le sélecteur de langue */
}

.language-selector {
  padding: 10px;
  font-size: 16px;
  border: 2px solid #007bff; /* Couleur vive pour le contour */
  background-color: #ffffff; /* Fond blanc */
  color: #333; /* Couleur du texte */
  transition: border-color 0.3s; /* Transition douce pour le contour */
}

.language-selector:hover {
  border-color: #0056b3; /* Changement de couleur au survol */
}

.language-selector:focus {
  outline: none; /* Retire le contour par défaut */
  border-color: #0056b3; /* Couleur de contour lors de la mise au point */
}

.container {
  width: 100%; /* La largeur prend toute l'écran */
  background: #f8f9fa; /* Fond léger */
  border-radius: 10px; /* Coins arrondis pour un effet doux */
  padding: 20px; /* Espacement interne */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Ombre légère pour profondeur */
}

.language-selector-container {
  margin-bottom: 20px; /* Espacement sous le sélecteur de langue */
}

.language-selector {
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 2px solid #007bff; /* Couleur vive pour le contour */
  background-color: #ffffff; /* Fond blanc */
  color: #333; /* Couleur du texte */
  transition: border-color 0.3s; /* Transition douce pour le contour */
}

.language-selector:hover {
  border-color: #0056b3; /* Changement de couleur au survol */
}

.language-selector:focus {
  outline: none; /* Retire le contour par défaut */
  border-color: #0056b3; /* Couleur de contour lors de la mise au point */
}

#app {
  font-family: 'Arial', sans-serif; /* Police simple et moderne */
  text-align: center;
  color: #333; /* Couleur du texte */
  background-color: #ffffff; /* Fond blanc pour une sensation d'espace */
  min-height: 100vh; /* Remplir tout l'écran */
  display: flex;
  flex-direction: column; /* Alignement vertical */
  align-items: center; /* Centrage horizontal */
  padding: 20px; /* Espacement autour de l'application */
}

.container {
  width: 100%;
  max-width: 800px; /* Largeur maximale pour un design propre */
  background: #f8f9fa; /* Fond léger */
  border-radius: 10px; /* Coins arrondis pour un effet doux */
  padding: 20px; /* Espacement interne */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Ombre légère pour profondeur */
}

.language-selector-container {
  margin-bottom: 20px; /* Espacement sous le sélecteur de langue */
}

.language-selector {
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 2px solid #007bff; /* Couleur vive pour le contour */
  background-color: #ffffff; /* Fond blanc */
  color: #333; /* Couleur du texte */
  transition: border-color 0.3s; /* Transition douce pour le contour */
}

.language-selector:hover {
  border-color: #0056b3; /* Changement de couleur au survol */
}

.language-selector:focus {
  outline: none; /* Retire le contour par défaut */
  border-color: #0056b3; /* Couleur de contour lors de la mise au point */
}
</style>
