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
              " id="title" v-model="localSuggestion.title" type="text" placeholder="Titre..."
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
                border
                rounded
                w-full
                py-2
                px-3
                text-gray-700
                mb-3
                leading-tight
                focus:outline-none focus:shadow-outline
              " rows="5" id="description" v-model="localSuggestion.description" type="text"
        placeholder="description..." :class="descriptionError ? 'border-red-500' : ''" />
      <span class="text-red-500" v-show="descriptionError">Merci de renseigner une description</span>
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
  name: "FormSuggestion",
  props: {
    suggestion: Object,
  },
  data() {
    return {
      localSuggestion: this.suggestion,
      titleError: false,
      descriptionError: false,
    };
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();

      if (!this.localSuggestion.title) {
        this.titleError = true
        return
      } else {
        this.titleError = false
      }

      if (!this.localSuggestion.description) {
        this.descriptionError = true
        return
      }
      
      this.$emit("update-suggestion", this.localSuggestion);

    },
  },
  emits: [
    'update-suggestion'
  ]
}
</script>
