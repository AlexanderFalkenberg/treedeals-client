<template>
  <section class="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 mt-4">
    <!--  <component
      v-if="story.content.component"
      :key="story.content._uid"
      :blok="story.content"
      :is="story.content.component"
    /> -->
    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-2 text-gray-600">
        <IndexSidenav />
      </div>
      <div class="col-span-7">
        <ul v-if="deals.length > 0" class="space-y-4">
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
import SearchBox from '~/components/SearchBox.vue'

export default {
  components: {
    IndexSidenav,
    SearchBox,
  },
  data() {
    return {
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
  async asyncData(context) {
    // // This what would we do in real project
    const version =
      context.query._storyblok || context.isDev ? 'draft' : 'published'
    const fullSlug =
      context.route.path == '/' || context.route.path == ''
        ? 'home'
        : context.route.path

    // load home components from storyblok
    const { story } = await context.app.$storyapi
      .get('cdn/stories/de', {
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
        starts_with: 'de/deals/',
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
      story: story,
      deals: deals.stories,
    }
  },
}
</script>
