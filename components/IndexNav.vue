<template>
  <header class="shadow">
    <div class="bg-gray-100">
      <div
        class="max-w-7xl text-xs font-bold mx-auto py-2 flex item-center justify-between px-2 sm:px-4 lg:px-10 overflow-x-auto whitespace-nowrap space-x-4 text-center"
      >
        <p>{{ $t('Schnäppchen und Gutscheine') }}</p>
        <p>
          {{
            $t(
              'Ein Großteil unseres Gewinns investieren wir in Baumbestände weltweit'
            )
          }}
        </p>

        <p>Große Zahl an preiswerten und nachhaltigen Produkten</p>
      </div>
    </div>
    <div class="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 border-b md:border-0">
      <div class="relative h-16 flex justify-between">
        <div class="relative z-10 px-2 flex">
          <div class="flex-shrink-0 flex items-center">
            <TheLogo />
          </div>
          <div
            class="ml-8 fond-bold text-sm hidden lg:flex items-center space-x-3"
          >
            <div>
              <nuxt-link to="/about">{{
                $t('So funktioniert Treedeals')
              }}</nuxt-link>
            </div>
          </div>
        </div>

        <div class="hidden lg:block w-full max-w-lg">
          <SearchBox :search="fetchSuggestions" />
        </div>
        <div class="relative z-10 flex items-center lg:hidden px-2">
          <!-- Mobile menu button -->
          <button
            @click="toggleMenu"
            type="button"
            class="rounded-md p-2 inline-flex items-center justify-center text-white bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-green-100"
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
              :class="{ hidden: isMenuOpen }"
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
              :class="{ hidden: !isMenuOpen }"
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
    </div>

    <!-- Mobile menu, show/hide based on menu state. -->
    <div :class="{ hidden: !isMenuOpen }" class="lg:hidden">
      <SearchBox :search="fetchSuggestions" />
      <div class="pb-4 px-4 sm:px-6 lg:px-10 mt-8">
        <h2 class="font-display text-green-800 text-xl mb-2">Kategorien</h2>
        <nav class="grid grid-cols-2" aria-label="Global" id="mobile-menu">
          <span v-for="category in categories" :key="category.uid">
            <nuxt-link
              class="mb-4 inline-block"
              :to="'/' + category.full_slug"
              >{{ category.name }}</nuxt-link
            >
          </span>
        </nav>
      </div>
    </div>
  </header>
</template>

<script>
import IndexSidenav from './IndexSidenav.vue'
import TheLogo from './TheLogo.vue'
import { mapGetters, mapMutations } from 'vuex'

export default {
  components: { TheLogo },
  data() {
    return {
      openNav: false,
    }
  },
  computed: {
    ...mapGetters({
      isMenuOpen: 'menu/isMenuOpen',
      categories: 'categories/categories',
    }),
  },
  methods: {
    ...mapMutations({
      toggleMenu: 'menu/TOGGLE_MENU',
    }),
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

<i18n>
{
  "ru": {
    "So funktioniert Treedeals": "Так работает Treedeals",
    "Schnäppchen und Gutscheine" : "Скидки и Промокоды",
    "Ein Großteil unseres Gewinns investieren wir in Baumbestände weltweit": ""
  }
}
</i18n>
