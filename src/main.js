import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { createI18n } from 'vue-i18n';
import VueCookies from 'vue-cookies'
import cookieconsent from 'vue-cookieconsent-component'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEye, faTrash, faEdit, faUser, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import portugueseIdiom from './locales/pt.json'
import englishIdiom from './locales/en.json'


library.add(faEye, faTrash, faEdit, faUser, faEyeSlash)


const i18n = createI18n({
    locale: 'pt', // idioma padrão
    messages: {
      en: englishIdiom,
      pt: portugueseIdiom
    }
})


const app = createApp(App)

//app.component('adsense', VueAdsense)
app.component('font-awesome-icon', FontAwesomeIcon)
app.component('cookie-consent', cookieconsent)


app.use(store)
app.use(router)
app.use(i18n)
app.use(VueCookies)

app.mount('#app')
