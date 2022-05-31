import axios from 'axios';

const state = {
  text: [],
};

const getters = {
  allText: (state) => state.text,
};

const actions = {
  fetchText({ commit }) {
    commit('loadingStatus', true)
    axios
      .get("http://127.0.0.1:8000/api/text")
      .then((response) => {
        commit('setText', response.data);
      })
      .catch((error) => {
        console.log(error);
        this._vm.$toast.error("Erreur lors du chargement des données");
      });
  }
};

const mutations = {
  setText: (state, text) => (state.text = text),

};

export default {
  state,
  getters,
  actions,
  mutations
}