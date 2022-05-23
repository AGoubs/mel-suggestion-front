<template>
  <div class="relative overflow-x-auto">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <tbody>
        <div v-for="suggestion in sortedSuggestions" :key="suggestion.id">
          <Suggestion @delete-suggestion="deleteSuggestion" @validate-suggestion="validateSuggestion" @update-suggestion="updateSuggestion"
            :suggestion="suggestion" />
          <hr />
        </div>
      </tbody>
    </table>

    <div v-if="search.length >= 3 || !filteredList.length">
      <div class="flex justify-center">
        <p v-show="!filteredList.length" class="my-3">Aucun résultat</p>
      </div>
      <div class="flex justify-center">
        <button @click="showCreateSuggestion"
          class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 mt-2 ">Créer
          une suggestion</button>
      </div>
      <div v-show="create">
        <CreateSuggestion @add-suggestion="addSuggestion" :titleprops=search />
      </div>
    </div>
  </div>
</template>

<script>
import Suggestion from "./Suggestion";
import CreateSuggestion from "./createSuggestion";
export default {
  name: "Suggestions",
  props: {
    suggestions: Array,
  },
  data() {
    return {
      create: '',
      search: '',
      sortBy: 'nb_votes',
      sortDirection: 'desc',
      localSuggestions: this.suggestions,
    }
  },
  mounted() {
    this.$root.$on('sort-suggestion', (e) => {
      this.sort(e)
    }),
      this.$root.$on('search', (e) => {
        this.searchValue(e)
      }),
      this.$root.$on('reset-search', () => {
        this.resetSearch()
      })
  },
  watch: {
    suggestions: {
      handler(newValue) {
        this.localSuggestions = newValue;
      },
      deep: true
    }
  },
  methods: {
    sort(s) {
      this.sortBy = s;
    },
    searchValue(s) {
      this.search = s;
    },
    addSuggestion(newSuggestion) {
      this.resetSearch()
      this.sortBy = 'updated_at'
      this.$root.$emit('sort-suggestion-active', this.sortBy)
      this.$emit('add-suggestion', newSuggestion);
    },
    deleteSuggestion(id) {
      this.$emit('delete-suggestion', id);
    },
    validateSuggestion(suggestion) {
      this.$emit("validate-suggestion", suggestion);
    },
    updateSuggestion(suggestion) {
      this.$emit('update-suggestion', suggestion);
    },
    showCreateSuggestion() {
      this.create = !this.create
    },
    resetSearch() {
      this.search = "";
      this.$root.$emit('reset-search-text');
    }
  },
  computed: {
    sortedSuggestions() {
      return this.filteredList.slice(0).sort((p1, p2) => {
        let modifier = 1;
        if (this.sortDirection === 'desc') modifier = -1;
        if (p1[this.sortBy] < p2[this.sortBy]) return -1 * modifier; if (p1[this.sortBy] > p2[this.sortBy]) return 1 * modifier;
        return 0;
      });
    },
    filteredList() {
      return this.localSuggestions.slice(0).filter(suggestion => {
        return suggestion.title.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  },
  components: {
    Suggestion,
    CreateSuggestion
  },
};
</script>

<style>
</style>