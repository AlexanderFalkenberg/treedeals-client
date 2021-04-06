<template>
  <div class="relative">
    <CopyToClipboard :text="coupon_code" @copy="handleCopy">
      <button
        @mouseenter="showIcon = true"
        @mouseleave="showIcon = false"
        class="w-40 rounded border border-dashed hover:bg-green-100 py-2 px-2 text-green-400 text-sm inline-flex justify-center items-center cursor-pointer whitespace-nowrap text-xs focus:outline-none transition duration-150 ease-in-out"
      >
        {{ coupon_code }}
        <span class="h-5 w-5 absolute left-0 transform">
          <transition name="slide-fade"></transition
        ></span>
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
  },
  methods: {
    handleCopy(text) {
      $nuxt.$emit('copy-event', text)
    },
  },
}
</script>
