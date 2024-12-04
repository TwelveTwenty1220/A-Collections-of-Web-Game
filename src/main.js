import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // 导入 Vue Router 配置
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app=createApp(App)
app.use(router)
app.use(ElementPlus)
app.mount('#app')
