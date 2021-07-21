<template>
  <div>
    <MasonryWall :deals="deals" @append="loadDeals" />
  </div>
</template>

<script>
import { ContentLoader } from 'vue-content-loader'

export default {
  name: 'index',
  components: {
    ContentLoader,
  },
  data() {
    return {
      currentPage: 1,
      total: 0,
      deals: [],
      story: {},
    }
  },
  computed: {
    expired() {
      return false
    },
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
  fetchKey: 'Index',
  async fetch() {
    let version =
      this.$nuxt.context.query._storyblok || this.$nuxt.context.isDev
        ? 'draft'
        : 'published'

    const lang = 'de'

    console.log(process.env.BASE_URL)

    console.log(this.$nuxt.context.env.BASE_URL)

    const { stories } = await this.$nuxt.context.app.$storyapi
      .get(`cdn/stories`, {
        starts_with: `${process.env.locale}/deals`,
        version: version,
        per_page: 8,
        page: this.currentPage,
      })
      .then((res) => {
        this.total = res.total
        return res.data
      })

    this.deals = this.deals.concat(stories)
  },
  methods: {
    loadDeals() {
      if (this.currentPage < Math.ceil(this.total / 8) && this.total > 8) {
        this.currentPage++
        this.$fetch()
      }
    },
  },
}
</script>
