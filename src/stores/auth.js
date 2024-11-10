import { defineStore } from 'pinia';
import axios from 'axios'; 
export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isAuthenticated: false,
  }),
  actions: {
  
    login(user) {
      this.user = user;
      this.isAuthenticated = true;
      localStorage.setItem('token', user.token);
    },
  
    logout() {
      this.user = null;
      this.isAuthenticated = false;
      localStorage.removeItem('token');
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
  },
});
