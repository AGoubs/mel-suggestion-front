<template>
  <div>
   <div class="inline-flex">
      <button
        class="bg-white hover:bg-gray-100 text-slate-600 font-semibold py-2 px-3 border border-gray-300 rounded-l shadow"
        @click="sort('nb_votes')" v-bind:class="[sortBy === 'nb_votes' ? 'bg-gray-200' : '']">
        <i class="fas fa-star text-slate-400"></i> Top
      </button>
      <button
        class="bg-white hover:bg-gray-100 text-slate-600 font-semibold py-2 px-3 border border-gray-300 shadow"
        @click="sort('updated_at')" v-bind:class="[sortBy === 'updated_at' ? 'bg-gray-200' : '']">
        <i class="fas fa-clock text-slate-400"></i> Nouveau
      </button>
      <!-- <button
        class="bg-white hover:bg-gray-100 text-slate-600 font-semibold py-2 px-3 border border-gray-300 rounded-r shadow"
        @click="sort('coming')" v-bind:class="[sortBy === 'coming' ? 'bg-gray-200' : '']">
        <i class="fas fa-list-check text-slate-400 mr-1"></i> A venir
      </button> -->
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
  mounted() {
      this.$root.$on('sort-suggestion-active', (e) => {
        this.sortBy = e
      })
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