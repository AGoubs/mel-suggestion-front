<template>
<div>
  <body class="flex items-center justify-center py-8">
    <div class="w-full max-w-4xl px-4">
      <Header title="Faire une suggestion" />
      <div class="border rounded-lg border pb-6 border-gray-200">
        <div class="flex items-center border-b border-gray-200 justify-between px-6 py-3">
          <SortingButton />
          <Search @add-suggestion="addSuggestion"/>
        </div>
        <div class="px-6 overflow-x-auto">
          <Suggestions :suggestions="suggestions" />
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

export default {
  name: "App",
  data() {
    return {
      suggestions: [],
    };
  },
  components: {
    Header,
    SortingButton,
    Search,
    Suggestions,
  },
   mounted() {
    axios.get("api/suggestions")
      .then((response) => {
        this.suggestions = response.data;
      })
      .catch();
  },
  methods: {
    addSuggestion(newSuggestion) {
      console.log(newSuggestion);
      axios.post("api/suggestions", {
        title: newSuggestion.title,
        description: newSuggestion.description,
        user_email: 'Arnaud@goubier.fr',
        state: 'validate'
      })
      this.suggestions = [...this.suggestions, newSuggestion]
    }
  }
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
