<template>
  <div class="px-2">
    <h2 class="text-xl text-green-800 font-display mb-2">Kategorien</h2>
    <template v-if="$fetchState.pending">
      <content-loader
        v-for="p in 15"
        class="mb-4"
        :key="p"
        :width="120"
        :height="16"
        :speed="2"
        primaryColor="#f3f3f3"
        secondaryColor="#ecebeb"
      >
        <rect
          x="0"
          y="0"
          rx="0"
          ry="0"
          width="85"
          height="16"
        /> </content-loader
    ></template>
    <template v-else>
      <nav class="w-full">
        <ul>
          <li v-for="category in categories" :key="category.uid">
            <nuxt-link
              class="block pb-2 pr-2 text-sm"
              :to="'/' + category.full_slug"
              >{{ category.name }}</nuxt-link
            >
          </li>
        </ul>
      </nav>
      <nav class="mt-2">
        <h2 class="text-xl text-green-800 font-display mb-1">Informationen</h2>
        <ul class="space-y-1 text-sm">
          <li>
            <nuxt-link to="/about">So funktioniert's</nuxt-link>
          </li>
          <li><nuxt-link to="/impressum">Impressum</nuxt-link></li>
          <li><nuxt-link to="/datenschutz">Datenschutz</nuxt-link></li>
        </ul>
      </nav>
    </template>
  </div>
</template>

<script>
import { ContentLoader } from 'vue-content-loader'
import { mapMutations } from 'vuex'

export default {
  components: {
    ContentLoader,
  },
  data() {
    return {
      categories: [],
    }
  },
  async fetch() {
    const response = await this.$nuxt.context.app.$storyapi
      .get('cdn/stories', {
        starts_with: 'de/kategorien/',
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

    this.setCategories(response.stories)
    this.categories = response.stories
  },
  methods: {
    ...mapMutations({
      setCategories: 'categories/SET_CATEGORIES',
    }),
  },
}
</script>


