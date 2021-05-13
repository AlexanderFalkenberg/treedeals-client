<template>
  <main
    v-if="story.content"
    class="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-8"
  >
    <div class="prose">
      <rich-text-renderer :document="story.content.body" />
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      story: {},
    }
  },
  mounted() {
    // Use the input event for instant update of content
    this.$storybridge.on('input', (event) => {
      if (event.story.id === this.story.id) {
        this.story.content = event.story.content
      }
    })
    // Use the bridge to listen the events
    this.$storybridge.on(['published', 'change'], (event) => {
      // window.location.reload()
      this.$nuxt.$router.go({
        path: this.$nuxt.$router.currentRoute,
        force: true,
      })
    })
  },
  fetchDealy: 500,
  fetchKey: 'Index',
  async fetch() {
    let version =
      this.$nuxt.context.query._storyblok || this.$nuxt.context.isDev
        ? 'draft'
        : 'published'

    console.log(this.$nuxt.context.route.fullPath)

    const { story } = await this.$nuxt.context.app.$storyapi
      .get(`cdn/stories/de/${this.$nuxt.context.route.fullPath}`, {
        version: version,
      })
      .then((res) => {
        this.total = res.total
        return res.data
      })

    this.story = story
  },
}
</script>

<style lang="scss" scoped></style>
