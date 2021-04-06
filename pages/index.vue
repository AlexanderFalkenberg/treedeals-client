<template>
  <div class="">
    <template v-if="!$auth.loggedIn">
      <nuxt-link to="/register">
        <link-button>Registrieren</link-button>
      </nuxt-link>
    </template>
    <div class="sm:grid grid-cols-12 gap-4 py-4 px-2 sm:px-4 lg:px-8">
      <div class="hidden sm:block sm:col-span col-span-2">
        <TheSidenav />
      </div>
      <div class="col-span-10 px-2">
        <div class="space-y-4">
          <div v-for="deal in deals" :key="deal.id">
            <deal-card :deal="deal" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TheSidenav from '~/components/IndexSidenav.vue'
import { mapGetters, mapActions } from 'vuex'
import DealCard from '~/components/DealCard.vue'
import LinkButton from '~/components/LinkButton.vue'
export default {
  components: { TheSidenav, DealCard, LinkButton },
  computed: {
    ...mapGetters({
      deals: 'deals/deals',
    }),
  },
  methods: {
    ...mapActions({
      getDeals: 'deals/getDeals',
    }),
  },
  mounted() {
    this.getDeals()
  },
}
</script>

<style></style>
