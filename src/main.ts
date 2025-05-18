import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { i18n } from './utils/i18n'

createApp(App).use(ElementPlus).use(router).use(i18n).mount('#app')
