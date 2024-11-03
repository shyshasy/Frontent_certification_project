import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '../components/Dashboard.vue'; 
import Home from '../components/Layout/Home.vue'; 
import Login from '../components/Auth/Login.vue'; 
import Register from '../components/Auth/Register.vue'; 
import UserProfile from '../components/User/UserProfile.vue'; 
import QueueManagement from '../components/QueueManagement.vue'; 

const routes = [
  { path: '/dashboard', component: Dashboard, meta: { requiresAuth: true } },
  { path: '/home', component: Home, meta: { requiresAuth: true } },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/user-profile', component: UserProfile, meta: { requiresAuth: true } },
  { path: '/queue', component: QueueManagement, meta: { requiresAuth: true } },
  { path: '/', redirect: '/login' },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Protection des routes
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const userData = localStorage.getItem('user');
    if (!userData) {
      next({ path: '/login' }); // Redirigez vers la page de connexion
    } else {
      try {
        const user = JSON.parse(userData);
        if (user) {
          next(); // Laissez passer la navigation
        } else {
          next({ path: '/login' }); // Redirigez vers la page de connexion si l'utilisateur n'est pas valide
        }
      } catch (error) {
        console.error("Erreur de parsing des données utilisateur :", error);
        next({ path: '/login' }); // En cas d'erreur de parsing, redirigez vers la connexion
      }
    }
  } else {
    next(); // Laissez passer la navigation
  }
});

export default router;
