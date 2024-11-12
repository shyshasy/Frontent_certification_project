import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/Auth/Login.vue'; 
import Dashboard from '../components/Dashboard.vue'; 
import Home from '../components/Layout/Home.vue'; 
import Register from '../components/Auth/Register.vue'; 
import ResetPassword from '../components/Auth/ResetPassword.vue'; // Importation de ResetPassword
import QueueManagement from '../components/QueueManagement.vue'; 
import EvaluationManager from '../components/EvaluationManager.vue';
import Utilisateur from '../components/Utilisateur.vue';
import Modal from '../components/Modal.vue';
import Header from '../components/Layout/Header.vue';
import GestionGuichet from '../components/GestionGuichet.vue';

const routes = [
  { path: '/login', component: Login }, // No protection needed for login
  { path: '/', redirect: '/login' }, // Redirect to login page by default
  { path: '/register', component: Register }, // No protection needed for register
  { path: '/reset-password', component: ResetPassword }, // No protection needed for reset password
  
  // Protect all other routes with requiresAuth
  { path: '/dashboard', component: Dashboard, meta: { requiresAuth: true } },
  { path: '/home', component: Home, meta: { requiresAuth: true } },
  { path: '/queue', component: QueueManagement, meta: { requiresAuth: true } },
  { path: '/evaluation-manager', component: EvaluationManager, meta: { requiresAuth: true } },
  { path: '/utilisateur', component: Utilisateur, meta: { requiresAuth: true } },
  { path: '/header', component: Header, meta: { requiresAuth: true } },
  { path: '/queue-management', component: QueueManagement, meta: { requiresAuth: true } },
  { path: '/gestion-guichet', component: GestionGuichet, meta: { requiresAuth: true } },
  { path: '/modal', component: Modal, meta: { requiresAuth: true } },
];

// Create the router instance
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Route protection based on authentication
router.beforeEach((to, from, next) => {
  // Check if the route requires authentication
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const userData = localStorage.getItem('user'); // Get user data from localStorage
    if (!userData) {
      next({ path: '/login' }); // Redirect to login if user data is not found
    } else {
      try {
        const user = JSON.parse(userData); // Try to parse user data
        if (user) {
          next(); // Allow navigation if the user is valid
        } else {
          next({ path: '/login' }); // Redirect to login if user is invalid
        }
      } catch (error) {
        console.error("Error parsing user data:", error); // Handle parsing errors
        next({ path: '/login' }); // Redirect to login on error
      }
    }
  } else {
    next(); // Allow navigation if no authentication is required
  }
});

export default router;
