// https://v3.nuxtjs.org/api/configuration/nuxt.config

import vuetify from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  css: ["vuetify/styles/main.sass", '@/assets/global.css', "@mdi/font/css/materialdesignicons.css"],
  vite: {
    ssr: {
      noExternal: ['vuetify'] 
    }
  },
  plugins: [
    '@/plugins/vue-signature-pad',
  ],
  modules: [
    '@pinia/nuxt',
    async (options, nuxt) => {
      // @ts-ignore
      nuxt.hooks.hook('vite:extendConfig', config => config.plugins.push(
        vuetify()
      ))
    },
  ],
  app: {
    head: {
      title: 'Forms BASC',
      meta: [
        {name: 'description', content: 'Bondi BASC Forms'}
      ],
      link: [
        {rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Open+Sans&family=Quicksand&display=swap' },
        // {rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons'}
      ]
    }
  },
  runtimeConfig: {
    // serviceAccountKey: process.env.serviceAccountKey
    project_id: process.env.project_id,
    private_key: process.env.private_key,
    client_email: process.env.client_email,
    storage_bucket: process.env.storage_bucket,
   // currencyKey: process.env.CURRENCY_API_KEY,
  }
})