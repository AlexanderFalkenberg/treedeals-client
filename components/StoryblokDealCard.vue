<template>
  <div
    v-editable="blok"
    class="py-8 mb-6 text-3xl font-bold text-center border p-4 text-green-500"
  >
    {{ blok.title }}
  </div>
</template>

<script>
export default {
  props: {
    blok: {
      type: Object,
      required: true,
    },
  },
}
</script>
