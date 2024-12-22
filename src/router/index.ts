import NProgress from 'nprogress'

import {
  createRouter,
  createWebHistory,
  type Router,
  type RouteRecordRaw,
} from 'vue-router'
import 'nprogress/nprogress.css'

/** auto import static route */
const modules: Record<string, any> = import.meta.glob(['./modules/**/*.ts'], {
  eager: true,
})

/** origin static route */
const routes: Array<RouteRecordRaw> = []

/** push routes */
Object.keys(modules).forEach((key) => {
  routes.push(modules[key].default)
})

/** create router instance */
const router: Router = createRouter({
  history: createWebHistory(),
  routes,
})

/** route hook */
router.beforeEach((_to, _from, next) => {
  NProgress.start()
  next()
})
router.afterEach((_to) => {
  NProgress.done()
})

export default router
