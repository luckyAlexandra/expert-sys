/*
 * @Author: zengping.liu 
 * @Date: 2021-12-06 11:09:31 
 * @Last Modified by: zengping.liu
 * @Last Modified time: 2021-12-08 15:16:00
 */

import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import store from './store'
import router from './router/index.js'

import { initDB } from './db/index'

import '@/styles/index.scss' 
import '@/permission'

const app = createApp(App)
initDB()

app.use(ElementPlus).use(store).use(router).mount('#app')
