<template>
  <table class="w-full ">
    <tbody>
      <div v-for="suggestion in suggestions" :key="suggestion.id" class="pt-5">
        <Suggestion :title="suggestion.title" :description="suggestion.description" :nbVotes="suggestion.nb_votes"/>
        <hr class="mt-5">
      </div>
    </tbody>
  </table>
</template>

<script>
import Suggestion from "./Suggestion";
export default {
  name: "Suggestions",
  props: {
    suggestions: Array
  },
  components: {
    Suggestion,
  }
};
</script>

<style>
</style>