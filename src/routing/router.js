import { createRouter, createWebHistory } from 'vue-router';

// OnBoard
import Signin from '../views/onBoard/Signin.vue';
import ForgotPassword from '../views/onBoard/Forgot-password.vue';
import PasswordReset from '../views/onBoard/Password-reset.vue';

// General
import Home from '../views/Home.vue';
import Dashboard from '../views/Dashboard.vue';

const routes = [
  // General
  {
    path: '/signin',
    name: 'signin',
    component: Signin,
    props: true,
    meta: { title: 'GoFork • Signin' },
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: ForgotPassword,
    props: true,
    meta: { title: 'GoFork • Password dimenticata' },
  },
  {
    path: '/password-reset',
    name: 'password-reset',
    component: PasswordReset,
    props: true,
    meta: { title: 'GoFork • Reimposta la nuova password' },
  },

  // General
  {
    path: '/',
    name: 'home',
    component: Home,
    props: true,
    meta: { title: 'GoFork • Home' },
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    props: true,
    meta: { title: 'GoFork • Dashboard' },
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
