import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

import { vitePluginFakeServer } from 'vite-plugin-fake-server'

export function getPluginsList() {
  return [
    vue(),

    vueJsx(),

    /** mock server */
    vitePluginFakeServer({
      logger: false,
      include: 'mock',
      infixName: false,
      enableProd: false,
    }),
  ]
}
