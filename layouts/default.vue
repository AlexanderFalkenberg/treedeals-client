<template>
  <div class="relative min-h-screen flex flex-col">
    <IndexNav />
    <Nuxt />
    <TheFooter />
    <transition>
      <div
        v-if="event.show"
        class="fixed bottom-5 z-40 right-1/2 transform translate-x-1/2 px-6 py-3 rounded bg-green-500 text-white shadow-lg"
      >
        <span class="font-bold uppercase">{{ event.text }}</span> wurde in die
        Zwischenablage kopiert
      </div>
    </transition>
  </div>
</template>

<script>
import IndexNav from '~/components/IndexNav.vue'

export default {
  components: { IndexNav },
  data() {
    return {
      event: {
        show: false,
        text: '',
      },
    }
  },
  created() {
    this.$nuxt.$on('copy-event', (text) => {
      if (this.event.show === false)
        setTimeout(() => {
          this.event.show = false
        }, 3000)
      this.event.show = true
      this.event.text = text
    })
  },
}
</script>

<style>
.slide-fade-enter-active {
  transition: all 0.5s ease;
}
.slide-fade-leave-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}

.page-enter-active,
.page-leave-active {
  transition-property: opacity;
  transition-timing-function: ease-in-out;
  transition-duration: 400ms;
}
.page-enter,
.page-leave-to {
  opacity: 0;
}
</style>
