<template>
  <div>
    <h1 v-if="$moderator">Modérateur</h1>

    <body class="flex items-center justify-center py-8">
      <div class="w-full max-w-4xl px-4">
        <Header title="Faire une suggestion" />
        <div class="border rounded-lg border pb-6 border-gray-300">
          <div class="flex items-center border-b border-gray-300 justify-between px-6 py-3">
            <SortingButton />
            <Search />
          </div>
          <div>
            <section v-if="errored" class="flex justify-center my-3">
              <p>Une erreur s'est produite lors du chargement des données</p>
            </section>
            <section v-else>
              <div v-if="loading">
                <Preloader color="gray" />
              </div>

              <div v-else>
                <Suggestions @add-suggestion="addSuggestion" @delete-suggestion="deleteSuggestion"
                  @validate-suggestion="validateSuggestion" @update-suggestion="updateSuggestion"
                  :suggestions="suggestions" />
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
    this.getAllSuggestions();
  },
  methods: {
    getAllSuggestions() {
      axios
        .get("http://127.0.0.1:8000/api/suggestions")
        .then((response) => {
          this.suggestions = response.data;
        })
        .catch(error => {
          console.log(error)
          this.$toast.error("Erreur lors du chargement des données");
          this.errored = true
        })
        .finally(() => {
          this.loading = false
        })
    },
    addSuggestion(newSuggestion) {
      axios.post("http://127.0.0.1:8000/api/suggestions", {
        title: newSuggestion.title,
        description: newSuggestion.description
      }).then((response) => {
        response.data.my_suggestion = true;
        this.suggestions = [...this.suggestions, response.data]
        this.$toast.success("Suggestion créée avec succès !");
      }).catch((error) => {
        this.$toast.error("Erreur lors de la création de la suggestion");
        console.log(error);
      })
    },
    deleteSuggestion(id) {
      let pos = this.suggestions.map(function (e) { return e.id; }).indexOf(id);
      this.suggestions.splice(pos, 1)
      axios.delete(`http://127.0.0.1:8000/api/suggestions/${id}`).then(() => {
        this.$toast.success("Suggestion supprimée avec succès !");
      }).catch((error) => {
        this.$toast.error("Erreur lors de la suppression de la suggestion");
        console.log(error);
      })
    },
    validateSuggestion(id) {
      axios.put(`http://127.0.0.1:8000/api/suggestions/state/${id}`, {
        state: 'validate'
      }).then(() => {
        this.$toast.success("Suggestion validée avec succès !");
      }).catch((error) => {
        this.$toast.error("Erreur lors de la validation de la suggestion");
        console.log(error);
      })
    },
    updateSuggestion(suggestion) {
      axios.put(`http://127.0.0.1:8000/api/suggestions/${suggestion.id}`, {
        title: suggestion.title,
        description: suggestion.description,
      }).then(() => {
        this.$toast.success("Suggestion modifiée avec succès !");
      }).catch((error) => {
        this.$toast.error("Erreur lors de la modification de la suggestion");
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
