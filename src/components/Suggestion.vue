<template>
  <tr class="inline-block w-full">
    <td class="inline-block w-full">
      <div class="flex justify-between">
        <div id="suggestion" class="flex items-center">
          <div class="bg-gray-300 rounded-sm p-2.5 cursor-pointer hover:bg-gray-100"
            :class="hasVoted ? 'bg-green-200' : ''" @mouseenter="changeVoteText" @mouseleave="resetVoteText"
            @click="toggleVote">
            <div v-if="voteHover" class="text-center mb-2">
              <div v-if="hasVoted">
                <i class="fa-solid fa-xl fa-times"></i>
              </div>
              <div v-else>
                <i class="fa-solid fa-xl fa-circle-up"></i>
              </div>
            </div>
            <div v-else>
              <p class="text-center text-lg font-bold">{{ suggestion.nb_votes }}</p>
            </div>
            <p>Votes</p>
          </div>
          <div class="pl-3">
            <div class="flex items-center text-sm leading-none">
              <p class="font-semibold" :class="modifiedSuggestion ? 'text-green-500' : 'text-gray-800'">{{ suggestion.title }}</p>
            </div>
            <p class="
              text-xs
              md:text-sm
              leading-none
              mt-2
              max-w-full
            "
            :class="modifiedSuggestion ? 'text-green-500' : 'text-gray-600'">
              {{ suggestion.description }}
            </p>
          </div>
        </div>
        <div id="user-actions" v-show="suggestion.my_vote">
          <i class="fa-solid fa-edit mb-4 hover:text-blue-500 cursor-pointer" @click="toggleSuggestion"></i>
          <br>
          <i class="fa-solid fa-xl fa-times mt-4 hover:text-red-500 cursor-pointer" @click="deleteSuggestion"></i>
        </div>
      </div>
      <div v-show="showSuggestion">
        <UpdateSuggestion @update-suggestion="updateSuggestions" :suggestion="suggestion" />
      </div>
    </td>
  </tr>
</template>

<script>
import axios from "axios";

import UpdateSuggestion from "./UpdateSuggestion";

export default {
  name: "Suggestion",
  props: {
    suggestion: Object,
  },
  data() {
    return {
      voteHover: false,
      hasVoted: false,
      voteId: Number,
      showSuggestion: false,
      modifiedSuggestion: false,
    }
  },
  methods: {
    changeVoteText() {
      this.voteHover = true
    },
    resetVoteText() {
      this.voteHover = false
    },
    toggleVote() {
      this.hasVoted = !this.hasVoted
      if (this.hasVoted) {
        this.suggestion.nb_votes++
        axios.post("http://127.0.0.1:8000/api/votes", {
          user_email: 'Arnaud@goubier.fr',
          suggestion_id: this.suggestion.id
        }).then((res) => {
          this.voteId = res.data.id
        })
          .catch((error) => {
            console.log(error);
          })
      }
      else {
        this.suggestion.nb_votes--
        axios.delete(`http://127.0.0.1:8000/api/votes/${this.voteId}`).catch((error) => {
          console.log(error);
        })
      }
    },
    deleteSuggestion() {
      if (confirm('Voulez-vous supprimer cette suggestion ?')) {
        this.$emit("delete-suggestion", this.suggestion.id);
      }
    },
    updateSuggestions(suggestion) {
      this.$emit("update-suggestion", suggestion);
      this.toggleSuggestion();
      this.modifiedSuggestion = true;
    },
    toggleSuggestion() {
      this.showSuggestion = !this.showSuggestion
    }
  },
  components: {
    UpdateSuggestion
  },
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