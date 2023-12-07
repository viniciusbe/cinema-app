// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui"],
  pages: true,
  build: {
    transpile: ["@vuepic/vue-datepicker"],
  },
});
