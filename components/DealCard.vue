<template>
  <div
    class="leading-tight flex flex-1 items-center bg-white border rounded relative p-3 hover:shadow max-w-xl"
  >
    <div class="hidden flex-shrink-0 mr-2 sm:block">
      <a>
        <img
          :style="[
            deal.expired ? { filter: 'grayscale(100%)', opacity: '50%' } : {},
          ]"
          class="w-32 h-32 rounded"
          :src="deal.image.imageUrl"
          :alt="deal.title"
        />
      </a>
    </div>
    <div class="flex-1 pl-0 relative">
      <div>
        <div class="flex-shrink-0 float-right mr-1 sm:hidden">
          <img
            :style="[deal.expired ? { filter: 'graysacle(100%)' } : {}]"
            class="w-16 h-16 rounded-md"
            :src="deal.image.imageUrl"
            :alt="deal.title"
          />
        </div>
      </div>
      <div
        :class="[deal.expired ? 'text-gray-500' : 'text-gray-800']"
        class="flex items-center"
      >
        <span
          v-if="deal.sustainable"
          class="inline-flex mr-3 justify-center items-center md:h-auto md:w-auto text-xs font-medium"
        >
          🌿 <span class="ml-2">Nachhaltig</span>
        </span>
        <span
          v-if="deal.free_shipping"
          class="inline-flex md:mr-3 justify-center items-center md:h-auto md:w-auto text-xs font-medium"
        >
          🚚 <span class="ml-2">Kostenloser Versand</span>
        </span>
      </div>
      <h3
        :class="[deal.expired ? 'text-gray-500' : 'text-gray-800']"
        class="font-bold md:text-lg leading-snug truncate max-w-xs md:max-w-truncate"
      >
        {{ deal.title }}
      </h3>

      <div class="flex flex-1 items-center justify-between">
        <div class="space-x-1">
          <span
            :class="[
              deal.expired ? 'text-gray-500' : 'text-green-500',
              'text-sm md:text-xl font-bold',
            ]"
            >{{ deal.price }}€</span
          >

          <span class="text-gray-400 line-through text-xs"
            >{{ deal.original_price }}€</span
          >

          <span
            :class="[
              deal.expired ? 'text-gray-600' : 'text-gray-800',
              'font-bold text-xs',
            ]"
            >{{ deal.discount }}</span
          >
        </div>
      </div>

      <div
        :class="[deal.expired ? 'text-gray-500' : 'text-gray-800']"
        class="hidden sm:block text-sm truncate max-w-sm lg:max-w-truncate"
      >
        {{ deal.description }}
      </div>

      <div class="flex justify-between items-center mt-2">
        <div class="text-xs text-gray-500">
          {{ deal.last_update }}
        </div>

        <div class="flex space-x-1">
          <coupon-button :coupon_code="deal.coupon_code"></coupon-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CouponButton from './CouponButton.vue'
export default {
  components: { CouponButton },
  props: {
    deal: {
      type: Object,
      required: true,
    },
  },
}
</script>
