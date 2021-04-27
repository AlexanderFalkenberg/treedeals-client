<template>
  <article class="bg-white∂" v-if="deal">
    <div class="leading-tight flex flex-1 items-stretch relative">
      <nuxt-link :to="`/de/deals/${deal.slug}`">
        <div class="flex-shrink-0 mr-2 sm:block">
          <div
            v-if="deal.content.gallery"
            class="h-20 w-20 md:w-32 md:h-32 lg:w-40 lg:h-40 flex items-center justify-center"
          >
            <img
              :style="[
                deal.content.expired
                  ? { filter: 'grayscale(100%)', opacity: '50%' }
                  : {},
              ]"
              class="object-cover"
              :src="transformImage(deal.content.gallery[0].filename, '200x200')"
              :alt="deal.content.gallery[0].alt"
            />
          </div>
        </div>
      </nuxt-link>

      <div class="md:flex md:flex-col flex-1 pl-0 relative self-stretch">
        <div
          :class="[deal.content.expired ? 'text-gray-500' : 'text-gray-800']"
          class="flex items-center space-x-1 mb-1"
        >
          <span
            v-if="deal.content.sustainable"
            class="inline-flex justify-center items-center md:h-auto md:w-auto text-xs font-medium text-white bg-green-600 py-1 px-2"
          >
            Nachhaltig
          </span>
          <span
            v-if="deal.content.free_shipping"
            class="inline-flex justify-center items-center md:h-auto md:w-auto text-xs text-white font-medium bg-gray-800 py-1 px-2"
          >
            Kostenloser Versand
          </span>
        </div>

        <nuxt-link class="mt-auto" :to="`/de/deals/${deal.slug}`">
          <h3
            :class="[deal.content.expired ? 'text-gray-500' : 'text-gray-800']"
            class="md:text-xl font-display lg:text-2xl leading-none truncate max-w-xs md:max-w-truncate"
          >
            {{ deal.name }}
          </h3>
        </nuxt-link>
        <div
          v-if="deal.content.price"
          class="flex items-center justify-between"
        >
          <div class="space-x-1">
            <span
              :class="[
                deal.content.expired ? 'text-gray-500' : 'text-green-500',
                'text-sm sm:text-xl md:text-2xl font-bold',
              ]"
              >{{ deal.content.price }}€</span
            >

            <span
              v-if="deal.content.original_price"
              class="text-gray-400 line-through text-xs"
              >{{ deal.content.original_price }}€</span
            >

            <span
              v-if="deal.content.original_price"
              :class="[
                deal.content.expired ? 'text-gray-500' : 'text-green-500',
                'font-bold text-xs',
              ]"
              v-html="discount"
            ></span>
          </div>
        </div>

        <div class="hidden md:block">
          <div
            v-if="deal.content.html"
            class="text-grey-700 text-sm line-clamp-2"
          >
            <rich-text-renderer :document="deal.content.html" />
          </div>
        </div>

        <div class="hidden mt-auto lg:flex justify-between items-center">
          <div class="text-xs text-gray-500">{{ timeago }} veröffentlicht</div>
          <div class="flex ml-auto space-x-2 mt-1">
            <LinkButton :link="deal.content.link.url" v-if="deal.content.link">
              Zum Angebot
            </LinkButton>

            <coupon-button
              v-if="deal.content.coupon_code"
              :coupon_code="deal.content.coupon_code"
            ></coupon-button>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-2 space-y-2 lg:hidden items-center bg-blue-200">
      <LinkButton v-if="deal.content.link">
        <a :href="deal.content.link.url">Zum Angebot</a>
      </LinkButton>

      <coupon-button
        v-if="deal.content.coupon_code"
        :coupon_code="deal.content.coupon_code"
      ></coupon-button>
    </div>

    <div v-if="deal.content.update">
      <div
        class="flex items-center bg-gray-100 text-xs md:text-sm mt-2"
        v-if="deal.content.update.length > 1"
      >
        <p class="p-3">{{ deal.content.update }}</p>
        <div class="bg-gray-200 self-stretch items-center inline-flex px-3">
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
  </article>
</template>

<script>
import CouponButton from './CouponButton.vue'
import TimeAgo from 'javascript-time-ago'
import de from 'javascript-time-ago/locale/de'

export default {
  components: { CouponButton },
  props: {
    deal: {
      type: Object,
      required: true,
    },
  },
  mounted() {},
  methods: {
    transformImage(image, option) {
      if (!image) return ''
      if (!option) return ''

      let imageService = 'https://img2.storyblok.com/'
      let path = image.replace('https://a.storyblok.com', '')
      return imageService + option + path
    },
  },
  computed: {
    timeago() {
      TimeAgo.addLocale(de)
      const timeAgo = new TimeAgo('de-DE')
      return timeAgo.format(new Date(this.deal.published_at))
    },
    discount() {
      if (
        parseInt(this.deal.content.original_price) >
        parseInt(this.deal.content.price)
      ) {
        return `-${Math.round(
          (1 - this.deal.content.price / this.deal.content.original_price) * 100
        )}%`
      } else {
        return '<span class="text-red-500">Originalpreis muss größer sein als Preis</span>'
      }
    },
  },
}
</script>
