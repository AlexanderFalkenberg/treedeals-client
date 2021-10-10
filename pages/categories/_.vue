<template>
  <div>
    <div class="max-w-7xl w-full mx-auto px-2 sm:px-4 lg:px-8 py-4">
      <div class="grid grid-cols-12 gap-4">
        <div class="hidden lg:block col-span-2"><IndexSidenavLeft /></div>
        <main class="col-span-12 lg:col-span-10">
          <MasonryWall :deals="deals" @append="loadDeals" />
        </main>
      </div>
    </div>
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
  async fetch() {
    const { data } = await this.$store.dispatch(
      'deals/fetchDeals',
      `http://192.168.2.107:3000/api/categories/${this.$route.params.pathMatch}`
    )
    //this.total = data.meta.to
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
      if (this.currentPage <= this.total) {
        this.currentPage++
        this.$fetch()
      }
    },
  },
}
</script>
