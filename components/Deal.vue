<template>
  <main v-editable="deal" class="max-w-6xl mx-auto px-2 sm:px-4 lg:px-8 mt-8">
    <div class="md:flex gap-4 justify-center">
      <div
        class="w-6/12 h-96 flex gap-4 flex-col justify-start lg:flex-row content-wrapper"
      >
        <content-loader
          v-if="!deal.gallery"
          :speed="3"
          :animate="true"
        ></content-loader>
        <div else>
          <img
            :style="[
              expired ? { filter: 'grayscale(100%)', opacity: '50%' } : {},
            ]"
            :src="deal.gallery[currentIndex].filename"
            :alt="deal.gallery[currentIndex].alt"
          />
        </div>
      </div>

      <div class="md:w-6/12 lg:w-5/12 flex flex-col">
        <div class="px-4 space-y-2">
          <div class="flex items-center space-x-1">
            <span
              v-if="deal.content.sustainable"
              class="inline-flex justify-center items-center md:h-auto md:w-auto text-xs font-medium bg-green-100 py-1 px-2"
            >
              🌱 Nachhaltig
            </span>
            <span
              v-if="deal.content.free_shipping"
              class="inline-flex justify-center items-center md:h-auto md:w-auto text-xs font-medium bg-gray-100 py-1 px-2"
            >
              🚚 Kostenloser Versand
            </span>
          </div>

          <div>
            <h1 class="text-3xl lg:text-4xl font-bold">{{ meta.name }}</h1>
          </div>

          <div
            v-if="deal.price"
            class="flex flex-1 items-center justify-between"
          >
            <div class="space-x-1">
              <span
                :class="[
                  deal.expired ? 'text-gray-500' : 'text-green-500',
                  'text-sm md:text-3xl font-bold',
                ]"
                >{{ deal.price }}€</span
              >

              <span
                v-if="deal.original_price"
                class="text-gray-300 md:text-2xl line-through text-xs"
                >{{ deal.original_price }}€</span
              >

              <span
                v-if="deal.original_price"
                :class="[
                  deal.expired ? 'text-gray-600' : 'text-gray-800',
                  'font-bold text-xs md:text-2xl',
                ]"
                >{{ discount }}%</span
              >
            </div>
          </div>

          <div class="space-y-2 mt-2">
            <LinkButton :link="deal.link.url" v-if="deal.link">
              Zum Angebot
            </LinkButton>
            <coupon-button
              v-if="deal.coupon_code"
              :coupon_code="deal.coupon_code"
            ></coupon-button>
          </div>

          <div class="text-sm text-gray-500">
            <span>{{ timeago }} veröffentlicht</span> in
            <div class="flex space-x-1">
              <span
                class="text-white mt-1 bg-gray-600 text-xs px-2 py-1 rounded-full"
                v-for="category in deal.categories"
                :key="category.uuid"
              >
                <nuxt-link :to="'/' + category.full_slug">{{
                  category.name
                }}</nuxt-link></span
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    <section class="mx-auto max-w-4xl">
      <div v-if="deal.update">
        <div
          class="flex items-center bg-gray-100 text-xs md:text-sm mt-2 mx-8"
          v-if="deal.update.length > 1"
        >
          <p class="p-3 flex-1">{{ deal.update }}</p>
          <div
            class="bg-gray-200 self-stretch items-center inline-flex px-3 ml-auto"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 md:h-5 md:w-5 text-gray-800"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      <div v-if="deal.html" class="html p-4 mx-8">
        <rich-text-renderer :document="deal.html" />
      </div>
    </section>
  </main>
</template>

<script>
import TimeAgo from 'javascript-time-ago'
import de from 'javascript-time-ago/locale/de'
import { ContentLoader } from 'vue-content-loader'

export default {
  components: {
    ContentLoader,
  },
  data() {
    return {
      currentIndex: 0,
      categories: [],
    }
  },
  props: {
    meta: {
      type: Object,
      required: true,
    },
    deal: {
      type: Object,
      required: true,
    },
  },
  computed: {
    price() {
      return this.deal.content.price.toString().replace('.', ',')
    },
    original_price() {
      return this.deal.content.original_price.toString().replace('.', ',')
    },
    timeago() {
      TimeAgo.addLocale(de)
      const timeAgo = new TimeAgo('de-DE')
      return timeAgo.format(new Date(this.meta.published_at))
    },
    discount() {
      return `-${Math.round(
        (1 - this.deal.price / this.deal.original_price) * 100
      )}`
    },
    expired() {
      return false
    },
  },
  methods: {
    current(index) {
      this.currentIndex = index
    },
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
