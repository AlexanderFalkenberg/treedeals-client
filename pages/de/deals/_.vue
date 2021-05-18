<template>
  <main
    v-if="deal"
    v-editable="deal"
    class="w-full px-2 sm:px-4 lg:px-8 max-w-7xl mx-auto"
  >
    <div
      class="flex flex-col items-center lg:flex-row max-w-5xl mx-auto space-x-2"
    >
      <div
        v-if="deal.gallery"
        class="flex flex-col sm:flex-row justify-center my-6 lg:my-8"
      >
        <div
          v-if="deal.gallery.length > 1"
          class="mx-auto flex flex-row sm:flex-col justify-start items-center sm:justify-start mt-4 sm:mt-0 space-x-4 sm:space-x-0 sm:space-y-4 sm:mr-4 order-last sm:order-first"
        >
          <button
            v-for="(image, index) in deal.gallery.slice(0, 3)"
            :key="image.id"
            class="focus:outline-none block"
            @mouseover="current(index)"
          >
            <div class="w-20 h-28 flex">
              <img
                class="w-20 h-28 bg-gray-100"
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
          <div
            class="md:w-96 md:h-100 relative flex justify-center"
            v-if="deal"
          >
            <img
              :style="[
                expired ? { filter: 'grayscale(100%)', opacity: '50%' } : {},
              ]"
              class="sm:w-96 sm:h-100 bg-gray-100"
              :src="
                transformImage(
                  deal.gallery[currentIndex].filename,
                  '384x480/smart'
                )
              "
              :alt="deal.gallery[currentIndex].alt"
            />
          </div>
        </div>
      </div>

      <div class="flex self-stretch flex-1 lg:mt-8">
        <div class="px-2 md:px-4 w-full">
          <Labels :deal="deal" />
          <div class="my-8 lg:my-12">
            <h1
              :class="[
                expired ? 'text-gray-500 line-through' : 'text-gray-800 ',
              ]"
              class="text-xl lg:text-2xl font-bold"
            >
              <span
                v-if="expired"
                class="bg-gray-800 rounded inline-block text-white font-display p-2"
              >
                Abgelaufen
              </span>
              {{ title }}
            </h1>
            <p :class="[expired ? 'text-gray-500' : 'text-gray-800', '']">
              {{ deal.intro }}
            </p>
          </div>

          <div
            v-if="deal.price"
            class="flex flex-1 items-center justify-between"
          >
            <div class="space-x-2">
              <span
                :class="[
                  expired ? 'text-gray-500' : 'text-green-500',
                  'text-xl sm:text-2xl md:text-3xl  font-bold',
                ]"
                >{{ price }}€</span
              >

              <span
                v-if="deal.original_price"
                class="text-gray-400 md:text-2xl line-through text-xs"
                >{{ original_price }}€</span
              >

              <span
                v-if="deal.original_price"
                :class="[
                  expired
                    ? 'text-gray-600'
                    : 'text-white bg-green-400 py-1.5 px-2',
                  'font-bold text-xs md:text-2xl rounded',
                ]"
                >{{ discount }}%</span
              >
            </div>
          </div>

          <div
            class="flex-1 md:flex items-center space-y-4 sm:space-y-0 space-x-0 sm:space-x-2 mt-8 my-2 lg:my-12"
          >
            <coupon-button
              class="w-full md:max-w-xs"
              v-if="deal.coupon_code"
              :coupon_code="deal.coupon_code"
            ></coupon-button>
            <LinkButton
              :expired="expired"
              class="w-full md:max-w-xs"
              :link="deal.link.url"
              v-if="deal.link"
            >
              Zum Deal
            </LinkButton>
          </div>
        </div>
      </div>
    </div>

    <section class="mx-auto my-4 md:my-8 max-w-4xl">
      <div v-if="deal.update">
        <div
          class="flex items-center bg-gray-100 text-xs md:text-sm mt-2 lg:mx-8"
          v-if="deal.update.length > 1"
        >
          <p class="p-4 flex-1">{{ deal.update }}</p>
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

      <div v-if="deal.html" class="html px-4 md:px-8">
        <rich-text-renderer :document="deal.html" />
      </div>
    </section>
  </main>
</template>

<script>
import TimeAgo from 'javascript-time-ago'
import de from 'javascript-time-ago/locale/de'
import { ContentLoader } from 'vue-content-loader'
import SocialLinks from '~/components/SocialLinks.vue'

export default {
  components: {
    ContentLoader,
    SocialLinks,
  },
  head() {
    const i18nHead = this.$nuxtI18nHead({ addSeoAttributes: true })
    return {
      title: this.title,
      titleTemplate: '%s -  Treedeals',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'description',
          name: this.deal.title,
          content: this.deal.description,
        },
      ],
    }
  },
  data() {
    return {
      openSocial: false,
      currentIndex: 0,
      data: {},
      meta: {},
    }
  },
  computed: {
    title() {
      return this.data.name ? this.data.name : false
    },
    deal() {
      return this.data.content ? this.data.content : false
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
      return timeAgo.format(new Date(this.data.published_at))
    },
    discount() {
      return `-${Math.round(
        (1 - this.deal.price / this.deal.original_price) * 100
      )}`
    },
    expired() {
      return new Date() > new Date(this.deal.expired)
    },
  },
  methods: {
    url() {
      return this.$nuxt.context.env.baseUrl
    },
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

  async fetch() {
    let version =
      this.$nuxt.context.query._storyblok || this.$nuxt.context.isDev
        ? 'draft'
        : 'published'

    const getData = await this.$nuxt.context.app.$storyapi
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

    this.data = getData.story
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

  b,
  strong {
    @apply font-bold;
  }

  a {
    @apply font-medium text-gray-500 underline;
  }

  ul {
    @apply p-4;
  }

  li {
    @apply list-disc;
  }
}
</style>
