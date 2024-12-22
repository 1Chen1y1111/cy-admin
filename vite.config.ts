import { type ConfigEnv, loadEnv, type UserConfigExport } from 'vite'
import { getPluginsList } from './build/plugins'
import { alias, pathResolve, root, wrapperEnv } from './build/utils'

export default ({ mode }: ConfigEnv): UserConfigExport => {
  const { VITE_PORT, VITE_PUBLIC_PATH } = wrapperEnv(loadEnv(mode, root))
  return {
    root,
    base: VITE_PUBLIC_PATH,
    resolve: {
      alias,
    },
    server: {
      port: VITE_PORT,
      host: '0.0.0.0',
      proxy: {
        '/api': {
          target: 'http://target.proxy.com',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, ''),
        },
      },
      warmup: {
        clientFiles: ['./index.html', './src/{views,components}/*'],
      },
    },
    plugins: getPluginsList(),
    optimizeDeps: {},
    build: {
      target: 'es2015',
      sourcemap: false,
      chunkSizeWarningLimit: 4000,
      rollupOptions: {
        input: {
          index: pathResolve('./index.html', import.meta.url),
        },
        // Static resource classification and packaging
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
        },
      },
    },
  }
}
