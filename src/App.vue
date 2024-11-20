<template>
  <div id="app">
    <Header @language-changed="changeLanguage" />
    <div class="container">
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

};
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

#app {
  font-family: 'Arial', sans-serif;
  text-align: center;
  color: #333;
  background-color: #ffffff;
  /* min-height: 100vh; */
  /* display: flex; */
  flex-direction: column;
  align-items: center;
  justify-content: flex-start; /* Alignement vertical, au-dessus */
  padding: 20px;
  padding-top: 40px;
}

.language-selector-container {
  margin-bottom: 20px;
}

.language-selector {
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 2px solid #007bff;
  background-color: #ffffff;
  color: #333;
  transition: border-color 0.3s;
  width: 100%; /* Si tu veux que le sélecteur prenne toute la largeur */
}

.language-selector:hover {
  border-color: #0056b3;
}

.language-selector:focus {
  outline: none;
  border-color: #0056b3;
}

.container {
  width: 90%; /* 90% de la largeur de l'écran */
  max-width: 1200px;
  background: #f8f9fa;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
}

</style>
