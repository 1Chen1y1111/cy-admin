import { defineFakeRoute } from 'vite-plugin-fake-server/client'

export default defineFakeRoute([
  {
    url: '/login',
    method: 'post',
    response: ({ body }) => {
      if (body.account === 'admin') {
        return {
          code: 0,
          data: {
            avatar: 'https://avatars.githubusercontent.com/u/88277615',
            username: 'admin',
            nickname: '1Chen1y1111',
            roles: ['admin'],
            accessToken: 'eyJhbGciOiJIUzUxMiJ9.admin',
            refreshToken: 'eyJhbGciOiJIUzUxMiJ9.adminRefresh',
            expires: '2030/10/30 00:00:00',
          },
        }
      }
      else {
        return {
          code: 0,
          data: {
            avatar: 'https://p26-passport.byteacctimg.com/img/user-avatar/b4c4486425832d224fd60e8084db23b5~40x40.awebp',
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
