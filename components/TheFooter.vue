<template>
  <footer class="bg-gray-900">
    <div class="max-w-7xl mx-auto flex space-x-8 px-2 sm:px-4 lg:px-8 py-8">
      <div class="">
        <h2 class="text-gray-400">Top Kategorien</h2>
        <IndexSidenav class="text-gray-200 text-sm max-w-sm" />
      </div>
      <div class="space-y-2 text-gray-200 text-sm">
        <nav>
          <h2 class="text-gray-400">Informationen</h2>
          <ul>
            <li><nuxt-link to="/impressum">Impressum</nuxt-link></li>
            <li><nuxt-link to="/datenschutz">Datenschutz</nuxt-link></li>
          </ul>
        </nav>
      </div>
    </div>
  </footer>
</template>

<script>
import IndexSidenav from './IndexSidenav.vue'
export default {}
</script>
