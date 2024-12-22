/** pinia */
import { setupStore } from '@/store'
import { createApp } from 'vue'
import App from './App.vue'

/** elementPlus */
import { useElementPlus } from './plugins/elementPlus'

import router from './router'

/** reset scss */
import './styles/reset.scss'

const app = createApp(App)

setupStore(app)
app.use(router).use(useElementPlus)

app.mount('#app')
