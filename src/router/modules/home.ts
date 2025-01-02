const Layout = () => import('@/layout/index.vue')

export default {
  path: '/',
  name: 'Index',
  component: Layout,
  redirect: '/home/index',
  meta: {
    rank: 0,
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
