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
        <button
          class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-400 hover:bg-green-500 focus:ring-4 focus:ring-green-500 focus:ring-opacity-50"
        >
          Deal einreichen
        </button>
      </div>
    </div>

    <div class="max-w-md mx-auto py-2 space-y-4">
      <TextInput
        name="link"
        label="Link zum Deal"
        :input.sync="form.link"
        :errors="errors"
      />
      <TextInput
        name="title"
        label="Bezeichnung des Deals"
        :input.sync="form.title"
        :errors="errors"
      />
      <div class="flex justify-between space-x-4 ">
        <TextInput
          name="original_preis"
          label="Originalpreis"
          :input.sync="form.price"
          :errors="errors"
        />
        <TextInput
          name="price"
          label="Preis"
          :input.sync="form.price"
          :errors="errors"
        />
      </div>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      form: {
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
          .post('api/deals', this.form)
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
