export default {
  path: '/',
  redirect: '/home/index',
  meta: {
    rank: 1,
    icon: '',
    title: '首页',
  },
  children: [
    {
      path: '/home/index',
      name: 'Home',
      component: () => import('@/views/home/index.vue'),
      meta: {
        title: '首页',
      },
    },
  ],
} satisfies RouteConfigsTable
