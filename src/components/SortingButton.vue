<template>
  <div>
    <div class="inline-flex">
      <button
        class="bg-white hover:bg-gray-300 text-slate-600 font-semibold py-2 px-3 border border-gray-300 rounded-l shadow"
        @click="sortSuggestion('top')"
      >
        <i class="fas fa-star text-slate-400"></i> Top
      </button>
      <button
        class="bg-white hover:bg-gray-300 text-slate-600 font-semibold py-2 px-3 border border-gray-300 rounded-r shadow"
        @click="sortSuggestion('new')"
      >
        <i class="fas fa-clock text-slate-400"></i> Nouveau
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "SortingButton",
  methods: {
    sortSuggestion(sorting)
    {
      this.$emit('sort-suggestion', sorting)
    }
  }
};
</script>

<style>
</style>