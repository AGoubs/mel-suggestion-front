<template>
  <tr>
    <td>
      <div class="flex items-center">
        <div class="bg-gray-300 rounded-sm p-2.5 cursor-pointer hover:bg-gray-100" @mouseenter="changeVoteText"
          @mouseleave="resetVoteText">
          <div v-if="voteHover" class="text-center mb-2"><i class="fa-solid fa-xl fa-circle-up"></i></div>
          <div v-else>
            <p class="text-center text-lg font-bold">{{ suggestion.nb_votes }}</p>
          </div>
            <p>Votes</p>
        </div>
        <div class="pl-3">
          <div class="flex items-center text-sm leading-none">
            <p class="font-semibold text-gray-800">{{ suggestion.title }}</p>
          </div>
          <p class="
              text-xs
              md:text-sm
              leading-none
              text-gray-600
              mt-2
              max-w-full
            ">
            {{ suggestion.description }}
          </p>

        </div>
      </div>

    </td>
  </tr>
</template>

<script>
export default {
  name: "Suggestion",
  props: {
    suggestion: Object,
  },
  data() {
    return {
      voteHover: false,
    }
  },
  methods: {
    changeVoteText() {
      this.voteHover = true
    },
    resetVoteText() {
      this.voteHover = false
    }
  }
};
</script>

<style scoped>
.truncate {
  width: 600px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>