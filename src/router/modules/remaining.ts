export default [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    name: 'Login',
    meta: {
      rank: 101,
      title: '登录',
      showLink: false,
    },
  },
  // {
  //   path: "/redirect",
  //   component: Layout,
  //   meta: {
  //     title: "加载中...",
  //     showLink: false,
  //     rank: 102
  //   },
  //   children: [
  //     {
  //       path: "/redirect/:path(.*)",
  //       name: "Redirect",
  //       component: () => import("@/layout/redirect.vue")
  //     }
  //   ]
  // }
] satisfies Array<RouteConfigsTable>
