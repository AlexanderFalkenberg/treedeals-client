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
    const res = await this.$axios.get('/api/deals').then(({ data }) => {
      this.deals.push(data.data[0])
    })
  },
  methods: {
    /*  loadDeals() {
      if (this.currentPage < Math.ceil(this.total / 8) && this.total > 8) {
        this.currentPage++
        this.$fetch()
      }
    }, */
  },
}
</script>
