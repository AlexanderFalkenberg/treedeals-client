<template>
  <section class="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 mt-4">
    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-2 text-gray-600">
        <IndexSidenav />
      </div>
      <div class="col-span-8">
        <h1 class="text-2xl font-bold text-green-900 mb-4">
          {{ category.name }}
        </h1>
        <ul class="space-y-4">
          <li v-for="deal in deals" :key="deal._uid">
            <DealTeaser :deal="deal" />
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import IndexSidenav from '~/components/IndexSidenav.vue'

export default {
  components: {
    IndexSidenav,
  },
  data() {
    return {
      deals: [],
      category: {},
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
  async asyncData(context) {
    // // This what would we do in real project
    const version =
      context.query._storyblok || context.isDev ? 'draft' : 'published'
    const fullSlug =
      context.route.path == '/' || context.route.path == ''
        ? 'home'
        : context.route.path

    const { stories } = await context.app.$storyapi
      .get('cdn/stories', {
        starts_with: `de/kategorien/${context.route.params.pathMatch}`,
        version: 'draft',
      })
      .then((res) => {
        return res.data
      })
      .catch((res) => {
        if (!res.response) {
          console.error(res)
          context.error({
            statusCode: 404,
            message: 'Failed to receive content form api',
          })
        } else {
          console.error(res.response.data)
          context.error({
            statusCode: res.response.status,
            message: res.response.data,
          })
        }
      })

    const deals = await context.app.$storyapi
      .get('cdn/stories', {
        filter_query: {
          categories: {
            exists: stories[0]['uuid'],
          },
        },
        starts_with: 'de/deals',
        version: 'draft',
      })
      .then((res) => {
        return res.data
      })
      .catch((res) => {
        if (!res.response) {
          console.error(res)
          context.error({
            statusCode: 404,
            message: 'Failed to receive content form api',
          })
        } else {
          console.error(res.response.data)
          context.error({
            statusCode: res.response.status,
            message: res.response.data,
          })
        }
      })

    return {
      deals: deals.stories,
      category: stories[0],
    }
  },
}
</script>
