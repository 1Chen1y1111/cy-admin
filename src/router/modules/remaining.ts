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
  } satisfies RouteConfigsTable,
]
