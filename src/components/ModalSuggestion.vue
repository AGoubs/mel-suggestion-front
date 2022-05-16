<template>
  <div>
    <button
      @click="show"
      class="
        bg-transparent
        hover:bg-blue-500
        text-blue-700
        font-semibold
        hover:text-white
        py-2
        px-4
        border border-blue-500
        hover:border-transparent
        rounded
      "
    >
      Ajouter
    </button>
    <modal name="modal-suggestion" :width="600" :height="400" :adaptive="true">
      <div class="w-full">
        <form @submit="onSubmit" class="px-8 pt-6 pb-8 mb-4">
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="title"
            >
              Titre
            </label>
            <input
              class="
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
              "
              id="title"
              v-model="title"
              type="text"
              placeholder="Titre..."
            />
          </div>
          <div class="mb-6">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="password"
            >
              Description
            </label>
            <textarea
              class="
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
              "
              rows="5"
              id="description"
              v-model="description"
              type="text"
              placeholder="description..."
            />
          </div>
          <div class="flex items-center justify-between">
            <button
              class="
                bg-blue-500
                hover:bg-blue-700
                text-white
                font-bold
                py-2
                px-4
                rounded
                focus:outline-none focus:shadow-outline
              "
              type="submit"
            >
              Valider
            </button>
          </div>
        </form>
      </div>
    </modal>
  </div>
</template>

<script>
export default {
  name: "ModalSuggestion",
  props: ["titleprops"],
  data() {
    return {
      title: this.titleprops,
      description: "",
    };
  },
  watch: {
    titleprops(newVal) {
      this.title = newVal;
    },
  },
  methods: {
    show() {
      this.$modal.show("modal-suggestion");
    },
    hide() {
      this.$modal.hide("modal-suggestion");
    },
    onSubmit(e) {
      e.preventDefault();

      if (!this.title) {
        alert("Merci de rentrer un titre");
      }

      const newSuggestion = {
        title: this.title,
        description: this.description,
        nb_votes: 0
      };

      this.title = "";
      this.description = "";

      this.$emit("add-suggestion", newSuggestion);

      this.hide()
    },
  },
  emits: ['add-suggestion']
};
</script>

<style>
</style>