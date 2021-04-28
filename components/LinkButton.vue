<template>
  <a
    v-if="link"
    class="relative w-full min-w-button bg-green-400 text-white uppercase hover:bg-green-500 focus:outline-none focus:shadow-outline-green active:bg-green-400 focus:ring-2 focus:ring-offset-0 focus:ring-green-100 inline-flex items-center justify-center whitespace-nowrap font-bold text-xs md:text-sm transition duration-150 ease-in-out"
    :href="link"
  >
    <span class="py-3 px-2 md:px-3">
      <slot></slot>
    </span>
    <span
      class="self-stretch px-3 ml-auto bg-green-300 inline-flex items-center"
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
          d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
        />
      </svg>
    </span>
  </a>
</template>

<script>
export default {
  props: {
    link: {
      type: String,
      required: false,
    },
  },
}
</script>
