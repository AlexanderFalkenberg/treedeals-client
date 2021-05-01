<template>
  <section class="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 my-8">
    <!--  <component
      v-if="story.content.component"
      :key="story.content._uid"
      :blok="story.content"
      :is="story.content.component"
    /> -->

    <div class="grid grid-cols-12">
      <div class="hidden lg:block md:col-span-3 lg:col-span-2">
        <IndexSidenav />
      </div>
      <template>
        <div class="col-span-12 md:col-span-9 lg:col-span-8">
          <template v-if="$fetchState.pending">
            <content-loader
              v-for="p in 5"
              :key="p"
              :width="700"
              :height="235"
              :speed="2"
              primaryColor="#f3f3f3"
              secondaryColor="#ecebeb"
            >
              <rect x="150" y="30" rx="0" ry="0" width="445" height="16" />
              <rect x="150" y="0" rx="0" ry="0" width="75" height="16" />
              <rect x="0" y="0" rx="0" ry="0" width="140" height="140" />
              <rect x="150" y="88" rx="0" ry="0" width="186" height="34" />
              <rect x="150" y="58" rx="0" ry="0" width="441" height="16" />
              <rect x="530" y="140" rx="0" ry="0" width="180" height="50" />
            </content-loader>
          </template>

          <template else>
            <div v-for="(deal, i) in deals" :key="deal._uid" class="">
              <DealTeaser
                :deal="deal"
                v-observe-visibility="
                  i === deals.length - 1 ? lazyLoadArticles : false
                "
              />
            </div>
          </template></div
      ></template>
    </div>
  </section>
</template>

<script>
import IndexSidenav from '~/components/IndexSidenav.vue'
import SearchBox from '~/components/SearchBox.vue'
import { ContentLoader } from 'vue-content-loader'
export default {
  components: {
    ContentLoader,
    IndexSidenav,
    SearchBox,
  },
  data() {
    return {
      currentPage: 1,
      total: 0,
      deals: [],
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

    const { stories } = await this.$nuxt.context.app.$storyapi
      .get(`cdn/stories`, {
        starts_with: 'de/deals',
        version: version,
        per_page: 7,
        page: this.currentPage,
      })
      .then((res) => {
        this.total = res.total
        return res.data
      })

    this.deals = this.deals.concat(stories)
  },
  methods: {
    lazyLoadArticles(isVisible) {
      if (isVisible) {
        if (this.currentPage < this.total / this.currentPage) {
          this.currentPage++
          this.$fetch()
        }
      }
    },
  },
}
</script>
