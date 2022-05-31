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
    </div>
  </div>
</template>

<script>
export default {
  name: "Accordion",
  props: [
    'suggestion', 'active'
  ]
}
</script>

<style>
</style>