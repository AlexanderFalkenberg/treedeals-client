<template>
  <vue-masonry-wall :items="deals" :options="options" @append="$emit('append')">
    <template v-slot:default="{ item }">
      <DealCard :item="item" />
    </template>
  </vue-masonry-wall>
</template>

<script>
import DealCard from './DealCard.vue'
export default {
  components: { DealCard },
  props: {
    deals: {
      type: Array,
      required: true,
    },
  },
  computed: {},
  data() {
    return {
      options: {
        width: 300,
        padding: {
          2: 8,
          default: 8,
        },
      },
    }
  },
  methods: {
    transformImage(image, option) {
      if (!image) return ''
      if (!option) return ''

      let imageService = 'https://img2.storyblok.com/'
      let path = image.replace('https://a.storyblok.com', '')
      return imageService + option + path
    },
  },
}
</script>

<style lang="scss" scoped></style>
