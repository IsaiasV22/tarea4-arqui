// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-01-01',
  modules: ['@nuxt/content', '@pinia/nuxt'],
  routeRules: {
    '/': { redirect: '/movies' }
  },
  app: {
    head: {
      title: 'IMDB Top 250',
      htmlAttrs: { lang: 'es' },
      link: [
        { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css' },
        { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/skeleton/2.0.4/skeleton.min.css' }
      ]
    }
  }
})
