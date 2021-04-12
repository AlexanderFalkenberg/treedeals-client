<template>
  <form class="max-w-6xl px-8" method="POST" @submit.prevent="store">
    <div
      class="bg-gray-100 flex items-center rounded-md justify-between mx-auto p-4"
    >
      <div class="">
        <h1 class="text-2xl font-bold leading-tight">Deal einreichen</h1>
        <p class="text-sm text-gray-700">
          Um unsere Community zu schützen prüfen wir alle Deals, bevor wir diese
          veröffentlichen. <br />
          Das dauert in der Regel nicht länger als ein Werktag.
        </p>
      </div>
      <div class="flex justify-end space-x-2">
        <button>Einreichen</button>
      </div>
    </div>

    <div class="max-w-md mx-auto py-2 space-y-4 mt-4">
      <TextInput
        name="link"
        placeholder="Link zum Deal"
        :input.sync="deal.link"
        :errors="errors"
      />
      <TextInput
        name="title"
        placeholder="Bezeichnung des Deals"
        :input.sync="deal.title"
        :errors="errors"
      />
      <TextAreaInput
        name="description"
        placeholder="Beschreibung deines Deals"
        :input.sync="deal.description"
        :errors="errors"
      />
      <TextInput
        name="original_price"
        placeholder="Originalpreis"
        :input.sync="deal.original_price"
        :errors="errors"
      />
      <TextInput
        name="price"
        placeholder="Preis"
        :input.sync="deal.price"
        :errors="errors"
      />
    </div>
  </form>
</template>

<script>
import CardTest from '~/components/CardTest.vue'
export default {
  data() {
    return {
      deal: {
        link: '',
        title: '',
        description: '',
        price: '',
        original_price: '',
      },
      errors: [],
    }
  },
  methods: {
    async store() {
      try {
        await this.$axios.get('sanctum/csrf-cookie')
        const res = await this.$axios
          .post('api/deals', this.deal)
          .catch((errors) => {
            console.log(errors.response.data.errors.username)
            this.errors = errors.response.data.errors
          })
      } catch (e) {
        console.log(e)
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
