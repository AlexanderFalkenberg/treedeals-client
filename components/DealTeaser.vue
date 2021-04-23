<template>
  <article
    class="leading-tight flex flex-1 items-center bg-white border relative p-3 hover:shadow-md max-w-xl"
  >
    <div class="hidden flex-shrink-0 mr-2 sm:block">
      <nuxt-link :to="meta.full_slug">
        <div class="w-36 h-36 flex items-center justify-center rounded">
          <img
            v-if="deal.gallery"
            :style="[
              deal.expired ? { filter: 'grayscale(100%)', opacity: '50%' } : {},
            ]"
            class="object-cover rounded"
            :src="transformImage(deal.gallery[0].filename, '200x200')"
            :alt="deal.gallery[0].alt"
          />
        </div>
      </nuxt-link>
    </div>
    <div class="flex-1 pl-0 relative">
      <div>
        <div class="flex-shrink-0 float-right mr-1 sm:hidden">
          <!--   <img
            :style="[deal.expired ? { filter: 'graysacle(100%)' } : {}]"
            class="w-16 h-16 rounded-md"
            :src="deal.image.imageUrl"
            :alt="deal.title"
          /> -->
        </div>
      </div>
      <div
        :class="[deal.expired ? 'text-gray-500' : 'text-gray-800']"
        class="flex items-center space-x-1"
      >
        <span
          v-if="deal.sustainable"
          class="inline-flex rounded-full justify-center items-center md:h-auto md:w-auto text-xs font-medium text-white bg-green-600 py-1 px-2"
        >
          Nachhaltig
        </span>
        <span
          v-if="deal.free_shipping"
          class="inline-flex justify-center items-center md:h-auto md:w-auto text-xs text-white font-medium rounded-full bg-gray-800 py-1 px-2"
        >
          Kostenloser Versand
        </span>
      </div>
      <nuxt-link :to="meta.full_slug">
        <h3
          :class="[deal.expired ? 'text-gray-500' : 'text-gray-800']"
          class="font-bold md:text-lg leading-snug truncate max-w-xs md:max-w-truncate"
        >
          {{ deal.title }}
        </h3>

        <div class="flex flex-1 items-center justify-between">
          <div class="space-x-1">
            <span
              v-if="deal.price"
              :class="[
                deal.expired ? 'text-gray-500' : 'text-green-500',
                'text-sm md:text-xl font-bold',
              ]"
              >{{ deal.price }}€</span
            >

            <span
              v-if="deal.original_price"
              class="text-gray-400 line-through text-xs"
              >{{ deal.original_price }}€</span
            >

            <span
              v-if="deal.original_price"
              :class="[
                deal.expired ? 'text-gray-600' : 'text-gray-800',
                'font-bold text-xs',
              ]"
              >{{ discount }}%</span
            >
          </div>
        </div>

        <p
          :class="[deal.expired ? 'text-gray-500' : 'text-gray-800']"
          class="text-sm line-clamp-2"
        >
          {{ deal.description }}
        </p>
      </nuxt-link>

      <div class="flex justify-between items-center">
        <div class="text-xs text-gray-500">{{ timeago }} veröffentlicht</div>

        <div class="flex space-x-2 mt-1">
          <LinkButton v-if="deal.link">
            <a :href="deal.link.url">Zum Angebot</a>
          </LinkButton>

          <coupon-button
            v-if="deal.coupon_code"
            :coupon_code="deal.coupon_code"
          ></coupon-button>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
import CouponButton from './CouponButton.vue'
/* import TimeAgo from 'javascript-time-ago'
import de from 'javascript-time-ago/locale/de'
 */
export default {
  components: { CouponButton },
  props: {
    deal: {
      type: Object,
      required: true,
    },
    meta: {
      type: Object,
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
      /* TimeAgo.addLocale(de)
      const timeAgo = new TimeAgo('de-DE')
      return timeAgo.format(new Date(this.meta.published_at)) */
      return ''
    },
    discount() {
      return Math.floor((1 - this.deal.original_price / this.deal.price) * 100)
    },
  },
}
</script>
