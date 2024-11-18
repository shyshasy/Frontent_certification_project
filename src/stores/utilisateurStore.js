import { defineStore } from 'pinia';
import axios from 'axios';
import { useAuthStore } from './auth';

export const useUserStore = defineStore('userStore', {
  state: () => ({
    utilisateurs: [],
    utilisateur: {
      nom: '',
      email: '',
      role: '',
      status: false,
    },
    notification: '',
  }),

  actions: {
    // Charger tous les utilisateurs
    async loadUserData() {
      const authStore = useAuthStore();
      const token = localStorage.getItem("token")
      console.log(token)
      try {
        const response = await axios.get('http://localhost:5002/api/utilisateurs', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.utilisateurs = response.data;
      } catch (error) {
        console.error('Erreur lors du chargement des utilisateurs :', error.message);
      }
    },

    // Ajouter un utilisateur
    async addUser(newUser) {
      const authStore = useAuthStore();
      try {
        const response = await axios.post(
          'http://localhost:5002/api/utilisateurs',
          newUser,
          {
            headers: {
              Authorization: `Bearer ${authStore.token}`,
            },
          }
        );
        if (response.status !== 200 && response.status !== 201) {
          throw new Error("L'ajout a échoué.");
        }
        this.loadUserData(); // Recharge la liste des utilisateurs
        this.showNotification('Utilisateur ajouté avec succès !');
      } catch (error) {
        console.error('Erreur lors de l\'ajout de l\'utilisateur :', error.message);
        this.showNotification('Erreur lors de l\'ajout de l\'utilisateur !');
      }
    },

    // Modifier un utilisateur
    async updateUser(id, updatedUser) {
      const authStore = useAuthStore();
      try {
        const response = await axios.put(
          `http://localhost:5002/api/utilisateurs/${id}`,
          updatedUser,
          {
            headers: {
              Authorization: `Bearer ${authStore.token}`,
            },
          }
        );
        if (response.status !== 200) {
          throw new Error('La mise à jour a échoué.');
        }
        this.loadUserData(); // Recharge la liste des utilisateurs
        this.showNotification('Utilisateur modifié avec succès !');
      } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'utilisateur :', error.message);
        this.showNotification('Erreur lors de la mise à jour de l\'utilisateur !');
      }
    },

    // Supprimer un utilisateur
    async removeUser(id) {
      const authStore = useAuthStore();
      try {
        await axios.delete(`http://localhost:5002/api/utilisateurs/${id}`, {
          headers: {
            Authorization: `Bearer ${authStore.token}`,
          },
        });
        this.loadUserData(); // Recharge la liste des utilisateurs
        this.showNotification('Utilisateur supprimé avec succès !');
      } catch (error) {
        console.error('Erreur lors de la suppression de l\'utilisateur :', error.message);
        this.showNotification('Erreur lors de la suppression de l\'utilisateur !');
      }
    },

    // Afficher une notification
    showNotification(message) {
      this.notification = message;
      setTimeout(() => {
        this.notification = ''; // Effacer la notification après 3 secondes
      }, 3000);
    },
  },

  persist: true, // Permet de persister le store (en localStorage ou sessionStorage)
});
