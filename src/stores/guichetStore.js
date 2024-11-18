import { useGuichetStore } from './stores/guichetStore';  // Importez le store

eexport default {
    state: {
      guichets: [],
    },
    mutations: {
      SET_GUICHETS(state, guichets) {
        state.guichets = guichets;
      },
      ADD_GUICHET(state, guichet) {
        state.guichets.push(guichet);
      },
      EDIT_GUICHET(state, updatedGuichet) {
        const index = state.guichets.findIndex(guichet => guichet.id === updatedGuichet.id);
        if (index !== -1) {
          state.guichets.splice(index, 1, updatedGuichet);
        }
      },
      DELETE_GUICHET(state, id) {
        state.guichets = state.guichets.filter(guichet => guichet.id !== id);
      },
    },
    actions: {
      async fetchGuichets({ commit }) {
        const response = await axios.get('http://localhost:5002/api/guichets');
        commit('SET_GUICHETS', response.data);
      },
      async addGuichet({ commit }, formData) {
        const response = await axios.post('http://localhost:5002/api/guichets', formData);
        commit('ADD_GUICHET', response.data);
      },
      async editGuichet({ commit }, { id, updatedData }) {
        const response = await axios.put(`http://localhost:5002/api/guichets/${id}`, updatedData);
        commit('EDIT_GUICHET', response.data);
      },
      async deleteGuichet({ commit }, id) {
        await axios.delete(`http://localhost:5002/api/guichets/${id}`);
        commit('DELETE_GUICHET', id);
      },
    },
  };
  