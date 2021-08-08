<template>
  <div>
    <section
      class="max-w-7xl mx-auto text-white h-72 w-full mt-4 rounded-md px-2 sm:px-4 lg:px-10"
    >
      <div
        class="text-center bg-green-800 bg-hero-pattern h-full rounded-lg w-full flex flex-col items-center justify-center p-4"
      >
        <h1
          class="font-display text-2xl md:text-3xl lg:text-5xl tracking-wider"
        >
          Schnäppchen Plattform, die Bäume pflanzt
        </h1>
        <div class="hidden lg:block w-full max-w-lg mt-4">
          <SearchBox :search="fetchSuggestions" />
        </div>
      </div>
    </section>
    <div class="max-w-7xl w-full mx-auto px-2 sm:px-4 lg:px-8 py-4">
      <div class="grid grid-cols-12 gap-4">
        <div class="hidden lg:block col-span-2"><IndexSidenavLeft /></div>
        <main class="col-span-12 lg:col-span-8">
          <MasonryWall :deals="deals" @append="loadDeals" />
        </main>
        <div class="hidden lg:block col-span-2"><IndexSidenavRight /></div>
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
  fetchOnServer: false,
  async fetch() {
    const response = await this.$store.dispatch(
      'deals/fetchDeals',
      `http://192.168.2.107:3000/api/deals?page=${this.currentPage}`
    )

    console.log(response)

    this.total = response.meta.to
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
    async fetchSuggestions(searchInput) {
      const { data } = await this.$storyapi.get('cdn/stories', {
        starts_with: 'de/deals/',
        resolve_relations: 'categories',
        search_term: searchInput,
        per_page: 5,
      })
      return data.stories
    },
  },
}
</script>
