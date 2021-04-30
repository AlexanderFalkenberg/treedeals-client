<template>
  <main
    v-if="deal.content"
    v-editable="deal"
    class="container mx-auto px-2 sm:px-4 lg:px-8"
  >
    <div class="flex mx-auto mt-8">
      <div class="flex justify-end">
        <div
          v-if="deal.content.gallery.length > 1"
          class="flex flex-col justify-start space-y-4 mr-4"
        >
          <button
            v-for="(image, index) in deal.content.gallery.slice(0, 3)"
            :key="image.id"
            class="focus:outline-none block"
            @mouseover="current(index)"
          >
            <div class="bg-gray-100 w-20 h-28">
              <img
                class="w-20 h-28"
                :style="[
                  expired ? { filter: 'grayscale(100%)', opacity: '50%' } : {},
                ]"
                :src="transformImage(image.filename, '80x112/smart')"
                :alt="image.alt"
              />
            </div>
          </button>
        </div>
        <div>
          <div class="w-96 h-100 bg-gray-100" v-if="deal.content">
            <img
              class="w-96 h-100"
              :src="
                transformImage(
                  deal.content.gallery[currentIndex].filename,
                  '384x480/smart'
                )
              "
              :alt="deal.content.gallery[currentIndex].alt"
            />
          </div>
        </div>
      </div>

      <div class="flex self-stretch flex-1">
        <div class="px-4 w-full">
          <div class="flex items-center mb-8">
            <span
              v-if="deal.content.sustainable"
              class="inline-flex justify-center mr-2 items-center md:h-auto md:w-auto text-xs font-medium text-white bg-green-600 py-1 px-2"
            >
              Nachhaltig
            </span>

            <span
              v-if="deal.content.free_shipping"
              class="inline-flex justify-center items-center md:h-auto md:w-auto text-xs text-white bg-gray-800 font-medium bg-gray-00 py-1 px-2"
            >
              Kostenloser Versand
            </span>

            <div
              class="ml-auto text-sm flex items-center space-x-2 text-gray-500"
            >
              <span>{{ timeago }} veröffentlicht in</span>
              <div class="flex space-x-1">
                <span
                  class="text-white py-1 bg-gray-800 text-xs px-2 rounded-full"
                  v-for="category in deal.content.categories"
                  :key="category.uuid"
                >
                  <nuxt-link :to="'/' + category.full_slug">{{
                    category.name
                  }}</nuxt-link></span
                >
              </div>
            </div>
          </div>

          <div class="mb-4">
            <h1 class="text-3xl lg:text-3xl font-bold">
              {{ deal.name }}
            </h1>
            <p>{{ deal.content.intro }}</p>
          </div>

          <div
            v-if="deal.content.price"
            class="flex flex-1 items-center justify-between"
          >
            <div class="space-x-2">
              <span
                :class="[
                  deal.content.expired ? 'text-gray-500' : 'text-green-500',
                  'text-sm md:text-3xl  font-bold',
                ]"
                >{{ deal.content.price }}€</span
              >

              <span
                v-if="deal.content.original_price"
                class="text-gray-300 md:text-2xl line-through text-xs"
                >{{ deal.content.original_price }}€</span
              >

              <span
                v-if="deal.content.original_price"
                :class="[
                  expired
                    ? 'text-gray-600'
                    : 'text-white bg-green-400 py-1.5 px-2',
                  'font-bold text-xs md:text-2xl',
                ]"
                >{{ discount }}%</span
              >
            </div>
          </div>

          <div class="flex space-x-4 mt-8">
            <coupon-button
              class="max-w-xs"
              v-if="deal.content.coupon_code"
              :coupon_code="deal.content.coupon_code"
            ></coupon-button>
            <LinkButton
              class="max-w-xs"
              :link="deal.content.link.url"
              v-if="deal.content.link"
            >
              Zum Angebot
            </LinkButton>
          </div>
        </div>
      </div>
    </div>

    <section class="mx-auto max-w-4xl">
      <div v-if="deal.content.update">
        <div
          class="flex items-center bg-gray-100 text-xs md:text-sm mt-2 mx-8"
          v-if="deal.content.update.length > 1"
        >
          <p class="p-3 flex-1">{{ deal.content.update }}</p>
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

      <div v-if="deal.content.html" class="html p-4 mx-8">
        <rich-text-renderer :document="deal.content.html" />
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
      deal: {},
      meta: {},
    }
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

  mounted() {
    /*  this.$storybridge.resolveRelations(['relation'], (event) => {
      console.log(event.story.content)
      this.deal = event.story.content
    }) */

    this.$storybridge.on('input', (event) => {
      if (event.story.id === this.meta.id) {
        this.$storybridge.resolveRelations(['deal.categories'], (event) => {
          this.deal = event.story.content
        })
      }
    })

    this.$storybridge.on(['published', 'change'], (event) => {
      this.$nuxt.$router.go({
        path: this.$nuxt.$router.currentRoute,
        force: true,
      })
    })
  },
  computed: {
    timeago() {
      TimeAgo.addLocale(de)
      const timeAgo = new TimeAgo('de-DE')
      return timeAgo.format(new Date(this.deal.published_at))
    },
    discount() {
      return `-${Math.round(
        (1 - this.deal.content.price / this.deal.content.original_price) * 100
      )}`
    },
    expired() {
      return false
    },
  },
  async fetch() {
    let version =
      this.$nuxt.context.query._storyblok || this.$nuxt.context.isDev
        ? 'draft'
        : 'published'

    const deal = await this.$nuxt.context.app.$storyapi
      .get(`cdn/stories${this.$nuxt.context.route.fullPath}`, {
        resolve_relations: 'deal.categories',
        version: version,
      })
      .then((res) => {
        return res.data
      })
      .catch((res) => {
        if (!res.response) {
          console.error(res)
          this.$nuxt.context.error({
            statusCode: 404,
            message: 'Failed to receive content form api',
          })
        } else {
          console.error(res.response.data)
          this.$nuxt.context.error({
            statusCode: res.response.status,
            message: res.response.data,
          })
        }
      })

    this.deal = deal.story
  },
}
</script>

<style lang="postcss">
.html {
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    @apply font-normal;
    font-family: system-ui, sans-serif;
  }

  p {
    @apply mb-4;
  }

  a {
    @apply font-medium text-green-500 font-semibold;

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
