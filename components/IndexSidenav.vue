<template>
  <div class="text-sm">
    <div class="font-bold text-green-500 mb-2 px-2">Kategorien</div>
    <nav>
      <ul>
        <li
          class="hover:bg-gray-100 py-1 px-2"
          v-for="tag in tags.data"
          :key="tag.id"
        >
          <nuxt-link to="#">{{ tag.name }}</nuxt-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tags: [],
    }
  },
  async fetch() {
    this.tags = await fetch('http://localhost:3000/api/tags').then((res) =>
      res.json()
    )
  },
}
</script>

<style lang="scss" scoped></style>
