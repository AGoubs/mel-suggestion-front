<template>
  <div>
    <span
      class="
        z-10
        h-full
        leading-snug
        font-normal
        absolute
        text-center text-slate-300
        absolute
        bg-transparent
        rounded
        text-base
        items-center
        justify-center
        w-8
        pl-3
        py-2
      "
    >
      <i class="fas fa-magnifying-glass"></i>
    </span>
    <input
      v-model="search"
      type="text"
      placeholder="Rechercher"
      class="
        px-3
        py-2
        placeholder-slate-300
        text-slate-600
        relative
        bg-white bg-white
        rounded
        text-sm
        border border-slate-300
        outline-none
        focus:outline-none focus:ring
        pl-10
      "
    />
    <ModalSuggestion @add-suggestion="addSuggestion" :titleprops=search />
  </div>
</template>

<script>
import ModalSuggestion from "./ModalSuggestion";
export default {
  name: "Search",
  data() {
    return {
      search: "",
    };
  },
  methods: {
    addSuggestion(newSuggestion) {
      this.$emit('add-suggestion', newSuggestion);
    }
  },
  components: {
    ModalSuggestion,
  },
};
</script>

<style>
</style>