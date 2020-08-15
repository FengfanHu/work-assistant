import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import About from '../views/About.vue';
import AddTag from '../views/tags/Add.vue';
import ManageTag from '../views/tags/Manage.vue';
import LayoutTag from '../views/tags/index.vue';
import AddItem from '../views/items/Add.vue';
import ShowItem from '../views/items/Show.vue';
import EditItem from '../views/items/Edit.vue';
import LayoutItem from '../views/items/index.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
  {
    path: '/tag',
    component: LayoutTag,
    children: [
      { path: 'add', name: 'AddTag', component: AddTag },
      { path: 'manage', name: 'ManageTag', component: ManageTag },
    ],
  },
  {
    path: '/item',
    component: LayoutItem,
    children: [
      { path: 'add', name: 'AddItem', component: AddItem },
      { path: 'show/:id', name: 'ShowItem', component: ShowItem },
      { path: 'edit/:id', name: 'EditItem', component: EditItem },
    ],
  },
];

const router = new VueRouter({
  mode: process.env.IS_ELECTRON ? 'hash' : 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
