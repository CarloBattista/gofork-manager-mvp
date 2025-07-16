import { createRouter, createWebHistory } from 'vue-router';

// OnBoard
import Signin from '../views/onBoard/Signin.vue';

// General
import Home from '../views/Home.vue';

const routes = [
  // General
  {
    path: '/signin',
    name: 'signin',
    component: Signin,
    props: true,
    meta: { title: 'GoFork • Signin' },
  },

  // General
  {
    path: '/',
    name: 'home',
    component: Home,
    props: true,
    meta: { title: 'GoFork • Home' },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const pageTitle = to.meta.title;
  if (pageTitle) {
    document.title = pageTitle;
  } else {
    document.title = 'GoFork';
  }
  next();
});

export default router;
