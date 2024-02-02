import './assets/main.css'
import Toast from 'vue-toastification'

import { createPinia } from 'pinia'
import { createSSRApp } from 'vue'
import App from './App.vue'
import { createRouter } from './router'
import 'vue-toastification/dist/index.css'

export function createApp() {
    const app = createSSRApp(App)
    const pinia = createPinia()
    app.use(pinia)
    app.use(Toast)
    const router = createRouter()
    app.use(router)
    return { app, router }
}
