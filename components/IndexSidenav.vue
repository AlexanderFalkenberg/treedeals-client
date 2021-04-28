<template>
  <nav>
    <ul class="flex flex-wrap">
      <li class="" v-for="tag in tags" :key="tag.id">
        <nuxt-link class="pb-2 pr-2" :to="'/' + tag.full_slug">{{
          tag.name
        }}</nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      tags: [],
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

    this.tags = response.stories
  },
}
</script>

<style lang="scss" scoped></style>
