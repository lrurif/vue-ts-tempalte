import { createApp } from 'vue'
import App from '@/App.vue'
import router from "@/router/intercept"
import store from "@/store/index"
import Api from "@/api/index"
import "@/assets/css/index.css"
import "./mock"
const app = createApp(App)
app.config.globalProperties.$Api = Api;
app.use(store);
app.use(router);
app.mount('#app')
