<template>
  <article class="items-center mb-8" v-if="deal">
    <nuxt-link :to="`/de/deals/${slug}`">
      <div class="leading-tight items-stretch relative">
        <div
          v-if="deal.gallery"
          class="rounded relative bg-gray-200 mr-2 flex items-center justify-center"
        >
          <img
            :style="[
              expired ? { filter: 'grayscale(100%)', opacity: '35%' } : {},
            ]"
            class="bg-gray-200 object-cover rounded md:w-auto md:h-auto"
            :src="transformImage(deal.image[0].filename, '450x0')"
            :alt="deal.gallery[0].alt"
          />
        </div>

        <div class="md:flex md:flex-col mt-2 flex-1 pl-0 relative self-stretch">
          <h3
            :class="[expired ? 'text-gray-500' : 'text-green-800']"
            class="sm:text-lg mt-1 font-display line-clamp-1"
          >
            {{ title }}
          </h3>

          <div>
            <div class="space-x-2 items-center flex">
              <span
                v-if="deal.price"
                :class="[
                  expired ? 'text-gray-500' : 'text-green-500',
                  'text-sm  md:text-xl font-bold ',
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
                    : 'bg-green-100 text-green-800 py-1 px-2',
                  'font-bold text-xs md:text-lg rounded',
                ]"
                v-html="discount"
              ></span>
              <span
                v-if="deal.discount && !deal.original_price.length > 0"
                :class="[
                  expired
                    ? 'text-gray-500'
                    : 'bg-green-100 text-green-800 py-1 px-2',
                  'font-bold text-xs md:text-lg rounded',
                ]"
                v-html="deal.discount"
              ></span>
            </div>
          </div>
          <div>
            <span class="text-xs text-gray-500">{{ timeago }}</span>
          </div>
        </div>
      </div>
    </nuxt-link>
    <div class="lg:hidden flex flex-col mt-2 space-y-2 sm:space-y-0">
      <div class="flex space-x-2 ml-auto">
        <coupon-button
          :expired="expired"
          class="w-full"
          v-if="deal.coupon_code"
          :coupon_code="deal.coupon_code"
        ></coupon-button>
        <LinkButton
          :expired="expired"
          class="w-full"
          :link="deal.link.url"
          v-if="deal.link"
        >
          Zum Deal
        </LinkButton>
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
