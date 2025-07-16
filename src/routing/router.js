import { createRouter, createWebHistory } from 'vue-router';

// General
import Home from '../views/Home.vue';

const routes = [
  // General
  {
    path: '/',
    name: 'home',
    component: Home,
    props: true,
    meta: { title: 'GoFork • Home', requiresGuest: true },
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

  const isAuthenticated = localStorage.getItem('isAuthenticated');
  const authIsParsed = JSON.parse(isAuthenticated);

  // Se la rotta richiede di essere ospite (non autenticato) e l'utente è autenticato
  if (to.meta.requiresGuest && authIsParsed) {
    next({ name: 'home' }); // Reindirizza alla home
    return;
  }

  // Se la rotta richiede autenticazione e l'utente non è autenticato
  if (to.meta.requiresAuth && !authIsParsed) {
    next({ name: 'signin' }); // Reindirizza al signin
    return;
  }

  next();
});

export default router;
