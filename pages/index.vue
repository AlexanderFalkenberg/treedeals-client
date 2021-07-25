<template>
  <div>
    <MasonryWall :deals="deals" @append="loadDeals" />
  </div>
</template>

<script>
import { ContentLoader } from 'vue-content-loader'
import { mapGetters } from 'vuex'

export default {
  name: 'index',
  components: {
    ContentLoader,
  },
  data() {
    return {
      currentPage: 1,
      total: 0,
    }
  },
  fetchOnServer: false,
  async fetch() {
    console.log(this.total)
    this.$store.dispatch(
      'deals/fetchDeals',
      `api/deals?page=${this.currentPage}`
    )
  },
  asyncData({ store }) {
    store.dispatch('deals/fetchDeals', 'api/deals?page=1')
  },
  computed: {
    ...mapGetters({
      deals: 'deals/deals',
    }),
    expired() {
      return false
    },
  },
  methods: {
    loadDeals() {
      if (this.currentPage < Math.ceil(this.total / 10) && this.total > 10) {
        this.currentPage++
        this.$fetch()
      }
    },
  },
}
</script>
