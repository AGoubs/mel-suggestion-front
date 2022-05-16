<template>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <tbody>
        <div v-for="suggestion in sortedSuggestions" :key="suggestion.id" class="pt-5">
          <Suggestion :suggestion="suggestion" />
          <hr class="mt-5" />
        </div>
      </tbody>
    </table>
  </div>
</template>

<script>
import Suggestion from "./Suggestion";
export default {
  name: "Suggestions",
  props: {
    suggestions: Array,
  },
  data() {
    return {
      sortBy: 'nb_votes',
      sortDirection: 'desc',
    }
  },
  mounted() {
    this.$root.$on('sort-suggestion', (e) => {
      this.sort(e)
    })
  },
  methods: {
    sort: function (s) {
      this.sortBy = s;
    }
  },
  computed: {
    sortedSuggestions: function () {
      return this.suggestions.slice(0).sort((p1, p2) => {
        let modifier = 1;
        if (this.sortDirection === 'desc') modifier = -1;
        if (p1[this.sortBy] < p2[this.sortBy]) return -1 * modifier; if (p1[this.sortBy] > p2[this.sortBy]) return 1 * modifier;
        return 0;
      });
    }
  },
  components: {
    Suggestion,
  },
};
</script>

<style>
</style>