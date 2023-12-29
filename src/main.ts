import { createApp } from "vue";
import { createPinia } from "pinia";
import "@/styles/index.scss";
import "@/plugins/index.ts";
import "bootstrap";
import router from "./router/index";
import axios from "axios";
import VueAxios from "vue-axios";
import VueSweetalert2 from "vue-sweetalert2";
// 引入 VeeValidate 元件
import { veeComponentPlugin } from "./plugins/vee-component";
import { fontComponentPlugin } from "./plugins/fontawesome";

import App from "./App.vue";
const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(veeComponentPlugin);
app.use(fontComponentPlugin);
app.use(router);
app.use(VueAxios, axios);
app.use(VueSweetalert2);
app.mount("#app");
