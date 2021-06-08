<template>
  <MasonryWall :deals="deals" @append="loadDeals" />
</template>

<script>
import { ContentLoader } from 'vue-content-loader'
export default {
  components: {
    ContentLoader,
  },
  data() {
    return {
      currentPage: 1,
      total: 0,
      deals: [],
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
  fetchKey: 'Index',
  fetchDelay: 500,
  async fetch() {
    let version =
      this.$nuxt.context.query._storyblok || this.$nuxt.context.isDev
        ? 'draft'
        : 'published'

    const { stories } = await this.$nuxt.context.app.$storyapi
      .get(`cdn/stories`, {
        starts_with: `${process.env.locale}/shops/${this.$nuxt.context.route.params.pathMatch}`,
        version: version,
        per_page: 8,
        page: this.currentPage,
      })
      .then((res) => {
        this.total = res.total
        return res.data
      })

    const deals = await this.$nuxt.context.app.$storyapi
      .get(`cdn/stories`, {
        filter_query: {
          shop: {
            in: stories[0]['uuid'],
          },
        },
        starts_with: `${process.env.locale}/deals`,
        version: 'published',
      })
      .then((res) => {
        this.total = res.total
        return res.data
      })

    console.log(deals)
    this.deals = this.deals.concat(deals.stories)
  },
  methods: {
    loadDeals(isVisible) {
      if (!isVisible || this.total < 8) {
        return
      }

      if (this.currentPage < Math.ceil(this.total / 8) && this.total > 8) {
        this.currentPage++
        this.$fetch()
      }
    },
  },
}
</script>
