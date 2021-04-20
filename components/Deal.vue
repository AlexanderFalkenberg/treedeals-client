<template>
  <main v-editable="deal" class="max-w-6xl mx-auto px-2 sm:px-4 lg:px-8 mt-4">
    <div class="md:flex gap-4">
      <div class="flex-1 min-h-image-single flex items-center">
        <div class="space-y-2 flex justify-center h-full flex-col">
          <button
            v-for="(image, index) in deal.gallery"
            type="button"
            class="hover:border-2 focus:border-gray-200 focus:outline-none focus:shadow-outline-gray focus:ring-2 focus:ring-offset-1 focus:ring-gray-400"
            :class="{ isCurrent: 'border-2' }"
            :key="image.id"
            @click="current(index)"
          >
            <img
              :style="[
                expired ? { filter: 'grayscale(100%)', opacity: '50%' } : {},
              ]"
              :src="transformImage(image.filename, '100x130')"
              :alt="deal.image.alt"
            />
          </button>
        </div>
        <div class="px-4">
          <img
            :style="[
              expired ? { filter: 'grayscale(100%)', opacity: '50%' } : {},
            ]"
            :src="
              transformImage(deal.gallery[currentIndex].filename, '500x600')
            "
          />
        </div>
      </div>

      <div class="md:w-5/12 flex flex-col justify-center">
        <div class="border p-4 space-y-4">
          <div class="flex items-center space-x-1">
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

          <div>
            <h1 class="text-3xl font-bold">{{ deal.title }}</h1>
          </div>

          <div class="flex flex-1 items-center justify-between">
            <div class="space-x-1">
              <span
                v-if="deal.price"
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

          <div class="">
            <div
              class="flex justify-between text-gray-500"
              v-for="detail in deal.details"
              :key="detail._uid"
            >
              <span>{{ detail.key }}</span>
              <span>{{ detail.value }}</span>
            </div>
          </div>

          <div class="space-y-2 mt-2">
            <LinkButton :expired="deal.expired">
              <a :href="deal.link.url">Zum Angebot</a>
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
                class="text-white mt-1 bg-gray-700 text-xs px-2 py-1 rounded-full"
                v-for="category in categories"
                :key="category.id"
                ><nuxt-link :to="'/' + category.full_slug">{{
                  category.name
                }}</nuxt-link></span
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    <section class="mx-auto py-4 max-w-3xl">
      <p>{{ deal.description }}</p>
    </section>
  </main>
</template>

<script>
import TimeAgo from 'javascript-time-ago'
import de from 'javascript-time-ago/locale/de'

export default {
  data() {
    return {
      currentIndex: 1,
      categories: [],
    }
  },
  async fetch() {
    const response = await this.$nuxt.context.app.$storyapi
      .get('cdn/stories', {
        by_uuids: [this.meta.categories],
        starts_with: 'de/kategorien/',
        version: 'draft',
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

    this.categories = response.stories
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
    timeago() {
      TimeAgo.addLocale(de)
      const timeAgo = new TimeAgo('de-DE')
      return timeAgo.format(new Date(this.meta.published_at))
    },
    discount() {
      return Math.floor((1 - this.deal.original_price / this.deal.price) * 100)
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

<style lang="scss" scoped></style>
