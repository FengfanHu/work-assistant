import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Tag from '@/router/modules/Tag'
import Item from '@/router/modules/Item'
import Music from '@/router/modules/Music'
import Note from '@/router/modules/Note'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  Tag,
  Item,
  Music,
  Note
]

const router = new VueRouter({
  mode: process.env.IS_ELECTRON ? 'hash' : 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((route) => route.meta.requiresAuth)) {
    if (!localStorage.getItem('uid')) {
      next({ name: 'LoginMusic' })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
