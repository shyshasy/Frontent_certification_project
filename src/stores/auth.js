import { defineStore } from 'pinia';
import axios from 'axios'; // Assurez-vous d'avoir installé axios

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isAuthenticated: false,
  }),
  actions: {
    // Méthode pour se connecter
    login(user) {
      this.user = user;
      this.isAuthenticated = true;
      localStorage.setItem('token', user.token);
    },
    // Méthode pour se déconnecter
    logout() {
      this.user = null;
      this.isAuthenticated = false;
      localStorage.removeItem('token');
    },
    // Méthode pour s'inscrire
    async register(userData) {
      try {
        const response = await axios.post('/api/register', userData);
        this.user = response.data.user; // En supposant que la réponse contient l'utilisateur
        this.isAuthenticated = true; // Vous pouvez définir l'utilisateur comme authentifié
        localStorage.setItem('token', response.data.token); // Stockez le token si disponible
      } catch (error) {
        console.error('Erreur d\'inscription:', error.response ? error.response.data : error);
        throw error; // Propager l'erreur pour la gérer dans le composant
      }
    },
  },
});
