<template>
  <div>
   <div class="inline-flex">
      <button
        class="bg-white hover:bg-gray-200 text-slate-600 font-semibold py-2 px-3 border border-gray-300 rounded-l shadow"
        @click="sort('nb_votes')" v-bind:class="[sortBy === 'nb_votes' ? 'bg-gray-300' : '']">
        <i class="fas fa-star text-slate-400"></i> Top
      </button>
      <button
        class="bg-white hover:bg-gray-200 text-slate-600 font-semibold py-2 px-3 border border-gray-300 rounded-r shadow"
        @click="sort('updated_at')" v-bind:class="[sortBy === 'updated_at' ? 'bg-gray-300' : '']">
        <i class="fas fa-clock text-slate-400"></i> Nouveau
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "SortingButton",
   data() {
    return {
      sortBy: 'nb_votes',
      sortDirection: 'desc',
    }
  },
  methods: {
    sort(sorting)
    {
      this.sortBy = sorting;
      this.$root.$emit('sort-suggestion', sorting)
    }
  }
};
</script>

<style>
</style>