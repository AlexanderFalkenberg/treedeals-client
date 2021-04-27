<template>
  <main v-editable="deal" class="max-w-6xl mx-auto px-2 sm:px-4 lg:px-8 mt-8">
    <div class="md:flex gap-4 justify-center space-y-4">
      <div
        v-if="deal.gallery"
        class="w-6/12 flex gap-4 flex-col justify-start lg:flex-row"
      >
        <div
          v-if="deal.gallery.length > 1"
          class="space-y-4 justify-between overflow-x-auto flex w-full md:w-auto lg:flex-col h-full order-last lg:order-first"
        >
          <button
            v-for="(image, index) in deal.gallery"
            type="button"
            :key="image.id"
            class="focus:outline-none"
            @mouseover="current(index)"
          >
            <img
              :style="[
                expired ? { filter: 'grayscale(100%)', opacity: '50%' } : {},
              ]"
              :src="transformImage(image.filename, '100x130')"
              :alt="image.alt"
            />
          </button>
        </div>
        <div class="" v-if="deal.gallery">
          <img
            :style="[
              expired ? { filter: 'grayscale(100%)', opacity: '50%' } : {},
            ]"
            :src="
              transformImage(
                deal.gallery[currentIndex].filename,
                '620x600/smart'
              )
            "
            :alt="deal.gallery[currentIndex].alt"
          />
        </div>
      </div>

      <div class="md:w-6/12 lg:w-5/12 flex flex-col">
        <div class="p-4 space-y-4">
          <div class="flex items-center space-x-1">
            <span
              v-if="deal.sustainable"
              class="inline-flex rounded justify-center items-center md:h-auto md:w-auto text-xs font-medium text-white bg-green-600 py-1 px-2"
            >
              Nachhaltig
            </span>

            <span
              v-if="deal.free_shipping"
              class="inline-flex justify-center items-center md:h-auto md:w-auto text-xs text-white font-medium rounded bg-gray-800 py-1 px-2"
            >
              Kostenloser Versand
            </span>
          </div>

          <div>
            <h1 class="text-3xl font-bold">{{ meta.name }}</h1>
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
                class="text-white mt-1 bg-gray-800 text-xs px-2 py-1 rounded-full"
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
          v-if="deal.update.length > 0"
          class="float-right pl-1 bg-gray-100 mx-8 p-4 my-8"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-green-800"
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
        <p>{{ deal.update }}</p>
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

export default {
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

<style lang="postcss">
.html {
  p {
    @apply mb-1;
  }

  a {
    @apply font-medium text-green-500;

    &:hover {
      text-decoration: underline;
    }
  }

  ul {
    @apply p-4;
  }

  li {
    @apply list-disc;
  }
}
</style>
