import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@/styles/index.scss'
import '@/plugins/index.ts'
import 'bootstrap'
// 引入 VeeValidate 元件
import { veeComponentPlugin } from './plugins/vee-component'

import App from './App.vue'
const pinia = createPinia()
const app = createApp(App);

app.use(pinia)
app.use(veeComponentPlugin)
app.mount('#app')
