import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/Auth/Login.vue'; 
import Dashboard from '../components/Dashboard.vue'; 
import Home from '../components/Layout/Home.vue'; 
import Register from '../components/Auth/Register.vue'; 
// import ResetPassword from '../components/Auth/ResetPassword.vue'; 
import QueueManagement from '../components/QueueManagement.vue'; 
import EvaluationManager from '../components/EvaluationManager.vue';
import Utilisateur from '../components/Utilisateur.vue';
import Modal from '../components/Modal.vue';
import Header from '../components/Layout/Header.vue';
import GestionGuichet from '../components/GestionGuichet.vue';
// import PrendreTicket from '../components/PrendreTicket.vue'
import TicketManager from '../components/TicketManager.vue' ;

import  ResetPassword from '../components/Auth/ResetPassword.vue';
import ForgetPassword from '../components/Auth/ForgetPassword.vue';

const routes = [
  { path: '/login', component: Login }, // No protection needed for login
  { path: '/', redirect: '/login' }, // Redirect to login page by default
  { path: '/register', component: Register }, // No protection needed for register
  { path: '/reset-password', component:ResetPassword }, // No protection needed for reset password
  
  // Protect all other routes with requiresAuth
  { path: '/dashboard', component: Dashboard,  },
  { path: '/home', component: Home,  },
  { path: '/queue', component: QueueManagement,  },
  { path: '/evaluation-manager', component: EvaluationManager, },
  { path: '/utilisateur', component: Utilisateur, },
  { path: '/header', component: Header,  },
  { path: '/queue-management', component: QueueManagement, },
  { path: '/gestion-guichet', component: GestionGuichet, },
  { path: '/modal', component: Modal,  },
  // { path: '/prendre-ticket', component: PrendreTicket, },
  { path: '/ticket-manager', component:TicketManager, } ,
  { path: '/forget-password', component:ForgetPassword, }
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
