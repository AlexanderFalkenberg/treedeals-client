<template>
  <div class="max-w-lg mx-auto space-y-4">
    <h1 class="font-display text-2xl">Dein Konto</h1>
    <form
      class="space-y-4 p-8 mt-4 bg-white rounded"
      method="POST"
      @submit.prevent="updateProfileInformation"
    >
      <h2 class="text-xl">Dein Profil</h2>
      <TextInput
        name="username"
        class="w-2/3"
        :value.sync="form.profile.username"
        :errors="form.errors"
        type="text"
        label="Benutzername"
      />

      <TextInput
        name="email"
        :value.sync="form.profile.email"
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
    <form
      class="space-y-4 p-8 mt-4 bg-white rounded"
      @submit.prevent="updatePassword"
    >
      <h2 class="text-xl">Password ändern</h2>
      <TextInput
        name="current_password"
        class="w-2/3"
        :value.sync="form.password.current_password"
        :errors="form.errors"
        type="password"
        label="Aktuelles Passwort"
      />

      <TextInput
        name="email"
        :value.sync="form.password.password"
        :errors="form.errors"
        type="password"
        label="Neues Password"
      />

      <TextInput
        name="username"
        class="w-2/3"
        :value.sync="form.password.password_confirmation"
        :errors="form.errors"
        type="password"
        label="Passwort bestätigen"
      />

      <button
        type="submit"
        class="w-1/2 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-800 hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-green-700"
      >
        Password ändern
      </button>
    </form>
  </div>
</template>

<script>
export default {
  layout: 'app',
  middleware: ['auth', 'verified'],
  data() {
    return {
      form: {
        profile: {
          username: this.$auth.user.username,
          email: this.$auth.user.email,
        },
        password: {
          current_password: '',
          password: '',
          password_confirmation: '',
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
          .put('user/password', this.form.profile)
          .catch((errors) => {
            console.log(errors.response.data.errors)
            this.form.errors = errors.response.data.errors
          })

        await this.$auth.fetchUser()
      } catch (e) {
        console.log(e)
      }
    },
    async updatePassword() {
      try {
        await this.$axios.get('sanctum/csrf-cookie')

        await this.$axios
          .put('user/password', this.form.password)
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
