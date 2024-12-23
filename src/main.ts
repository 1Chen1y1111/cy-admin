/** pinia */
import { setupStore } from '@/store'
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

setupStore(app)
app.use(router).use(useElementPlus)

app.mount('#app')
