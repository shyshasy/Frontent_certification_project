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
        const response = await axios.post("http://localhost:5002/api/login", { email, pass_word: password });
        
        const token = response.data.token;
        
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
  },
});
