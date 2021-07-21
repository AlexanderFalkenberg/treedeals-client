<template>
  <header class="shadow">
    <div class="bg-gray-100">
      <div
        class="max-w-7xl text-xs font-bold mx-auto py-2 flex item-center justify-between px-2 sm:px-4 lg:px-10 overflow-x-auto whitespace-nowrap space-x-4 text-center"
      >
        <p>{{ $t('Schnäppchen und Gutscheine') }}</p>
        <p>
          {{ $t('Unseren Gewinn investieren wir in Baumbestände weltweit') }}
        </p>

        <p>{{ $t('Große Auswahl nachhaltiger Produkte') }}</p>
      </div>
    </div>
    <div class="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 border-b lg:border-0">
      <div class="relative h-16 flex justify-between">
        <div class="relative z-10 px-2 flex">
          <div class="flex-shrink-0 flex items-center">
            <TheLogo />
          </div>
          <div class="items-center flex ml-2">
            <nuxt-link class="whitespace-nowrap text-sm" to="/about">{{
              $t('So funktioniert Treedeals')
            }}</nuxt-link>
          </div>
        </div>

        <div class="hidden md:flex items-center space-x-2 text-sm font-medium">
          <template v-if="!$auth.loggedIn">
            <nuxt-link
              class="border hover:border-gray-400 rounded px-5 py-2.5"
              to="/login"
              >Anmelden</nuxt-link
            >
            <nuxt-link
              class="border bg-green-800 whitespace-nowrap text-white rounded px-5 py-2.5"
              to="/register"
              >Kostenlos Registrieren</nuxt-link
            >
          </template>
        </div>

        <div
          v-if="$auth.loggedIn"
          class="hidden lg:relative lg:z-10 lg:ml-4 lg:flex lg:items-center"
        >
          <!--  <button
            class="flex-shrink-0 rounded-full p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
          >
            <span class="sr-only">View notifications</span>

            <svg
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
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          </button> -->

          <!-- Profile dropdown -->
          <div class="flex-shrink-0 relative ml-4">
            <div>
              <button
                @click="userMenuIsOpen = !userMenuIsOpen"
                type="button"
                class="bg-white rounded-full flex focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-green-100 text-sm text-green-700 bg-green-50 px-3 py-1.5"
                id="user-menu-button"
                aria-expanded="false"
                aria-haspopup="true"
              >
                <span class="sr-only">Open user menu</span>
                <span class="mr-2">👋 </span>{{ $auth.user.username }}
              </button>
            </div>

            <!--
            Dropdown menu, show/hide based on menu state.

            Entering: "transition ease-out duration-100"
              From: "transform opacity-0 scale-95"
              To: "transform opacity-100 scale-100"
            Leaving: "transition ease-in duration-75"
              From: "transform opacity-100 scale-100"
              To: "transform opacity-0 scale-95"
          -->
            <div
              v-if="$auth.loggedIn && userMenuIsOpen"
              class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="user-menu-button"
              tabindex="-1"
            >
              <!-- Active: "bg-gray-100", Not Active: "" -->
              <nuxt-link
                to="/account"
                class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
                tabindex="-1"
                id="user-menu-item-0"
                >Dein Konto</nuxt-link
              >

              <a
                href="#"
                class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
                tabindex="-1"
                id="user-menu-item-2"
                @click.prevent="logout"
                >Abmelden</a
              >
            </div>
          </div>
        </div>

        <div class="relative z-10 flex items-center lg:hidden px-2">
          <!-- Mobile menu button -->
          <button
            @click="toggleMenu"
            type="button"
            class="rounded p-2 inline-flex items-center justify-center text-white bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-transparent"
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
    </div>

    <nav v-if="$auth.loggedIn" class="py-3 border-t" aria-label="Global">
      <div class="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <a
          href="#"
          class="bg-gray-0 py-2 px-3 inline-flex items-center text-sm hover:bg-gray-100"
          aria-current="page"
        >
          Deal einreichen
        </a>

        <a
          href="#"
          class="hover:bg-gray-100 rounded-md py-2 px-3 inline-flex items-center text-sm"
        >
          Deine Deals verwalten
        </a>

        <a
          href="#"
          class="hover:bg-gray-100 rounded-md py-2 px-3 inline-flex items-center text-sm"
        >
          Deine Favoriten
        </a>
      </div>
    </nav>

    <!-- Mobile menu, show/hide based on menu state. -->
    <div :class="{ hidden: !isMenuOpen }" class="lg:hidden">
      <SearchBox :search="fetchSuggestions" />
      <div class="px-4 sm:px-6 lg:px-10 my-4">
        <h2 class="font-display text-green-800 text-xl mb-2">Kategorien</h2>
        <nav class="grid grid-cols-2" aria-label="Global" id="mobile-menu">
          <span
            @click="toggleMenu"
            v-for="category in categories"
            :key="category.uid"
          >
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
import IndexSidenav from './IndexSidenavRight.vue'
import TheLogo from './TheLogo.vue'
import { mapGetters, mapMutations } from 'vuex'

export default {
  components: { TheLogo },
  data() {
    return {
      openNav: false,
      userMenuIsOpen: false,
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
    async logout() {
      await this.$auth.logout()
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
