<template>
  <main v-if="deal" class="w-full px-2 sm:px-4 max-w-7xl mx-auto">
    <div class="md:flex my-4 space-x-4">
      {{ deal.expired }}
      <figure
        :style="[{ background: `url(${image})` }]"
        class="
          relative
          w-3/5
          bg-gray-100
          flex
          justify-center
          items-center
          text-center
          bg-center
          rounded-md
        "
      >
        <NuxtImg
          :style="[deal.expired ? { filter: 'grayscale(100%)' } : {}]"
          class="relative z-40"
          height="350"
          provider="storyblok"
          :src="image"
        />
        <div
          class="
            absolute
            z-0
            top-0
            left-0
            w-full
            h-full
            bg-gray-100 bg-opacity-50
            backdrop-filter backdrop-blur-md
            rounded-md
          "
        ></div>
      </figure>
      <div>
        <h3
          :class="[deal.expired ? 'text-gray-500' : 'text-green-800']"
          class="
            sm:text-lg
            md:text-lg
            lg:text-2xl
            mt-1
            font-display
            line-clamp-1
          "
        >
          {{ deal.name }}
        </h3>
        <div class="">
          <span
            v-if="deal.original_price"
            class="text-gray-400 line-through text-sm"
            >{{ deal.original_price }}€</span
          >

          <div class="flex space-x-2">
            <span
              v-if="deal.price"
              :class="[
                expired ? 'text-gray-500' : 'text-green-500',
                'text-xl block sm:text-2xl md:text-2xl lg:text-3xl  font-bold',
              ]"
              >{{ deal.price }}€</span
            >
            <span
              v-if="deal.discount"
              :class="[
                expired
                  ? 'text-gray-600'
                  : 'text-white bg-green-400 py-1.5 px-2',
                'font-bold text-xs md:text-2xl rounded',
              ]"
              >{{ deal.discount }}%</span
            >
          </div>
        </div>
      </div>
    </div>
    <div v-if="html" class="html my-4 max-w-3xl mx-auto">
      <rich-text-renderer :document="html" />
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      deal: null,
    }
  },
  computed: {
    html() {
      return this.deal.html ? JSON.parse(this.deal.html) : null
    },
    image() {
      return this.deal.image.length > 0
        ? this.deal.image[0].filename
        : this.deal.image.image
    },
  },
  async fetch() {
    let response = await this.$axios
      .get(`api${this.$nuxt.context.route.fullPath}`)
      .then((res) => {
        return res.data
      })
      .catch((res) => {
        if (!res.response) {
          console.error(res)
          this.$nuxt.context.error({
            statusCode: 404,
            message: 'Failed to receive content form api',
          })
        } else {
          console.error(res.response.data)
          this.$nuxt.context.error({
            statusCode: res.response.status,
            message: res.response.data,
          })
        }
      })

    this.deal = response.data
  },
}
</script>

<style lang="postcss">
.html {
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    @apply font-normal;
    font-family: system-ui, sans-serif;
  }

  p {
    @apply mb-4;
  }

  b,
  strong {
    @apply font-bold;
  }

  a {
    @apply font-medium text-blue-500 underline;
  }

  ul,
  ol {
    @apply px-4;
  }

  li {
    @apply list-disc;
  }
}
</style>
