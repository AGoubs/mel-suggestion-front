<template>
  <tr>
    <td>
      <div class="flex items-center">
        <div class="bg-gray-300 rounded-sm p-2.5">
          <p class="text-center text-lg font-bold">{{ suggestion.nb_votes }}</p>
          <p>Votes</p>
        </div>
        <div class="pl-3">
          <div class="flex items-center text-sm leading-none">
            <a href="#" class="font-semibold text-gray-800">{{ suggestion.title }}</a>
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