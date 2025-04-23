import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxt/eslint",
    "@pinia/nuxt",
    "@nuxthub/core",
    "@vueuse/nuxt",
    "vue-sonner/nuxt",
    "@nuxt/icon",
    "nuxt-auth-utils",
    "@nuxt/ui"
  ],
  css: ['~/assets/css/main.css'],
  devtools: { enabled: true },
  compatibilityDate: "2024-11-01",
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
  hub: {
    database: true
  },
  ui: {
    colorMode: false
  }
})
