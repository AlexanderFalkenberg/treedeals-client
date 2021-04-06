<template>
  <div
    class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <img
        class="mx-auto h-12 w-auto"
        src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
        alt="Workflow"
      />
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Jetzt registrieren
      </h2>
      <p class="mt-2 text-center text-sm text-gray-600 max-w">
        Jetzt registrieren eigene Deals einreichen und zum Erhalt der Wälder
        beitragen.
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form class="space-y-4" method="POST" @submit.prevent="register">
          <div>
            <label
              for="password"
              class="block text-sm font-medium text-gray-700"
            >
              Benutzername
            </label>
            <div class="mt-1">
              <input
                v-model="form.username"
                id="username"
                name="username"
                type="username"
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-100 focus:border-green-100 sm:text-sm"
              />
              <div class="h-3 mt-1">
                <div class="text-xs text-red-500" v-if="errors.username">
                  {{ errors.username[0] }}
                </div>
              </div>
            </div>
          </div>

          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">
              Email-Adresse
            </label>
            <div class="mt-1">
              <input
                v-model="form.email"
                id="email"
                name="email"
                type="email"
                autocomplete="email"
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <div class="h-3 mt-1">
                <div class="text-xs text-red-500" v-if="errors.email">
                  {{ errors.email[0] }}
                </div>
              </div>
            </div>
          </div>

          <div>
            <label
              for="password"
              class="block text-sm font-medium text-gray-700"
            >
              Passwort
            </label>
            <div class="mt-1">
              <input
                v-model="form.password"
                id="password"
                name="password"
                type="password"
                autocomplete="current-password"
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-100 focus:border-green-100 sm:text-sm"
              />
              <div class="h-3 mt-1">
                <div class="text-xs text-red-500" v-if="errors.password">
                  {{ errors.password[0] }}
                </div>
              </div>
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div class="text-sm">
              <a
                href="#"
                class="font-medium text-green-500 hover:text-green-600"
              >
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-400 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Registrieren
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
        email: '',
        password: '',
      },
      errors: [],
    }
  },
  methods: {
    async register() {
      try {
        console.log('test')

        await this.$axios.get('sanctum/csrf-cookie')

        const res = await this.$axios
          .post('register', this.form)
          .catch((errors) => {
            console.log(errors.response.data.errors.username)
            this.errors = errors.response.data.errors
          })

        await this.$auth.loginWith('laravelSanctum', {
          data: this.form,
        })
      } catch (e) {
        console.log(e)
      }
    },
  },
}
</script>
