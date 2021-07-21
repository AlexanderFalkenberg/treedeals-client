<template>
  <div class="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div
      class="sm:mx-auto sm:w-full sm:max-w-md text-center flex justify-center"
    >
      <TheLogo class="" />
    </div>

    <div class="mt-4 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white p-8 shadow sm:rounded-lg sm:px-10">
        <form class="space-y-4" method="POST" @submit.prevent="register">
          <TextInput
            name="email"
            :value.sync="form.data.email"
            :errors="form.errors"
            type="text"
            label="Email oder Benutzername"
          />

          <TextInput
            name="password"
            :value.sync="form.data.password"
            :errors="form.errors"
            type="password"
            label="Passwort"
          />

          <div class="flex items-center justify-between">
            <div class="text-sm">
              <a href="#" class="text-green-800 hover:text-green-700">
                Passwort vergessen?
              </a>
            </div>
            <div class="text-sm">
              <nuxt-link
                to="register"
                class="text-green-800 hover:text-green-700"
              >
                Kein Konto?
              </nuxt-link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-800 hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-green-700"
            >
              Anmelden
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
          username: '',
          email: '',
          password: '',
        },
        errors: [],
      },
    }
  },
  methods: {
    async register() {
      try {
        await this.$axios.get('sanctum/csrf-cookie')

        await this.$auth
          .loginWith('laravelSanctum', {
            data: this.form.data,
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
