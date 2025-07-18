import { createRouter, createWebHistory } from 'vue-router';

// OnBoard
import Signup from '../views/onBoard/Signup.vue';
import Signin from '../views/onBoard/Signin.vue';
import ForgotPassword from '../views/onBoard/Forgot-password.vue';
import PasswordReset from '../views/onBoard/Password-reset.vue';

// General
import Home from '../views/Home.vue';
import Dashboard from '../views/Dashboard.vue';

// Members
import Members from '../views/Members/Members.vue';
import InviteMembers from '../views/Members/Invite-members.vue';

// Profile
import CompleteProfile from '../views/Profile/Complete-profile.vue';

// Restaurant
import AddRestaurant from '../views/Restaurant/Add-restaurant.vue';

// Invite
import InvalidInvite from '../views/Invite/Invalid-invite.vue';

const routes = [
  // OnBoard
  {
    path: '/signup',
    name: 'signup',
    component: Signup,
    props: true,
    meta: { title: 'GoFork Manager • Signup', requiresGuest: true },
  },
  {
    path: '/signin',
    name: 'signin',
    component: Signin,
    props: true,
    meta: { title: 'GoFork Manager • Signin', requiresGuest: true },
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: ForgotPassword,
    props: true,
    meta: { title: 'GoFork Manager • Password dimenticata', requiresGuest: true },
  },
  {
    path: '/password-reset',
    name: 'password-reset',
    component: PasswordReset,
    props: true,
    meta: { title: 'GoFork Manager • Reimposta la nuova password', requiresGuest: true },
  },

  // General
  {
    path: '/',
    name: 'home',
    component: Home,
    props: true,
    meta: { title: 'GoFork Manager • Home' },
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    props: true,
    meta: { title: 'GoFork Manager • Dashboard', requiresAuth: true },
  },

  // Members
  {
    path: '/members',
    name: 'members',
    component: Members,
    props: true,
    meta: { title: 'GoFork Manager • Gestione del team', requiresAuth: true },
  },
  {
    path: '/members/invite',
    name: 'members-invite',
    component: InviteMembers,
    props: true,
    meta: { title: 'GoFork Manager', requiresAuth: true },
  },

  // Profile
  {
    path: '/complete-profile',
    name: 'complete-profile',
    component: CompleteProfile,
    props: true,
    meta: { title: 'GoFork Manager • Completa il profilo', requiresAuth: true },
  },

  // Restaurant
  {
    path: '/add-restaurant',
    name: 'add-restaurant',
    component: AddRestaurant,
    props: true,
    meta: { title: 'GoFork Manager • Aggiungi un ristorante', requiresAuth: true },
  },

  // Invite
  {
    path: '/invalid-invite',
    name: 'invalid-invite',
    component: InvalidInvite,
    props: true,
    meta: { title: 'GoFork Manager' },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const pageTitle = to.meta.title;
  if (pageTitle) {
    document.title = pageTitle;
  } else {
    document.title = 'GoFork Manager';
  }

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

  next();
});

export default router;
