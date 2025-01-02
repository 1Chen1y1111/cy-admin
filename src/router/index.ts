import { useUserStoreHook } from '@/store/modules/user'

import { multipleTabsKey, removeToken } from '@/utils/auth'
import { buildHierarchyTree, isUrl, openLink } from '@pureadmin/utils'
import Cookies from 'js-cookie'
import NProgress from 'nprogress'

import {
  createRouter,
  createWebHistory,
  type RouteComponent,
  type Router,
  type RouteRecordRaw,
} from 'vue-router'
import remainingRouter from './modules/remaining'
import { format2DRoutes, formatFlatteningRoutes, isIntersection, reRankRoutes } from './utils'
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
  history: createWebHistory(),
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
    _to.matched.forEach((v) => {
      if (!v.meta.title)
        return ''
      document.title = v.meta.title as string
    })
  }

  function toCorrectRoute() {
    whiteList.includes(_to.fullPath) ? next(_from.fullPath) : next()
  }

  if (Cookies.get(multipleTabsKey) && userInfo) {
    // Check permission
    if (_to.meta?.roles && !isIntersection(_to.meta?.roles, userInfo?.roles)) {
      next({ path: '/error/403' })
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

    // 插眼
    // // When the user refreshes the browser
    // if (usePermissionStoreHook().wholeMenus.length === 0 && _to.path !== 'login') {
    //   console.log('init router', usePermissionStoreHook().wholeMenus)
    // }
    toCorrectRoute()
  }
  else {
    if (_to.path === '/login') {
      next()
      return
    }

    if (whiteList.includes(_to.path)) {
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
