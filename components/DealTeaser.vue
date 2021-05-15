<template>
  <article class="w-full mb-8" v-if="deal">
    <div class="leading-tight flex flex-1 items-stretch relative">
      <nuxt-link :to="`/de/deals/${slug}`">
        <div class="flex-shrink-0 mr-2 sm:block">
          <div
            v-if="deal.gallery"
            class="h-20 w-20 bg-gray-200 md:w-32 md:h-32 lg:w-40 lg:h-40 relative flex items-center justify-center"
          >
            <img
              :style="[
                expired ? { filter: 'grayscale(100%)', opacity: '35%' } : {},
              ]"
              class="object-cover rounded"
              :src="transformImage(deal.gallery[0].filename, '220x220/smart')"
              :alt="deal.gallery[0].alt"
            />
          </div>
        </div>
      </nuxt-link>

      <div class="md:flex md:flex-col flex-1 pl-0 relative self-stretch">
        <Labels class="mb-1 mt-auto" :deal="deal" />

        <nuxt-link :to="`/de/deals/${slug}`">
          <h3
            :class="[expired ? 'text-gray-500' : 'text-green-800']"
            class="sm:text-lg md:text-xl font-display line-clamp-1"
          >
            {{ title }}
          </h3>

          <p class="line-clamp-2 text-gray-600 mb-1">
            {{ deal.intro }}
          </p>

          <!--       <div class="html">
            <div
              v-if="deal.content.html.content"
              class="text-grey-700 text-sm line-clamp-2"
            >
              <rich-text-renderer :document="deal.content.html" />
            </div>
          </div> -->

          <div v-if="deal.price" class="flex items-center justify-between">
            <div class="space-x-1">
              <span
                :class="[
                  expired ? 'text-gray-500' : 'text-green-500',
                  'text-sm sm:text-xl md:text-2xl font-bold ',
                ]"
                >{{ price }}€</span
              >

              <span
                v-if="deal.original_price"
                class="text-gray-400 line-through text-xs md:text-xl"
                >{{ original_price }}€</span
              >

              <span
                v-if="deal.original_price"
                :class="[
                  expired
                    ? 'text-gray-500'
                    : 'text-white bg-green-400 py-1 px-2',
                  'font-bold text-xs md:text-xl rounded',
                ]"
                v-html="discount"
              ></span>
            </div>
          </div>
        </nuxt-link>

        <div
          class="hidden mt-3 mr-auto w-full lg:flex justify-between items-center"
        >
          <span v-if="timeago" class="md:hidden xl:block text-xs text-gray-500"
            >{{ timeago }} veröffentlicht</span
          >
          <div class="lg:flex ml-auto space-x-2">
            <LinkButton
              :expired="expired"
              class="max-w-xs min-w-button"
              :link="deal.link.url"
              v-if="deal.link"
            >
              Zum Deal
            </LinkButton>

            <coupon-button
              class="max-w-xs ml-auto"
              v-if="deal.coupon_code"
              :coupon_code="deal.coupon_code"
            ></coupon-button>
          </div>
        </div>
      </div>
    </div>
    <div
      class="lg:hidden sm:flex justify-between items-center mt-4 space-y-2 sm:space-y-0"
    >
      <span v-if="timeago" class="text-xs text-gray-500"
        >{{ timeago }} veröffentlicht</span
      >
      <LinkButton
        :expired="expired"
        class="sm:ml-auto sm:w-1/2 sm:max-w-xs"
        :link="deal.link.url"
        v-if="deal.link"
      >
        Zum Angebot
      </LinkButton>
      <coupon-button
        class="sm:w-1/2 sm:max-w-xs ml-auto"
        v-if="deal.coupon_code"
        :coupon_code="deal.coupon_code"
      ></coupon-button>
    </div>

    <div v-if="deal.update">
      <div
        class="flex items-center bg-gray-100 text-xs md:text-sm mt-2"
        v-if="deal.update.length > 1"
      >
        <p class="p-3 flex-1">{{ deal.update }}</p>
        <div
          class="bg-gray-200 ml-auto self-stretch items-center inline-flex px-3"
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
  </article>
</template>

<script>
import CouponButton from './CouponButton.vue'
import TimeAgo from 'javascript-time-ago'
import de from 'javascript-time-ago/locale/de'

export default {
  components: { CouponButton },
  props: {
    data: {
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
    slug() {
      return this.data.slug ? this.data.slug : false
    },
    title() {
      return this.data.name ? this.data.name : false
    },
    deal() {
      return this.data.content ? this.data.content : false
    },
    expired() {
      return new Date() > new Date(this.data.content.expired)
    },
    price() {
      return this.data.content.price.toString().replace('.', ',')
    },
    original_price() {
      return this.data.content.original_price.toString().replace('.', ',')
    },
    timeago() {
      TimeAgo.addLocale(de)
      const timeAgo = new TimeAgo('de-DE')
      return this.data.published_at
        ? timeAgo.format(new Date(this.data.published_at))
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
}
</script>
