<template>
  <div class="relative">
    <div class="max-w-6xl mx-auto">
      <IndexNav />
      <Nuxt />
    </div>
    <transition name="slide-fade">
      <div
        v-show="event.show"
        class="fixed flex items-center z-40 bottom-0 right-0 m-4 text-sm py-4 px-4 bg-green-400 shadow rounded-md text-white transition"
      >
        <span class="font-bold text-green-800 mr-1">{{ event.text }} </span>
        wurde in die Zwischenablage kopiert
      </div>
    </transition>
  </div>
</template>

<script>
export default {
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
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
