import { defineFakeRoute } from 'vite-plugin-fake-server/client'

/**
 * roles：页面级别权限，这里模拟二种 "admin"、"common"
 * admin：管理员角色
 * common：普通角色
 */
const permissionRouter = {
  path: '/permission',
  meta: {
    title: '权限管理',
    icon: 'ep:lollipop',
    rank: 10,
  },
  children: [
    {
      path: '/permission/page/index',
      name: 'PermissionPage',
      meta: {
        title: '页面权限',
        roles: ['admin', 'common'],
      },
    },
    {
      path: '/permission/button',
      meta: {
        title: '按钮权限',
        roles: ['admin', 'common'],
      },
      children: [
        {
          path: '/permission/button/one',
          component: 'permission/button/index',
          name: 'PermissionButtonOne',
          meta: {
            title: '按钮一',
            auths: [
              'permission:btn:add',
              'permission:btn:edit',
              'permission:btn:delete',
            ],
          },
        },
        {
          path: '/permission/button/two',
          component: 'permission/button/two',
          name: 'PermissionButtonTwo',
          meta: {
            title: '按钮二',
          },
        },
      ],
    },
  ],
}

export default defineFakeRoute([
  {
    url: '/get-async-routes',
    method: 'get',
    response: () => {
      return {
        code: 0,
        data: [permissionRouter],
      }
    },
  },
])
