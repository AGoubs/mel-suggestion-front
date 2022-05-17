<template>
  <div>

    <body class="flex items-center justify-center py-8">
      <div class="w-full max-w-4xl px-4">
        <Header title="Faire une suggestion" />
        <div class="border rounded-lg border pb-6 border-gray-300">
          <div class="flex items-center border-b border-gray-300 justify-between px-6 py-3">
            <SortingButton />
            <Search />
          </div>
          <div class="px-6">
            <section v-if="errored" class="flex justify-center my-3">
              <p>Une erreur s'est produite lors du chargement des données</p>
            </section>

            <section v-else>
              <div v-if="loading">
                <Preloader color="gray" />
              </div>

              <div v-else>
                <Suggestions @add-suggestion="addSuggestion" @delete-suggestion="deleteSuggestion"
                  @update-suggestion="updateSuggestion" :suggestions="suggestions" />
              </div>
            </section>
          </div>
        </div>
      </div>
    </body>
  </div>
</template>

<script>
import axios from "axios";

import Header from "./components/Header";
import SortingButton from "./components/SortingButton";
import Search from "./components/Search";
import Suggestions from "./components/Suggestions";
import Preloader from './components/Preloader.vue'

export default {
  name: "App",
  data() {
    return {
      suggestions: [],
      loading: true,
      errored: false
    };
  },
  mounted() {
    axios
      .get("http://127.0.0.1:8000/api/suggestions")
      .then((response) => {
        this.suggestions = response.data;
      })
      .catch(error => {
        console.log(error)
        this.errored = true
      })
      .finally(() => {
        this.loading = false
      })
  },
  methods: {
    addSuggestion(newSuggestion) {
      axios.post("http://127.0.0.1:8000/api/suggestions", {
        title: newSuggestion.title,
        description: newSuggestion.description,
        user_email: 'Arnaud@goubier.fr',
        state: 'validate'
      }).then((response) => {
        response.data.my_vote = true;
        this.suggestions = [...this.suggestions, response.data]
      })
    },
    deleteSuggestion(id) {
      let idx = this.suggestions.indexOf(id)
      this.suggestions.splice(idx, 1)
      axios.delete(`http://127.0.0.1:8000/api/suggestions/${id}`).catch((error) => {
        console.log(error);
      })
    },
    updateSuggestion(suggestion) {
      axios.put(`http://127.0.0.1:8000/api/suggestions/${suggestion.id}`, {
        title: suggestion.title,
        description: suggestion.description,
      }).catch((error) => {
        console.log(error);
      })
    }
  },
  components: {
    Header,
    SortingButton,
    Search,
    Suggestions,
    Preloader
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
