import axios from 'axios';

const state = {
  suggestions: [],
  loadingStatus: false
};

const getters = {
  allSuggestions: (state) => state.suggestions,
  loadingStatus: (state) => state.loadingStatus
};

const actions = {
  fetchSuggestions({ commit }) {
    commit('loadingStatus', true)
    axios
      .get("http://127.0.0.1:8000/api/suggestions")
      .then((response) => {
        commit('setSuggestions', response.data);
      })
      .catch((error) => {
        console.log(error);
        this._vm.$toast.error("Erreur lors du chargement des données");
      }).finally(() => {
        commit('loadingStatus', false)
      });
  },

  addSuggestion({ commit }, suggestion) {
    axios
      .post("http://127.0.0.1:8000/api/suggestions", {
        title: suggestion.title,
        description: suggestion.description
      })
      .then((response) => {
        response.data.my_suggestion = true;
        commit('newSuggestion', response.data);
        this._vm.$toast.success("Suggestion créée avec succès !");
      }).catch((error) => {
        console.log(error);
        this._vm.$toast.error("Erreur lors de la création de la suggestion");
      })
  },

  deleteSuggestion({ commit }, id) {
    axios.delete(`http://127.0.0.1:8000/api/suggestions/${id}`).then(() => {
      commit('deleteSuggestion', id)
      this._vm.$toast.success("Suggestion supprimée avec succès !");
    }).catch((error) => {
      console.log(error);
      this._vm.$toast.error("Erreur lors de la suppression de la suggestion");
    })
  },

  changeStateSuggestion({ commit }, { id, state }) {
    axios.put(`http://127.0.0.1:8000/api/suggestions/state/${id}`, {
      state
    }).then((response) => {
      console.log(response.data);
      commit('updateSuggestion', response.data)
      this._vm.$toast.success("Suggestion validée avec succès !");
    }).catch((error) => {
      this._vm.$toast.error("Erreur lors de la validation de la suggestion");
      console.log(error);
    })
  },

  updateSuggestion({ commit }, suggestion) {
    axios
      .put(`http://127.0.0.1:8000/api/suggestions/${suggestion.id}`, {
        title: suggestion.title,
        description: suggestion.description,
      }).then((response) => {
        commit('updateSuggestion', response.data)
        this._vm.$toast.success("Suggestion modifiée avec succès !");
      }).catch((error) => {
        this._vm.$toast.error("Erreur lors de la modification de la suggestion");
        console.log(error);
      })
  }
};

const mutations = {
  loadingStatus: (state, newLoadingStatus) => (state.loadingStatus = newLoadingStatus),
  setSuggestions: (state, suggestions) => (state.suggestions = suggestions),
  newSuggestion: (state, suggestion) => state.suggestions.unshift(suggestion),
  deleteSuggestion: (state, id) => state.suggestions = state.suggestions.filter(suggestion => suggestion.id !== id),
  updateSuggestion: (state, updSuggestion) => {
    const index = state.suggestions.findIndex(suggestion => suggestion.id === updSuggestion.id);
    if (index !== -1) {
      state.suggestions.splice(index, 1, updSuggestion);
    }
  }
};

export default {
  state,
  getters,
  actions,
  mutations
}