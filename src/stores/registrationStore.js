import { createStore } from 'vuex';

export const registrationStore = createStore({
  state: {
    users: JSON.parse(localStorage.getItem('users')) || [],
    isLoading: false,
    errorMessage: '',
    successMessage: '',
  },
  mutations: {
    ADD_USER(state, newUser) {
      state.users.push(newUser);
      localStorage.setItem('users', JSON.stringify(state.users));
    },
    SET_LOADING(state, isLoading) {
      state.isLoading = isLoading;
    },
    SET_ERROR_MESSAGE(state, message) {
      state.errorMessage = message;
    },
    SET_SUCCESS_MESSAGE(state, message) {
      state.successMessage = message;
    },
  },
  actions: {
    registerUser({ commit, state }, newUser) {
      commit('SET_LOADING', true);
      const userExists = state.users.find(user => user.email === newUser.email);

      if (userExists) {
        commit('SET_ERROR_MESSAGE', 'Cet email est déjà utilisé.');
        commit('SET_LOADING', false);
        return;
      }

      commit('ADD_USER', newUser);
      commit('SET_SUCCESS_MESSAGE', 'Inscription réussie ! Vous pouvez maintenant vous connecter.');
      commit('SET_LOADING', false);
    },
  },
  getters: {
    users: state => state.users,
    isLoading: state => state.isLoading,
    errorMessage: state => state.errorMessage,
    successMessage: state => state.successMessage,
  },
});
