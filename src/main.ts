/** global component */
import CyButton from '@/components/CyButton/index.vue'

/** pinia */
import { setupStore } from '@/store'
/** motion */
import { MotionPlugin } from '@vueuse/motion'

import { createApp } from 'vue'

import App from './App.vue'

/** elementPlus */
import { useElementPlus } from './plugins/elementPlus'

import router from './router'

/** import public css */
import './styles/index.scss'

/** avoid vite hrm request reload slow */
import './styles/tailwind.css'

/** elementPlus css */
import 'element-plus/dist/index.css'

const app = createApp(App)
app.component('CyButton', CyButton)

setupStore(app)
app.use(router).use(MotionPlugin).use(useElementPlus)

app.mount('#app')
