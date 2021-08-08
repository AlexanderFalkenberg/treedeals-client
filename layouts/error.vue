<template>
  <div>
    <main
      class="flex-grow mx-auto max-w-7xl w-full flex flex-col px-4 sm:px-6 lg:px-10"
    >
      <div
        v-if="error.statusCode === 404"
        class="flex-shrink-0 my-auto py-16 sm:py-32"
      >
        <p class="text-sm font-semibold text-green-400 uppercase tracking-wide">
          404 error
        </p>
        <h1
          class="mt-2 text-4xl font-extrabold text-green-900 tracking-tight sm:text-5xl"
        >
          Die wurde Seite nicht gefunden
        </h1>
        <p class="mt-2 text-base text-gray-500">
          Es sieht so aus, als wurde diese Seite verschoben oder gelöscht. Mit
          einem Klick unten auf den Link kommst du zurück zur Startseite.
        </p>
        <div class="mt-3">
          <nuxt-link
            to="/"
            href="#"
            class="text-base font-medium text-green-400 hover:text-green-500"
            >Go back home<span aria-hidden="true"> &rarr;</span></nuxt-link
          >
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  props: ['error'],
  layout: 'default', // you can set a custom layout for the error page
}
</script>
