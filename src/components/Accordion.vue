<template>
  <div>
    <div class="tab__header">
      <a href="#" class="tab__link pb-2 block bg-blue-dark text-gray-600 flex justify-center">
        <span v-show="!active"><i class="fa-solid fa-chevron-down"></i></span>
        <span class="up-Arrow" v-show="active"><i class="fa-solid fa-chevron-up"></i></span>
      </a>
    </div>
    <div class="tab__content p-2" v-show="active">
      <div class="ql-snow" v-if="active">
        <div class="ql-editor">
          <div v-html="suggestion.description"></div>
        </div>
      </div>
      <div id="moderator_commands" v-if="$moderator">
        <hr class="mb-2">
        Suggestion ajoutée par : <a :href="`mailto:${suggestion.user_email}`" target="_blank" class="font-bold"
          @click.stop="mailtoUser">{{
              suggestion.user_email
          }}</a>
        <div class="flex justify-between mt-3">
          <button @click.stop="refuseSuggestion"
            class="text-red-500 border border-red-500 hover:bg-red-500 hover:text-white active:bg-red-600 font-bold uppercase text-xs px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button">
            <i class="fa-solid fa-times mr-1"></i>
            Refuser
          </button>
          <button @click.stop="modifySuggestion" v-if="suggestion.state != 'validate'"
            class="text-yellow-500 border border-yellow-500 hover:bg-yellow-500 hover:text-white active:bg-yellow-600 font-bold uppercase text-xs px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button">
            <i class="fa-solid fa-pen mr-1"></i>
            A modifier
          </button>
          <button @click.stop="validateSuggestion" v-if="suggestion.state != 'validate'"
            class="text-green-500 border border-green-500 hover:bg-green-500 hover:text-white active:bg-green-600 font-bold uppercase text-xs px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button">
            <i class="fa-solid fa-check mr-1"></i>
            Valider
          </button>
          <button @click.stop="lockSuggestion" v-if="suggestion.state == 'validate'"
            class="text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white active:bg-blue-600 font-bold uppercase text-xs px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button">
            <i class="fa-solid fa-lock mr-1"></i>
            Verrouiller
          </button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Accordion",
  props: [
    'suggestion', 'active'
  ],
  methods: {
    validateSuggestion() {
      this.$emit("validate-suggestion", this.suggestion.id)
    },
    refuseSuggestion() {
      this.$emit("delete-suggestion", this.suggestion.id);
    }
  }
}
</script>

<style>
</style>