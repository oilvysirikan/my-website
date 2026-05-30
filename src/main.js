import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import router from './router'

import th from './locales/th.js'
import en from './locales/en.js'

const i18n = createI18n({
  legacy: false,
  locale: 'th', // set locale
  fallbackLocale: 'en', // set fallback locale
  messages: {
    th,
    en
  }
})

createApp(App).use(router).use(i18n).mount('#app')
