<template>
  <!--
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ]
  }
  ```
-->
  <header class="bg-white shadow">
    <div
      class="max-w-7xl mx-auto px-2 sm:px-4 lg:divide-y lg:divide-gray-300 lg:px-8"
    >
      <div class="relative h-16 flex justify-between">
        <div class="relative z-10 px-4 flex lg:px-2">
          <div class="flex-shrink-0 flex items-center">
            <TheLogo />
          </div>
        </div>

        <div class="relative z-10 flex items-center lg:hidden">
          <!-- Mobile menu button -->
          <button
            type="button"
            class="rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
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
              class="hidden h-6 w-6"
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
        <div class="w-full max-w-lg">
          <SearchBox :search="fetchSuggestions" />
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
    <nav class="hidden lg:hidden" aria-label="Global" id="mobile-menu">
      <div class="pt-2 pb-3 px-2 space-y-1 text-green∂-900">
        <!-- Current: "bg-gray-100 text-gray-900", Default: "text-gray-900 hover:bg-gray-50 hover:text-gray-900" -->
        <a
          href="#"
          class="bg-gray-100 block rounded-md py-2 px-3 text-base font-medium"
          aria-current="page"
          >Deal einreichen</a
        >

        <a
          href="#"
          class="hover:bg-gray-50 block rounded-md py-2 px-3 text-base font-medium"
          >Team</a
        >

        <a
          href="#"
          class="hover:bg-gray-50 block rounded-md py-2 px-3 text-base font-medium"
          >Projects</a
        >

        <a
          href="#"
          class="hover:bg-gray-50 block rounded-md py-2 px-3 text-base font-medium"
          >Calendar</a
        >
      </div>
      <div class="border-t border-gray-200 pt-4 pb-3">
        <div class="px-4 flex items-center">
          <div class="flex-shrink-0">
            <img
              class="h-10 w-10 rounded-full"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixqx=o5hV0Qxnus&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
          </div>
          <div class="ml-3">
            <div class="text-base font-medium text-gray-800">Tom Cook</div>
            <div class="text-sm font-medium text-gray-500">tom@example.com</div>
          </div>
          <button
            class="ml-auto flex-shrink-0 bg-white rounded-full p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <span class="sr-only">View notifications</span>
            <!-- Heroicon name: outline/bell -->
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
          </button>
        </div>
        <div class="mt-3 px-2 space-y-1">
          <a
            href="#"
            class="block rounded-md py-2 px-3 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
            >Your Profile</a
          >

          <a
            href="#"
            class="block rounded-md py-2 px-3 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
            >Settings</a
          >

          <a
            href="#"
            class="block rounded-md py-2 px-3 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
            >Sign out</a
          >
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import TheLogo from './TheLogo.vue'

export default {
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
