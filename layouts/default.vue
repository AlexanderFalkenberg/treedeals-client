<template>
  <div class="relative subpixel-antialiased">
    <Nuxt />
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

/*!
 * Web Fonts from Fontspring.com
 *
 * All OpenType features and all extended glyphs have been removed.
 * Fully installable fonts can be purchased at http://www.fontspring.com
 *
 * The fonts included in this stylesheet are subject to the End User License you purchased
 * from Fontspring. The fonts are protected under domestic and international trademark and 
 * copyright law. You are prohibited from modifying, reverse engineering, duplicating, or
 * distributing this font software.
 *
 * (c) 2010-2021 Fontspring
 *
 *
 *
 *
 * The fonts included are copyrighted by the vendor listed below.
 *
 * Vendor:      Latinotype
 * License URL: https://www.fontspring.com/licenses/latinotype/webfont
 *
 *
 */

/* @font-face {
  font-family: 'recoleta-semibold';
  src: url('recoleta-semibold-webfont.woff2') format('woff2'),
    url('recoleta-semibold-webfont.woff') format('woff');
  font-weight: normal;
  font-style: normal;
} */
</style>
