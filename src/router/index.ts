import { usePermissionStoreHook } from '@/store/modules/permission'

import { useUserStoreHook } from '@/store/modules/user'
import { multipleTabsKey, removeToken } from '@/utils/auth'
import { buildHierarchyTree, isAllEmpty, isUrl, openLink } from '@pureadmin/utils'
import Cookies from 'js-cookie'

import NProgress from 'nprogress'
import {
  createRouter,
  type RouteComponent,
  type Router,
  type RouteRecordRaw,
} from 'vue-router'
import remainingRouter from './modules/remaining'
import { format2DRoutes, formatFlatteningRoutes, getHistoryMode, initRouter, isIntersection, reRankRoutes } from './utils'
import 'nprogress/nprogress.css'

/** Auto import static route */
const modules: Record<string, any> = import.meta.glob(
  ['./modules/**/*.ts', '!./modules/**/remaining.ts'],
  {
    eager: true,
  },
)

/** Origin static route */
const routes: Array<RouteRecordRaw> = []

/** Push routes */
Object.keys(modules).forEach((key) => {
  routes.push(modules[key].default)
})

/** 2D routes */
export const constantRoutes: Array<RouteRecordRaw> = format2DRoutes(
  formatFlatteningRoutes(buildHierarchyTree(reRankRoutes(routes.flat(Infinity)))),
)

/** Render routes menu */
export const constantMenus: Array<RouteComponent> = reRankRoutes(routes.flat(Infinity)).concat(...remainingRouter)

/** Remaining menu */
export const remainingPaths = Object.keys(remainingRouter).map((v) => {
  return remainingRouter[v].path
})

/** Create router instance */
const router: Router = createRouter({
  history: getHistoryMode(import.meta.env.VITE_ROUTE_HISTORY),
  routes: constantRoutes.concat(...remainingRouter),
  strict: true,
})

/** Route whiteList */
const whiteList = ['/login']

/** Route hook */
router.beforeEach((_to: ToRouteType, _from, next) => {
  NProgress.start()

  const userInfo = useUserStoreHook().userInfo
  const externalLink = isUrl(_to?.name as string)

  if (!externalLink) {
    const matchedRoute = _to.matched.find(v => v.meta.title)
    if (matchedRoute) {
      document.title = matchedRoute.meta.title as string
    }
  }

  function toCorrectRoute() {
    whiteList.includes(_to.fullPath) ? next(_from.fullPath) : next()
  }

  if (Cookies.get(multipleTabsKey) && userInfo) {
    // Check permission
    if (_to.meta?.roles && !isIntersection(_to.meta?.roles, userInfo?.roles)) {
      next({ path: '/error/403' })
      return
    }

    if (_from.name) {
      if (externalLink) {
        openLink(_to?.name as string)
        NProgress.done()
        return
      }
      toCorrectRoute()
      return
    }

    // When the user refreshes the browser
    if (usePermissionStoreHook().wholeMenus.length === 0 && _to.path !== 'login') {
      initRouter().then((router: Router) => {
        // Ensure that dynamic routes are fully added to the routing table and don't affect static routes
        if (isAllEmpty(_to.name))
          router.push(_to.fullPath)

        console.log(router.getRoutes(), 'routerrouter')
      })
    }
    toCorrectRoute()
  }
  else {
    if (_to.path === '/login' || whiteList.includes(_to.path)) {
      next()
    }
    else {
      removeToken()
      next({ path: '/login' })
    }
  }
})

router.afterEach((_to) => {
  NProgress.done()
})

export default router
