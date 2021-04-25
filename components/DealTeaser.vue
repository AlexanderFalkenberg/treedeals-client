<template>
  <article
    v-if="deal"
    class="leading-tight flex flex-1 items-center bg-white border relative p-3 hover:shadow-md"
  >
    <nuxt-link :to="`/de/deals/${deal.slug}`">
      <div class="hidden flex-shrink-0 mr-2 sm:block">
        <div
          v-if="deal.content.gallery"
          class="w-36 h-36 flex items-center justify-center"
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

    <div class="flex-1 pl-0 relative">
      <nuxt-link :to="`/de/deals/${deal.slug}`">
        <div>
          <div
            v-if="deal.content.gallery"
            class="flex-shrink-0 float-right mr-1 sm:hidden"
          >
            <img
              :style="[deal.expired ? { filter: 'graysacle(100%)' } : {}]"
              class="w-16 h-16"
              :src="transformImage(deal.content.gallery[0].filename, '50x50')"
              :alt="deal.content.gallery[0].alt"
            />
          </div>
        </div>
      </nuxt-link>
      <div
        :class="[deal.content.expired ? 'text-gray-500' : 'text-gray-800']"
        class="flex items-center space-x-1"
      >
        <span
          v-if="deal.content.sustainable"
          class="inline-flex rounded justify-center items-center md:h-auto md:w-auto text-xs font-medium text-green-100 bg-green-600 py-1 px-2"
        >
          Nachhaltig
        </span>
        <span
          v-if="deal.content.free_shipping"
          class="inline-flex rounded justify-center items-center md:h-auto md:w-auto text-xs text-green-100 font-medium bg-gray-800 py-1 px-2"
        >
          Kostenloser Versand
        </span>
      </div>

      <nuxt-link :to="`/de/deals/${deal.slug}`">
        <h3
          :class="[deal.content.expired ? 'text-gray-500' : 'text-gray-800']"
          class="font-bold md:text-lg leading-snug truncate max-w-xs md:max-w-truncate"
        >
          {{ deal.name }}
        </h3>
      </nuxt-link>
      <div class="flex flex-1 items-center justify-between">
        <div class="space-x-1">
          <span
            v-if="deal.content.price"
            :class="[
              deal.content.expired ? 'text-gray-500' : 'text-green-500',
              'text-sm md:text-xl font-bold',
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

      <p
        :class="[deal.content.expired ? 'text-gray-500' : 'text-gray-800']"
        class="text-sm line-clamp-2"
      >
        {{ deal.content.description }}
      </p>

      <div class="flex justify-between items-center">
        <div class="text-xs text-gray-500">{{ timeago }} veröffentlicht</div>

        <div class="flex space-x-2 mt-1">
          <LinkButton v-if="deal.content.link">
            <a :href="deal.content.link.url">Direkt zum Angebot</a>
          </LinkButton>

          <coupon-button
            v-if="deal.content.coupon_code"
            :coupon_code="deal.content.coupon_code"
          ></coupon-button>
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
