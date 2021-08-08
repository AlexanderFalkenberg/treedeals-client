<template>
  <div class="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div
      class="sm:mx-auto sm:w-full sm:max-w-md text-center flex justify-center"
    >
      <TheLogo class="" />
    </div>

    <div class="mt-4 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white p-8 shadow sm:rounded-lg sm:px-10">
        <h2 class="font-display text-3xl text-center">Dein neues Passwort</h2>
        <p class="my-4 text-center text-sm text-gray-600 max-w-md">
          Hinweis: Ein sicheres Passwort sollte mehr als 6 Zeichen besitzen und
          aus Buchstaben, Zahlen und Sonderzeichen bestehen.
        </p>
        <form class="space-y-4" method="POST" @submit.prevent="register">
          <TextInput
            name="password"
            :value.sync="form.data.password"
            :errors="form.errors"
            type="password"
            label="Passwort"
          />

          <TextInput
            name="password"
            :value.sync="form.data.password_confirmation"
            :errors="form.errors"
            type="password"
            label="Passwort bestätigen"
          />

          <div>
            <button
              type="submit"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-800 hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-green-700"
            >
              Passwort zurücksetzen
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'auth',
  data() {
    return {
      form: {
        data: {
          email: this.$route.query.email || '',
          password: '',
          password_confirmation: '',
          token: this.$route.query.token || '',
        },
        errors: [],
      },
    }
  },
  methods: {
    async register() {
      try {
        await this.$axios.get('sanctum/csrf-cookie')

        await this.$axios
          .post('reset-password', {
            ...this.form.data,
          })
          .catch((errors) => {
            console.log(errors.response.data.errors)
            this.form.errors = errors.response.data.errors
          })

        this.$router.replace('login')
      } catch (e) {
        console.log(e)
      }
    },
  },
}
</script>
