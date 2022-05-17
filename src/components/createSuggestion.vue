<template>
  <form @submit="onSubmit" class="px-8 pt-6 pb-8 mb-4">
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="title">
        Titre
      </label>
      <input class="
                shadow
                appearance-none
                border
                rounded
                w-full
                py-2
                px-3
                text-gray-700
                leading-tight
                focus:outline-none focus:shadow-outline
              " id="title" v-model="title" type="text" placeholder="Titre..."
        :class="titleError ? 'border-red-500' : ''" />
      <span class="text-red-500" v-show="titleError">Merci de renseigner un titre</span>
    </div>
    <div class="mb-6">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
        Description
      </label>
      <textarea class="
                shadow
                appearance-none
                rounded
                w-full
                py-2
                px-3
                text-gray-700
                mb-3
                leading-tight
                focus:outline-none focus:shadow-outline
              " rows="5" id="description" v-model="description" type="text" placeholder="description..." />
    </div>
    <div class="flex items-center justify-between">
      <button class="
                bg-blue-500
                hover:bg-blue-700
                text-white
                font-bold
                py-2
                px-4
                rounded
                focus:outline-none focus:shadow-outline
              " type="submit">
        Valider
      </button>
    </div>
  </form>
</template>

<script>
export default {
  name: "CreateSuggestion",
  props: ["titleprops"],
  data() {
    return {
      title: this.titleprops,
      titleError: false,
      description: "",
    };
  },
  watch: {
    titleprops(newVal) {
      this.title = newVal;
    },
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();

      if (!this.title) {
        this.titleError = true
        return
      }

      const newSuggestion = {
        title: this.title,
        description: this.description,
        nb_votes: 0
      };

      this.title = "";
      this.description = "";

      this.$emit("add-suggestion", newSuggestion);
    },
  },
  emits: ['add-suggestion']
};
</script>

<style>
</style>