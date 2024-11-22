import { defineStore } from 'pinia';
import axios from 'axios'; 
export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isAuthenticated: false,
  }),
  actions: {
  
    // login(user) {
    //   this.user = user;
    //   this.isAuthenticated = true;
    //   localStorage.setItem('token', user.token);
    // },
  
    // logout() {
    //   this.user = null;
    //   this.isAuthenticated = false;
    //   localStorage.removeItem('token');
    // },
    async login(email, password) {
      try {
        const response = await axios.post("http://localhost:5002/api/auth/login", { email, password });
        
        const token = response.data.accessToken;
        console.log ("TOKEEEEEEEEEEEEEEEEE",token)
        localStorage.setItem("token", token); 
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`; 
        // await this.fetchUserName();
        // await this.fetchRole();
        
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
      } catch (error) {
        console.error('Erreur d\'inscription:', error.response ? error.response.data : error);
        throw error; 
      }
    },
    async requestPasswordReset(email) {
      try {
        const response = await axios.post("http://localhost:5002/api/forget", { email });
        console.log("Réinitialisation demandée :", response.data);
        return true; // Retourne true si la demande de réinitialisation est réussie
      } catch (error) {
        console.error("Erreur lors de la demande de réinitialisation :", error.response ? error.response.data : error);
        return false;
      }
    },

    async resetPassword(token, newPassword) {
      try {
        const response = await axios.post("http://localhost:5002/api/reset-password", { token, newPassword });
        console.log("Mot de passe réinitialisé avec succès :", response.data);
        return true; // Retourne true si la réinitialisation est réussie
      } catch (error) {
        console.error("Erreur lors de la réinitialisation du mot de passe :", error.response ? error.response.data : error);
        return false;
      }
    },
  },
});
