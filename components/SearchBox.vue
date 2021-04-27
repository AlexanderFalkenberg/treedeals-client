<template>
  <div class="relative w-full my-2">
    <!-- Magnifying glass icon -->
    <div
      class="h-full absolute top-0 left-0 bg-green-100 px-4 flex items-center border-green-900"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        class="h-5 fill-current"
        style="top: 9px"
      >
        <path
          d="M508.5 468.9L387.1 347.5c-2.3-2.3-5.3-3.5-8.5-3.5h-13.2c31.5-36.5 50.6-84 50.6-136C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c52 0 99.5-19.1 136-50.6v13.2c0 3.2 1.3 6.2 3.5 8.5l121.4 121.4c4.7 4.7 12.3 4.7 17 0l22.6-22.6c4.7-4.7 4.7-12.3 0-17zM208 368c-88.4 0-160-71.6-160-160S119.6 48 208 48s160 71.6 160 160-71.6 160-160 160z"
        ></path>
      </svg>
    </div>
    <!-- Search Input -->
    <input
      v-model="searchInput"
      @input="onInputChange"
      @blur="onInputBlur"
      placeholder="Suchen.."
      class="w-full bg-white border-t border-b lg:border text-gray-700 outline-none focus:border-green-200 pl-16 py-3"
    />
    <!-- Suggestions list -->
    <div class="relative">
      <div class="absolute z-30 bg-white top-1 inset-x-0 shadow-lg mt-1">
        <nuxt-link
          v-for="suggestion in suggestions"
          :key="suggestion.id"
          :to="`/de/deals/${suggestion.slug}`"
          class="block truncate text-gray-700 hover:text-main hover:bg-gray-100 px-2 py-2"
        >
          <div class="flex items-center">
            <img
              v-if="suggestion.content.gallery"
              class="w-16 h-16 mr-2"
              :src="
                transformImage(suggestion.content.gallery[0].filename, '50x50')
              "
              :alt="suggestion.content.gallery[0].alt"
            />
            <div>
              <p
                class="inline-flex justify-between items-center font-display text-gray-800"
              >
                {{ suggestion.name }}
                <span class="flex items-center space-x-1 mb-1">
                  <span
                    v-if="suggestion.content.sustainable"
                    class="mx-2 inline-flex justify-center items-center md:h-auto md:w-auto text-xs font-medium text-white bg-green-600 py-1 px-2"
                  >
                    Nachhaltig
                  </span>
                  <span
                    v-if="suggestion.content.free_shipping"
                    class="mx-2 inline-flex justify-center items-center md:h-auto md:w-auto text-xs text-white font-medium bg-gray-800 py-1 px-2"
                  >
                    Kostenloser Versand
                  </span>
                </span>
              </p>
              <p v-if="suggestion.content.price">
                <span
                  v-if="suggestion.content.price.length > 0"
                  class="font-semibold text-green-500 text-lg"
                  >{{ suggestion.content.price }}€</span
                >
                <span
                  v-if="suggestion.content.original_price"
                  class="text-gray-500 line-through text-xs"
                  >{{ suggestion.content.original_price }}€</span
                >
                <span
                  v-if="suggestion.content.original_price"
                  class="text-green-500 font-bold line-through text-xs"
                  >-
                  {{
                    Math.round(
                      (1 -
                        suggestion.content.price /
                          suggestion.content.original_price) *
                        100
                    )
                  }}%</span
                >
              </p>
            </div>
          </div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import debounce from 'lodash/debounce'

export default {
  props: {
    search: {
      type: Function,
      required: true,
    },
  },
  data: () => ({
    searchInput: '',
    suggestions: [],
  }),
  methods: {
    onInputChange: debounce(async function () {
      this.suggestions = await this.search(this.searchInput)
    }, 300),
    onInputBlur() {
      setTimeout(() => (this.suggestions = []), 300)
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
