<template>
  <div>
    <Deal :deal="deal" :meta="meta" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      deal: {},
      meta: {},
    }
  },
  mounted() {
    /*  this.$storybridge.resolveRelations(['relation'], (event) => {
      console.log(event.story.content)
      this.deal = event.story.content
    }) */

    this.$storybridge.on('input', (event) => {
      if (event.story.id === this.meta.id) {
        this.$storybridge.resolveRelations(['deal.categories'], (event) => {
          this.deal = event.story.content
        })
      }
    })

    this.$storybridge.on(['published', 'change'], (event) => {
      this.$nuxt.$router.go({
        path: this.$nuxt.$router.currentRoute,
        force: true,
      })
    })
  },
  async asyncData(context) {
    let version =
      context.query._storyblok || context.isDev ? 'draft' : 'published'

    const deal = await context.app.$storyapi
      .get(`cdn/stories/${context.route.fullPath}`, {
        resolve_relations: 'deal.categories',
        version: version,
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

    return { deal: deal.story.content, meta: deal.story }
  },
}
</script>

<style lang="scss" scoped></style>
