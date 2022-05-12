<template>
  <table class="w-full ">
    <tbody>
      <div v-for="suggestion in suggestions" :key="suggestion.id" class="pt-5">
        <Suggestion :title="suggestion.title" :description="suggestion.description"/>
        <hr class="mt-5">
      </div>
    </tbody>
  </table>
</template>

<script>
import axios from "axios";
import Suggestion from "./Suggestion";
export default {
  name: "Suggestions",
  data() {
    return {
      suggestions: Array,
    };
  },
  components: {
    Suggestion,
  },
  mounted() {
    axios
      .get("http://127.0.0.1:8000/api/suggestions")
      .then((response) => {
        this.suggestions = response.data;
        console.log(this.suggestions);
      })
      .catch((error) => console.log(error));
  },
};
</script>

<style>
</style>