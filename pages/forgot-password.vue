<template>
  <div class="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div
      class="sm:mx-auto sm:w-full sm:max-w-md text-center flex justify-center"
    >
      <TheLogo class="" />
    </div>

    <div class="mt-4 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white p-8 shadow sm:rounded-lg sm:px-10">
        <h2 class="font-display text-3xl text-center">Passwort vergessen?</h2>

        <p class="my-4 text-center text-sm text-gray-600 max-w-md">
          Passwort vergessen? Gib die E-Mail-Adresse ein, mit der du dein
          Treedeals Konto erstellt hast. So können wir dir einen Link zum
          Zurücksetzen schicken.
        </p>
        <form
          class="space-y-4"
          method="POST"
          @submit.prevent="sendForgotPasswordEmail"
        >
          <TextInput
            name="email"
            :value.sync="form.data.email"
            :errors="form.errors"
            type="email"
            label="Email"
          />
          <div>
            <button
              type="submit"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-800 hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-green-700"
            >
              Absenden
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
          email: '',
        },
        errors: [],
      },
    }
  },
  methods: {
    async sendForgotPasswordEmail() {
      try {
        await this.$axios.get('sanctum/csrf-cookie')
        await this.$axios
          .post('forgot-password', {
            email: this.form.data.email,
          })
          .catch((errors) => {
            console.log(errors.response.data.errors)
            this.form.errors = errors.response.data.errors
          })
      } catch (e) {
        console.log(e)
      }
    },
  },
}
</script>
