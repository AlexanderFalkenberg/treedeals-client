<template>
  <div class="sm:flex items-center space-x-2">
    <span
      v-if="deal.sustainable"
      class="inline-flex justify-center items-center md:h-auto md:w-auto text-xs font-bold bg-green-100 rounded py-1 px-2"
    >
      Nachhaltig
    </span>
    <span
      v-if="deal.free_shipping"
      class="inline-flex justify-center items-center md:h-auto md:w-auto text-xs font-bold bg-gray-100 rounded py-1 px-2"
    >
      Kostenloser Versand
    </span>
  </div>
</template>

<script>
export default {
  props: {
    deal: {
      type: Object,
      true: true,
    },
  },
}
</script>
