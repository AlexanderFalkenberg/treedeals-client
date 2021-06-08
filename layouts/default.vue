<template>
  <div class="relative min-h-screen flex flex-col">
    <IndexNav />
    <div class="max-w-7xl w-full mx-auto px-2 sm:px-4 lg:px-8 py-8">
      <div class="grid grid-cols-12 gap-4">
        <div class="hidden lg:block col-span-2"><IndexSidenavLeft /></div>
        <main class="col-span-12 lg:col-span-8">
          <Nuxt />
        </main>
        <div class="hidden lg:block col-span-2"><IndexSidenavRight /></div>
      </div>
    </div>
    <TheFooter />
    <transition>
      <div v-if="event.show" class="fixed min-w-full bottom-0 z-40">
        <div class="bg-gray-800 text-white px-6 py-4 text-center shadow-lg">
          <span class="font-bold uppercase">{{ event.text }}</span> wurde in die
          Zwischenablage kopiert
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import IndexNav from '~/components/IndexNav.vue'

export default {
  components: { IndexNav },
  head() {
    const i18nHead = this.$nuxtI18nHead({ addSeoAttributes: true })
    return {
      title: this.$t('Schnäppchen und Angebote'),
      titleTemplate: '%s -  Treedeals',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid:
            'Schnäppchenplattform die Bäume pflanzt | Schnäppchen und Gutscheine',
          name: 'Treedeals | Schnäppchen und Gutschein',
          content:
            'Treedeals ist eine Plattform für Schnäppchen, Gutscheine und Produkte, die den Großteil seines Gewinns in Aufforstungsprojekte weltweit investiert.',
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'Schnäppchenplattform die Bäume pflanzt',
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content:
            'Spannende Angebote, Gutscheine und nachhaltige Produkte mit dem grünen Extra',
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content:
            'https://a.storyblok.com/f/111247/1200x657/55ab3e08a9/social.png',
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: 'Schnäppchenplattform die Bäume pflanzt',
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content:
            'Spannende Angebote, Gutscheine und nachhaltige Produkte mit dem grünen Extra',
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content:
            'https://a.storyblok.com/f/111247/1200x657/55ab3e08a9/social.png',
        },
        {
          hid: 'twitter:image:alt',
          name: 'twitter:image:alt',
          content:
            'https://a.storyblok.com/f/111247/1200x657/55ab3e08a9/social.png',
        },
      ],
    }
  },
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

<i18n>
{
  "ru": {
    "Schnäppchen und Angebote": "Скидки и промокоды"
  }
}
</i18n>

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
