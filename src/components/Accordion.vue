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
      <ModeratorCommands :suggestion="suggestion" @delete-suggestion="refuseSuggestion"
        @validate-suggestion="validateSuggestion" @modify-suggestion="modifySuggestion"
        @lock-suggestion="lockSuggestion" />
    </div>
  </div>
</template>

<script>
import ModeratorCommands from "./Moderator/ModeratorCommands";
export default {
  name: "Accordion",
  props: [
    'suggestion', 'active'
  ],
  methods: {
    refuseSuggestion(id) {
      this.$emit("delete-suggestion", id);
    },
    modifySuggestion(id) {
      this.$emit("modify-suggestion", id);
    },
    validateSuggestion(id) {
      this.$emit("validate-suggestion", id)
    },
    lockSuggestion(id) {
      this.$emit("lock-suggestion", id)
    }
  },
  components: {
    ModeratorCommands
  }
}
</script>

<style>
</style>