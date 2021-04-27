<template>
  <a :href="link">
    <span
      to="login"
      class="w-full min-w-button relative bg-green-800 border border-green-800 text-white uppercase hover:bg-green-900 focus:outline-none focus:shadow-outline-green active:bg-green-400 focus:ring-2 focus:ring-offset-0 focus:ring-green-100 inline-flex items-center justify-center py-3 px-2 md:px-3 whitespace-nowrap font-bold text-xs md:text-sm transition duration-150 ease-in-out"
    >
      <slot></slot>
    </span>
  </a>
</template>

<script>
export default {
  props: {
    link: {
      type: String,
      required: true,
    },
  },
}
</script>
