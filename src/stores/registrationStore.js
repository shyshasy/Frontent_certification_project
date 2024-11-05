// src/store.js
import { createStore } from 'vuex';

const store = createStore({
  state: {
    users: JSON.parse(localStorage.getItem('users')) || [],
    errorMessage: '',
    successMessage: '',
    isLoading: false,
  },
  mutations: {
    SET_USERS(state, users) {
      state.users = users;
      localStorage.setItem('users', JSON.stringify(users));
    },
    SET_ERROR_MESSAGE(state, message) {
      state.errorMessage = message;
    },
    SET_SUCCESS_MESSAGE(state, message) {
      state.successMessage = message;
    },
    SET_LOADING(state, loading) {
      state.isLoading = loading;
    },
  },
  actions: {
    register({ commit, state }, userData) {
      commit('SET_LOADING', true);
      commit('SET_ERROR_MESSAGE', '');
      commit('SET_SUCCESS_MESSAGE', '');

      // Vérifier si l'utilisateur existe déjà
      const userExists = state.users.find(user => user.email === userData.email);

      if (userExists) {
        commit('SET_ERROR_MESSAGE', 'Cet email est déjà utilisé.');
        commit('SET_LOADING', false);
        return;
      }

      // Créer un nouvel utilisateur
      const newUser = {
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        password: userData.password,
      };

      // Ajouter le nouvel utilisateur à la liste des utilisateurs
      const updatedUsers = [...state.users, newUser];
      commit('SET_USERS', updatedUsers);

      commit('SET_SUCCESS_MESSAGE', 'Inscription réussie ! Vous pouvez maintenant vous connecter.');

      // Masquer l'indicateur de chargement après un délai
      setTimeout(() => {
        commit('SET_LOADING', false);
      }, 2000); // Délai avant la redirection
    },
  },
  getters: {
    getErrorMessage: state => state.errorMessage,
    getSuccessMessage: state => state.successMessage,
    isLoading: state => state.isLoading,
  },
});

export default store;
