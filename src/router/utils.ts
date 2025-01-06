import type { menuType } from '@/layout/types'
import { getMockAsyncRoutes } from '@/api/mock'
import { usePermissionStoreHook } from '@/store/modules/permission'
import { useUserStoreHook } from '@/store/modules/user'
import { cloneDeep, intersection, isAllEmpty } from '@pureadmin/utils'
import { createWebHashHistory, createWebHistory, type RouteComponent, type RouteRecordRaw, type RouterHistory } from 'vue-router'
import router from './index'

const IFrame = () => import('@/layout/iframe.vue')

// https://cn.vitejs.dev/guide/features.html#glob-import
const modulesRoutes = import.meta.glob('/src/views/**/*.{vue,tsx}')

/** Recorder routes  */
function reRankRoutes(data: any[]) {
  data.forEach((v, index) => {
    if (isRankExist(v))
      v.meta.rank = index + 2
  })

  return data.sort(
    (a: { meta: { rank: number } }, b: { meta: { rank: number } }) => {
      return a?.meta.rank - b?.meta.rank
    },
  )
}

/** Determine whether there is a rank attribute */
function isRankExist(routeInfo: any) {
  const { name, path, parentId, meta } = routeInfo
  return isAllEmpty(parentId)
    ? !!(isAllEmpty(meta?.rank)
      || (meta?.rank === 0 && name !== 'Home' && path !== '/'))
    : false
}

/** Check whether the two arrays a and b have an intersection  */
function isIntersection(a: Array<string>, b: Array<string>) {
  return Array.isArray(a) && Array.isArray(b)
    ? intersection(a, b).length > 0
    : true
}

/** Filter routes */
function filterTree(data: RouteComponent[]) {
  return filterNoPermissionTree(filterNoShowTree(filterNoChildrenTree(data)))
}

/** Filter routes with showLink false */
function filterNoShowTree(data: RouteComponent[]) {
  const newTree = cloneDeep(data).filter(
    (v: { meta: { showLink: boolean } }) => v.meta?.showLink !== false,
  )
  newTree.forEach(
    (v: { children }) => v.children && (v.children = filterNoShowTree(v.children)),
  )
  return newTree
}

/** Filters routes with no children or a children length of 0 */
function filterNoChildrenTree(data: RouteComponent) {
  const newTree = cloneDeep(data).filter(
    (v: any) => v?.children?.length !== 0,
  )
  newTree.forEach(
    (v: { children }) => v.children && (v.children = filterNoShowTree(v.children)),
  )
  return newTree
}

/** Get the roles of the currently logged in user from useUserStoreHook and filter out the menus without permission */
function filterNoPermissionTree(data: RouteComponent[]) {
  const currentRoles = useUserStoreHook().userInfo?.roles ?? []
  const newTree = cloneDeep(data).filter((v: any) =>
    isIntersection(v.meta?.roles, currentRoles),
  )
  newTree.forEach(
    (v: any) => v.children && (v.children = filterNoPermissionTree(v.children)),
  )
  return newTree
}

/** Handling routes from the backend */
function handleAsyncRoutes(routesList) {
  if (routesList.length === 0) {
    usePermissionStoreHook().handleWholeMenus(routesList)
  }
  else {
    formatFlatteningRoutes(formatAsyncRoutes(routesList)).forEach(
      (v: RouteRecordRaw) => {
        // Avoid static routes repeat add
        if (router.options.routes[0].children.findIndex(ev => ev.path === v.path) === -1) {
          router.options.routes[0].children.push(v)
          reRankRoutes(router.options.routes[0].children)
          if (!router.hasRoute(v?.name))
            router.addRoute(v)
          const flattenRouters: any = router
            .getRoutes()
            .find(ev => ev.path === '/')
          router.addRoute(flattenRouters)
        }
      },
    )
    usePermissionStoreHook().handleWholeMenus(routesList)
  }
  addPathMatch()
}

function addPathMatch() {
  if (!router.hasRoute('pathMatch')) {
    router.addRoute({
      path: '/:pathMatch(.*)',
      name: 'pathMatch',
      redirect: '/error/404',
    })
  }
}

/** Generate routes that match my custom specifications  */
function formatAsyncRoutes(routes: Array<RouteRecordRaw>) {
  if (!routes || !routes.length)
    return
  const modulesRoutesKeys = Object.keys(modulesRoutes)

  routes.forEach((v: RouteRecordRaw) => {
    // Backend routes tag
    v.meta.backstage = true
    // Reset redirect
    if (v?.children && v.children.length && !v.redirect) {
      v.redirect = v.children[0].path
    }
    // Reset name
    if (v?.children && v?.children.length && !v.name) {
      v.name = `${v.children[0].name as string}Parent`
    }
    // Set frameSrc
    if (v.meta?.frameSrc) {
      v.component = IFrame
    }
    else {
      // Make the component path compatible with the backend
      const index = v?.component
        ? modulesRoutesKeys.findIndex(ev => ev.includes(v.component as any))
        : modulesRoutesKeys.findIndex(ev => ev.includes(v.path))
      v.component = modulesRoutes[modulesRoutesKeys[index]]
    }
    if (v?.children && v.children.length) {
      formatAsyncRoutes(v.children)
    }
  })

  return routes
}

/** Init router */
function initRouter() {
  return new Promise((resolve) => {
    getMockAsyncRoutes().then(({ data }) => {
      console.log('🚀 ~ getMockAsyncRoutes ~ data:', data)
      handleAsyncRoutes(cloneDeep(data))
      resolve(router)
    })
  })
}

/**
 * Flatten multi-level nested routes into a one-dimensional array
 * @param routesList
 * @returns Flattened routes array
 */
function formatFlatteningRoutes(routesList: RouteRecordRaw[]): RouteRecordRaw[] {
  if (routesList.length === 0)
    return routesList

  const result: RouteRecordRaw[] = []

  const flatten = (hierarchyList) => {
    hierarchyList.forEach((route) => {
      result.push({ ...route, children: undefined })
      if (route.children) {
        flatten(route.children)
      }
    })
  }

  const hierarchyList = buildHierarchyTree(routesList)

  flatten(hierarchyList)
  return result
}

/**  */
function format2DRoutes(routeList: RouteRecordRaw[]) {
  if (routeList.length === 0)
    return routeList
  const _routeList: RouteRecordRaw[] = []
  routeList.forEach((v: RouteRecordRaw) => {
    if (v.path === '/') {
      _routeList.push({
        component: v.component,
        name: v.name,
        path: v.path,
        redirect: v.redirect,
        meta: v.meta,
        children: [],
      })
    }
    else {
      _routeList[0]?.children.push({ ...v })
    }
  })

  return _routeList
}

/**
 * @description Create a hierarchical relationship for the tree
 * @param tree origin data
 * @param pathList id pathList
 * @returns hierarchyTree
 */
function buildHierarchyTree(tree: any[], pathList = []): any {
  if (!Array.isArray(tree)) {
    throw new TypeError('tree must be an array')
  }

  if (!tree || tree.length === 0)
    return []

  return tree.map((node, index) => {
    node.id = index
    node.parentId = pathList.at(-1) ?? null
    node.pathList = [...pathList, node.id]

    if (Array.isArray(node.children) && node.children.length > 0) {
      node.children = buildHierarchyTree(
        node.children,
        node.pathList,
      )
    }

    return node
  })
}

/** Get the top menu in all menus */
function getTopMenu(): menuType {
  const topMenu = handleTopMenu(
    usePermissionStoreHook().wholeMenus[0]?.children[0],
  )

  // 插眼
  return topMenu
}

function handleTopMenu(route) {
  if (!route?.children || route.children.length <= 1) {
    return route
  }

  if (route.redirect) {
    return route.children.find(cur => cur.path === route.redirect)
  }

  return route.children[0]
}

/** Get router mode */
function getHistoryMode(routerHistory): RouterHistory {
  const [mode, base = ''] = routerHistory.split(',')
  if (mode === 'hash') {
    return createWebHashHistory(base)
  }
  else if (mode === 'h5') {
    return createWebHistory(base)
  }

  throw new Error(`Invalid history mode: ${mode}`)
}

export {
  buildHierarchyTree,
  filterNoChildrenTree,
  filterNoPermissionTree,
  filterNoShowTree,
  filterTree,
  format2DRoutes,
  formatFlatteningRoutes,
  getHistoryMode,
  getTopMenu,
  initRouter,
  isIntersection,
  reRankRoutes,
}
