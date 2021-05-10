<template>
  <header class="shadow">
    <div class="bg-gray-100 border-b">
      <div
        class="max-w-7xl text-xs font-bold mx-auto py-2 flex item-center justify-between px-2 sm:px-4 lg:px-10 overflow-x-auto whitespace-nowrap space-x-4 text-center"
      >
        <p>
          Für jeden erfolgreich vermittelten Deal leisten wir einen Beitrag zum
          Umweltschutz
        </p>
        <p>Große Zahl an preiswerten und nachhaltigen Produkten</p>
      </div>
    </div>
    <div class="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
      <div class="relative h-16 flex justify-between">
        <div class="relative z-10 px-2 flex">
          <div class="flex-shrink-0 flex items-center">
            <TheLogo />
          </div>
          <div
            class="ml-8 fond-bold text-sm hidden lg:flex items-center space-x-3"
          >
            <div>So funktionierts</div>
          </div>
        </div>

        <div class="hidden lg:block w-full max-w-lg">
          <SearchBox :search="fetchSuggestions" />
        </div>
        <div class="relative z-10 flex items-center lg:hidden">
          <!-- Mobile menu button -->
          <button
            @click="openNav = !openNav"
            type="button"
            class="rounded-md p-2 inline-flex items-center justify-center text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-green-400"
            aria-controls="mobile-menu"
            aria-expanded="false"
          >
            <span class="sr-only">Open menu</span>
            <!--
            Icon when menu is closed.

            Heroicon name: outline/menu

            Menu open: "hidden", Menu closed: "block"
          -->
            <svg
              :class="{ hidden: openNav }"
              class="block h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <!--
            Icon when menu is open.

            Heroicon name: outline/x

            Menu open: "block", Menu closed: "hidden"
          -->
            <svg
              :class="{ hidden: !openNav }"
              class="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
      <!--   <nav class="hidden lg:py-2 lg:flex lg:space-x-8" aria-label="Global">
        <a
          href="#"
          class="bg-gray-0 text-green-900 py-2 px-3 inline-flex items-center text-sm font-medium"
          aria-current="page"
        >
          Deal einreichen
        </a>

        <a
          href="#"
          class="text-gray-900 hover:bg-gray-50 hover:text-gray-900 rounded-md py-2 px-3 inline-flex items-center text-sm font-medium"
        >
          Team
        </a>

        <a
          href="#"
          class="text-gray-900 hover:bg-gray-50 hover:text-gray-900 rounded-md py-2 px-3 inline-flex items-center text-sm font-medium"
        >
          Projects
        </a>

        <a
          href="#"
          class="text-gray-900 hover:bg-gray-50 hover:text-gray-900 rounded-md py-2 px-3 inline-flex items-center text-sm font-medium"
        >
          Calendar
        </a>
      </nav> -->
      <div class="w-full lg:hidden"></div>
    </div>

    <!-- Mobile menu, show/hide based on menu state. -->
    <div
      :class="{ hidden: !openNav }"
      class="lg:hidden pt-2 pb-4 px-4 sm:px-6 lg:px-10"
    >
      <h2 class="font-display text-xl mb-4">Kategorien</h2>
      <nav class="grid grid-cols-2" aria-label="Global" id="mobile-menu">
        <span v-for="category in categories" :key="category.uid">
          <nuxt-link class="mb-4 inline-block" :to="'/' + category.full_slug">{{
            category.name
          }}</nuxt-link>
        </span>
      </nav>
    </div>
  </header>
</template>

<script>
import IndexSidenav from './IndexSidenav.vue'
import TheLogo from './TheLogo.vue'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      openNav: false,
    }
  },
  computed: {
    ...mapGetters({
      categories: 'categories/categories',
    }),
  },
  components: { TheLogo },
  methods: {
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
