// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },
  modules: [
    "@nuxtjs/seo",
    "@nuxt/image",
    "@nuxt/content",
    "@nuxtjs/tailwindcss",
  ],
  css: ["public/static/css/style.css"],
  site: {
    url: "https://0x7ffed9b08230.dev",
    name: "0x7ffed9b08230 - Hayden",
    indexable: true,
  },
  devServer: {
    port: 80,
  },
  content: {
    highlight: {
      theme: "github-dark",
    },
  },
});
