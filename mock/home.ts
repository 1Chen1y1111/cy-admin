import { defineFakeRoute } from 'vite-plugin-fake-server/client'

export default defineFakeRoute([
  {
    url: '/login',
    method: 'post',
    response: ({ body }) => {
      if (body.username === 'admin') {
        return {
          success: true,
          data: {
            avatar: 'https://avatars.githubusercontent.com/u/44761321',
            username: 'admin',
            nickname: '1Chen1y1111',
          },
        }
      }
      else {
        return {
          success: true,
          data: {
            avatar: 'https://avatars.githubusercontent.com/u/52823142',
            username: 'common',
            nickname: '2Chen2y2222',
            roles: ['common'],
            permissions: ['permission:btn:add', 'permission:btn:edit'],
            accessToken: 'eyJhbGciOiJIUzUxMiJ9.common',
            refreshToken: 'eyJhbGciOiJIUzUxMiJ9.commonRefresh',
            expires: '2030/10/30 00:00:00',
          },
        }
      }
    },
  },
])
