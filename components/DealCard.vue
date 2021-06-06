<template>
  <article class="items-center mb-8">
    <nuxt-link :to="`/de/deals/${slug}`">
      <div class="flex-shrink-0 leading-tight items-stretch relative">
        <div
          v-if="deal.gallery"
          class="rounded relative mr-2 flex items-center"
        >
          <img
            :style="[
              expired ? { filter: 'grayscale(100%)', opacity: '35%' } : {},
            ]"
            class="sm:w-auto sm:h-auto bg-gray-200 object-cover rounded-md"
            :src="transformImage(deal.gallery[0].filename, '300x0')"
            :alt="deal.gallery[0].alt"
          />
        </div>
      </div>
      <div class="md:flex md:flex-col mt-1 flex-1 pl-0 relative self-stretch">
        <h3
          :class="[expired ? 'text-gray-500' : 'text-green-800']"
          class="sm:text-lg mt-1 font-display line-clamp-1"
        >
          {{ title }}
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
                  expired ? 'text-gray-500' : 'text-green-500',
                  'text-xl sm:text-xl  font-bold',
                ]"
                >{{ deal.price }} €</span
              >
            </div>

            <span
              v-if="deal.original_price"
              :class="[
                expired
                  ? 'text-gray-500'
                  : 'bg-green-100 text-green-800 py-2 px-2',
                'font-bold text-md md:text-xl rounded',
              ]"
              v-html="discount"
            ></span>
          </div>
          <span class="text-xs text-gray-400">{{ timeago }}</span>
        </div>
      </div>
    </nuxt-link>
  </article>
</template>

<script>
import TimeAgo from 'javascript-time-ago'
import de from 'javascript-time-ago/locale/de'

export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  computed: {
    slug() {
      return this.item.slug ? this.item.slug : ''
    },
    title() {
      return this.item.name ? this.item.name : ''
    },
    deal() {
      return this.item.content ? this.item.content : null
    },
    expired() {
      return new Date() > new Date(this.item.content.expired)
    },
    timeago() {
      TimeAgo.addLocale(de)
      const timeAgo = new TimeAgo('de-DE')
      return this.item.published_at
        ? timeAgo.format(new Date(this.item.published_at))
        : false
    },
    discount() {
      if (parseInt(this.deal.original_price) > parseInt(this.deal.price)) {
        return `-${Math.round(
          (1 - this.deal.price / this.deal.original_price) * 100
        )}%`
      } else {
        return '<span class="text-red-500">Originalpreis muss größer sein als Preis</span>'
      }
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
