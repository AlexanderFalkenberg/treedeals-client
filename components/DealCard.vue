<template>
  <article class="items-center mb-8">
    <nuxt-link :to="`/deals/${deal.slug}`">
      <div class="flex-shrink-0 leading-tight items-stretch relative">
        <div v-if="deal.image" class="rounded relative mr-2 flex items-center">
          <!--  <img
            class="sm:w-auto sm:h-auto bg-gray-200 object-cover rounded-md"
            :src="transformImage(image, '300x0')"
            :alt="deal.image[0].alt"
          /> -->
          <NuxtImg
            :style="[
              deal.expired ? { filter: 'grayscale(100%)', opacity: '35%' } : {},
            ]"
            class="sm:w-auto sm:h-auto bg-gray-200 object-cover rounded-md"
            width="300"
            provider="storyblok"
            :src="image"
          />
        </div>
      </div>
      <div class="md:flex md:flex-col mt-1 flex-1 pl-0 relative self-stretch">
        <h3
          :class="[deal.expired ? 'text-gray-500' : 'text-green-800']"
          class="sm:text-lg mt-1 font-display line-clamp-1"
        >
          {{ deal.name }}
        </h3>

        <div>
          <div class="space-x-2 items-center flex justify-between pr-2">
            <div>
              <span
                v-if="deal.original_price"
                class="text-gray-400 line-through block text-xs"
                >{{ deal.original_price }} €</span
              >

              <span
                v-if="deal.price"
                :class="[
                  deal.expired ? 'text-gray-500' : 'text-green-500',
                  'text-xl sm:text-xl  font-bold',
                ]"
                >{{ deal.price }} €</span
              >
            </div>

            <span
              v-if="deal.discount"
              :class="[
                deal.expired
                  ? 'text-gray-500'
                  : 'bg-green-100 text-green-800 px-2',
                'font-bold text-lg rounded',
              ]"
              v-html="deal.discount"
            ></span>
          </div>
          <span class="block text-xs text-gray-400">
            {{ deal.published_at }}</span
          >
        </div>
      </div>
    </nuxt-link>
  </article>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  computed: {
    deal() {
      return this.item ? this.item : null
    },
    image() {
      return this.deal.image.length > 0
        ? this.deal.image[0].filename
        : this.deal.image.image
    },
  },
  methods: {
    transformImage(image, option) {
      if (!image) return ''
      if (!option) return ''

      let imageService = 'https://img2.storyblok.com/'
      let path = image.replace('https://a.storyblok.com', '')
      return imageService + option + path
    },
  },
}
</script>
