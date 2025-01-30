// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxt/eslint",
    "@pinia/nuxt",
    "@nuxthub/core",
  ],
  devtools: { enabled: true },
  compatibilityDate: "2024-11-01",
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
})