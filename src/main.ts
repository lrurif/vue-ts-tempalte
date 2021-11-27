import { createApp } from 'vue'
import App from './App.vue'
import router from "./router/intercept"
import store from "./store/index"
import "@/assets/css/index.css"
const app = createApp(App)
app.use(store)
app.use(router)
app.mount('#app')
