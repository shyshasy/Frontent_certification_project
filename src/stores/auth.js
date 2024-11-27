import { defineStore } from 'pinia';
import axios from 'axios'; 

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isAuthenticated: false,
  }),
  actions: {
    async login(email, password) {
      try {
        const response = await axios.post("http://localhost:5002/api/auth/login", { email, password });
        
        const token = response.data.accessToken;
        console.log ("Donnée d'utilisateur connecter récupéré :", response.data.user);
        localStorage.setItem("nomUtilisateurConnecter", response.data.user.name)
        localStorage.setItem("UserConnecter", response.data.user.id)
        
        localStorage.setItem("token", token); 
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`; 
        
        // Fetch user details after login (if the API provides it)
        this.user = response.data.user; // Supposons que les détails de l'utilisateur soient dans `response.data.user`
        this.isAuthenticated = true;

        // Ajoutez ici un console.log pour vérifier l'utilisateur connecté
        console.log("Utilisateur connecté :", this.user);

        return true;
      } catch (error) {
        console.error("Erreur de connexion :", error);
        return false;
      }
    },

    async register(userData) {
      try {
        const response = await axios.post('/api/register', userData);
        this.user = response.data.user; 
        this.isAuthenticated = true; 
        localStorage.setItem('token', response.data.token); 
        console.log("Nouvel utilisateur inscrit :", this.user);
      } catch (error) {
        console.error('Erreur d\'inscription:', error.response ? error.response.data : error);
        throw error; 
      }
    },

    async requestPasswordReset(email) {
      try {
        const response = await axios.post("http://localhost:5002/api/forget", { email });
        console.log("Réinitialisation demandée :", response.data);
        return true;
      } catch (error) {
        console.error("Erreur lors de la demande de réinitialisation :", error.response ? error.response.data : error);
        return false;
      }
    },

    async resetPassword(token, newPassword) {
      try {
        const response = await axios.post("http://localhost:5002/api/reset-password", { token, newPassword });
        console.log("Mot de passe réinitialisé avec succès :", response.data);
        return true;
      } catch (error) {
        console.error("Erreur lors de la réinitialisation du mot de passe :", error.response ? error.response.data : error);
        return false;
      }
    },
  },
});
