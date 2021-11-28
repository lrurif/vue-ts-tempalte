import { createApp } from 'vue'
import App from '@/App.vue'
import router from "@/router/intercept"
import store from "@/store/index"
import Api from "@/api/index"
import "@/assets/css/index.css"
const app = createApp(App)
app.use(store);
app.config.globalProperties.$Api = Api;
app.use(router);
app.mount('#app')
