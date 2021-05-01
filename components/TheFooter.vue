<template>
  <footer class="mt-auto bg-gray-800">
    <div class="max-w-7xl mx-auto flex space-x-8 px-2 sm:px-4 lg:px-8 py-8">
      <div class="">
        <h2 class="text-gray-400">Top Kategorien</h2>
        <nav class="flex flex-wrap text-gray-100 max-w-md">
          <div class="pr-3" v-for="category in categories" :key="category.uid">
            <nuxt-link :to="'/' + category.full_slug">{{
              category.name
            }}</nuxt-link>
          </div>
        </nav>
      </div>
      <div class="space-y-2 text-gray-200">
        <nav>
          <h2 class="text-gray-400">Informationen</h2>
          <ul class="text-sm space-y-1">
            <li><nuxt-link to="/impressum">Impressum</nuxt-link></li>
            <li><nuxt-link to="/datenschutz">Datenschutz</nuxt-link></li>
          </ul>
        </nav>
      </div>
    </div>
  </footer>
</template>

<script>
import { mapGetters } from 'vuex'
import IndexSidenav from './IndexSidenav.vue'
export default {
  computed: {
    ...mapGetters({
      categories: 'categories/categories',
    }),
  },
}
</script>
