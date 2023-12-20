import { createApp } from 'vue'

import '@/styles/index.scss'
import '@/plugins/index.ts'
import 'bootstrap'
// 引入 VeeValidate 元件跟功能
import { veeComponentPlugin } from './plugins/vee-component'

import App from './App.vue'

const app = createApp(App);

// 掛載 Global 的 VeeValidate 元件
// app.component('VField', Field);
// app.component('VForm', Form);
// app.component('ErrorMessage', ErrorMessage);

app.use(veeComponentPlugin).mount('#app')
