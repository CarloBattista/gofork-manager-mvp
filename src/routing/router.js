import { createRouter, createWebHistory } from 'vue-router';

// OnBoard
import Signup from '../views/onBoard/Signup.vue';
import Signin from '../views/onBoard/Signin.vue';
import ForgotPassword from '../views/onBoard/Forgot-password.vue';
import PasswordReset from '../views/onBoard/Password-reset.vue';

// General
import Home from '../views/Home.vue';
import Dashboard from '../views/Dashboard.vue';

const routes = [
  // OnBoard
  {
    path: '/signup',
    name: 'signup',
    component: Signup,
    props: true,
    meta: { title: 'GoFork • Signup', requiresGuest: true },
  },
  {
    path: '/signin',
    name: 'signin',
    component: Signin,
    props: true,
    meta: { title: 'GoFork • Signin', requiresGuest: true },
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: ForgotPassword,
    props: true,
    meta: { title: 'GoFork • Password dimenticata', requiresGuest: true },
  },
  {
    path: '/password-reset',
    name: 'password-reset',
    component: PasswordReset,
    props: true,
    meta: { title: 'GoFork • Reimposta la nuova password', requiresGuest: true },
  },

  // General
  {
    path: '/',
    name: 'home',
    component: Home,
    props: true,
    meta: { title: 'GoFork • Home', requiresGuest: true },
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    props: true,
    meta: { title: 'GoFork • Dashboard', requiresAuth: true },
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

  // Controlla lo stato di autenticazione
  const isAuthenticated = localStorage.getItem('isAuthenticated');
  const authIsParsed = JSON.parse(isAuthenticated);

  // Se la rotta richiede di essere ospite (non autenticato) e l'utente è autenticato
  if (to.meta.requiresGuest && authIsParsed) {
    next({ name: 'dashboard' }); // Reindirizza alla home
    return;
  }

  // Se la rotta richiede autenticazione e l'utente non è autenticato
  if (to.meta.requiresAuth && !authIsParsed) {
    next({ name: 'signin' }); // Reindirizza al signin
    return;
  }

  next(); // Procedi normalmente
});

export default router;
