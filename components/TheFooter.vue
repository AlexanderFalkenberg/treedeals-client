<template>
  <footer class="mt-auto bg-gray-800">
    <div
      class="container max-w-7xl mx-auto sm:flex justify-center sm:space-x-8 py-8 px-8 sm:px-4 lg:px-10"
    >
      <div class="">
        <h2 class="text-gray-100 mb-1">Top Kategorien</h2>
        <nav
          class="text-sm grid sm:grid-col-2 md:grid-cols-3 gap-2 text-gray-100"
        >
          <div class="pr-3" v-for="category in categories" :key="category.uid">
            <nuxt-link :to="'/' + category.full_slug">{{
              category.name
            }}</nuxt-link>
          </div>
        </nav>
      </div>
      <div class="space-y-2 mt-4 sm:mt-0 text-gray-100">
        <nav>
          <h2 class="text-gray-100">Informationen</h2>
          <ul class="text-sm space-y-2">
            <li>
              <nuxt-link to="/about">So funktioniert's</nuxt-link>
            </li>
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
import IndexSidenav from './IndexSidenavRight.vue'
export default {
  computed: {
    ...mapGetters({
      categories: 'categories/categories',
    }),
  },
}
</script>
