import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@/styles/index.scss'
import '@/plugins/index.ts'
import 'bootstrap'
import router from "./router/index";
// 引入 VeeValidate 元件
import { veeComponentPlugin } from './plugins/vee-component'
import { fontComponentPlugin } from './plugins/fontawesome'

import App from './App.vue'
const pinia = createPinia()
const app = createApp(App);

app.use(pinia)
app.use(veeComponentPlugin)
app.use(fontComponentPlugin)
app.use(router)
app.mount('#app')
