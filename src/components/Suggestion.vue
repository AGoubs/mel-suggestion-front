<template>
  <tr tabindex="0" class="focus:outline-none">
    <td>
      <div class="flex items-center">
        <div class="bg-gray-100 rounded-sm p-2.5">
          <p class="text-center text-lg font-bold">0</p>
          <p>Votes</p>
        </div>
        <div class="pl-3">
          <div class="flex items-center text-sm leading-none">
            <p class="font-semibold text-gray-800">{{ title }}</p>
          </div>
          <p
            class="
              text-xs
              md:text-sm
              leading-none
              text-gray-600
              mt-2
              max-w-full
              truncate
            "
          >
            {{ description }}
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
    title: String,
    description: String,
  },
};
</script>

<style scoped>
.truncate {
  width: 500px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>