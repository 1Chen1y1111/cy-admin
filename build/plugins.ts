import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { vitePluginFakeServer } from 'vite-plugin-fake-server'
import removeNoMatch from 'vite-plugin-router-warn'

import svgLoader from 'vite-svg-loader'

export function getPluginsList() {
  return [
    vue(),

    vueJsx(),

    /** mock server */
    vitePluginFakeServer({
      logger: false,
      include: 'mock',
      basename: '/mock',
      infixName: false,
      enableProd: false,
    }),

    /** svg componentization support */
    svgLoader({
      svgoConfig: {
        plugins: ['prefixIds'],
      },
    }),

    /** Remove no match found for location with path warning */
    removeNoMatch(),
  ]
}
