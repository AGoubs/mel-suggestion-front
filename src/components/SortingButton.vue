<template>
  <div>
    <div class="inline-flex">
      <button
        class="bg-white hover:bg-gray-100 text-slate-600 font-semibold py-2 px-3 border border-gray-100 rounded-l shadow"
      >
        <i class="fas fa-star text-slate-400"></i> Top
      </button>
      <button
        class="bg-white hover:bg-gray-100 text-slate-600 font-semibold py-2 px-3 border border-gray-100 rounded-r shadow"
      >
        <i class="fas fa-clock text-slate-400"></i> Nouveau
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "SortingButton",
};
</script>

<style>
</style>