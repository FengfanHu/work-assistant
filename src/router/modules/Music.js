import Login from '@/views/music/Login.vue'
import ShowUser from '@/views/music/Show.vue'
import PlayList from '@/views/music/PlayList.vue'
import LayoutMusic from '@/views/music/index.vue'

export default {
  path: '/music',
  component: LayoutMusic,
  children: [
    {
      path: 'login',
      name: 'LoginMusic',
      component: Login
    },
    {
      path: 'user',
      name: 'ShowUser',
      component: ShowUser,
      children: [
        {
          path: 'playlist/:id',
          name: 'PlayList',
          component: PlayList,
          meta: { requiresAuth: true }
        }
      ],
      meta: { requiresAuth: true }
    }
  ]
}
