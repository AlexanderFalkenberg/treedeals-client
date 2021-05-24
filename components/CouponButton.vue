<template>
  <div v-if="coupon_code" class="min-w-button w-full relative">
    <CopyToClipboard :text="coupon_code" @copy="handleCopy">
      <button
        @mouseenter="showIcon = true"
        @mouseleave="showIcon = false"
        :class="[expired ? 'bg-gray-300' : 'bg-green-400 hover:bg-green-500 ']"
        class="w-full tracking-wider uppercase truncate rounded py-3 px-4 text-white text-sm inline-flex items-center cursor-pointer whitespace-nowrap font-bold focus:outline-none transition duration-150 ease-in-out"
      >
        {{ coupon_code }}
        <span class="absolute left-0 transform">
          <transition name="slide-fade"></transition
        ></span>

        <div
          :class="[expired ? 'bg-gray-300' : 'bg-green-500']"
          class="absolute right-0 h-full inline-flex items-center px-3 rounded-r"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 md:h-5 md:w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
        </div>
      </button>
    </CopyToClipboard>
  </div>
</template>

<script>
import VueCopyToClipboard from 'vue-copy-to-clipboard'

export default {
  data() {
    return {
      showIcon: false,
    }
  },
  components: {
    CopyToClipboard: VueCopyToClipboard,
  },
  props: {
    coupon_code: {
      type: String,
      required: true,
    },
    expired: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    handleCopy(text) {
      $nuxt.$emit('copy-event', text)
    },
  },
}
</script>
