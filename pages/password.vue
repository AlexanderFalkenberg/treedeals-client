<template>
  <form
    class="space-y-4 max-w-lg mx-auto mt-4"
    method="POST"
    @submit.prevent="updateProfileInformation"
  >
    <TextInput
      name="password"
      class="w-2/3"
      :value.sync="form.data.password"
      :errors="form.errors"
      type="text"
      label="Benutzername"
    />

    <TextInput
      name="email"
      :value.sync="form.data.email"
      :errors="form.errors"
      type="text"
      label="Email"
    />

    <div>
      <button
        type="submit"
        class="w-1/2 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-800 hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-green-700"
      >
        Speichern
      </button>
    </div>
  </form>
</template>

<script>
export default {
  layout: 'app',
  data() {
    return {
      form: {
        data: {
          username: 'test',
          email: this.$auth.user.email,
        },
        errors: [],
      },
    }
  },
  methods: {
    async updateProfileInformation() {
      try {
        await this.$axios.get('sanctum/csrf-cookie')

        await this.$axios
          .put('user/profile-information', this.form.data)
          .catch((errors) => {
            console.log(errors.response.data.errors)
            this.form.errors = errors.response.data.errors
          })

        await this.$auth.fetchUser()
      } catch (e) {
        console.log(e)
      }
    },
  },
}
</script>
