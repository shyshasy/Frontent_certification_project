import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/Auth/Login.vue'; 
import Dashboard from '../components/Dashboard.vue'; 
import Home from '../components/Layout/Home.vue'; 
import Register from '../components/Auth/Register.vue'; 
import ResetPassword from '../components/Auth/ResetPassword.vue'; // Importation de ResetPassword
// import UserProfile from '../components/User/UserProfile.vue'; 
import QueueManagement from '../components/QueueManagement.vue'; 
import EvaluationManager from '../components/EvaluationManager.vue';
import Utilisateur from '../components/Utilisateur.vue';
import Modal from '../components/Modal.vue'
import Header from '../components/Layout/Header.vue';
import GestionGuichet from '../components/GestionGuichet.vue'
const routes = [

  { path: '/login', component: Login },
  { path: '/', redirect: '/login' },
  { path: '/dashboard', component: Dashboard, meta: { requiresAuth: true } },
  { path: '/home', component: Home, meta: { requiresAuth: true } },
  { path: '/register', component: Register },
  { path: '/reset-password', component: ResetPassword }, // Route pour la réinitialisation du mot de passe
  // { path: '/user-profile', component: UserProfile, meta: { requiresAuth: true } },
  { path: '/queue', component: QueueManagement, meta: { requiresAuth: true } },
  { path: '/evaluation-manager', component: EvaluationManager},
  { path: '/utilisateur', component: Utilisateur },
  { path: '/header', component: Header },
  { path: '/queue-management', component:QueueManagement },
  { path: '/gestion-guichet', component: GestionGuichet },


  { path: '/modal', component:Modal},
   // Redirige vers la page de connexion par défaut
];

// Création du routeur
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Protection des routes
router.beforeEach((to, from, next) => {
  // Vérifie si la route nécessite une authentification
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const userData = localStorage.getItem('user'); // Récupération des données utilisateur du localStorage
    if (!userData) {
      next({ path: '/login' }); // Redirige vers la page de connexion si aucune donnée utilisateur
    } else {
      try {
        const user = JSON.parse(userData); // Essaie de parser les données utilisateur
        if (user) {
          next(); // Laisse passer la navigation si l'utilisateur est valide
        } else {
          next({ path: '/login' }); // Redirige vers la page de connexion si l'utilisateur n'est pas valide
        }
      } catch (error) {
        console.error("Erreur de parsing des données utilisateur :", error); // Gère les erreurs de parsing
        next({ path: '/login' }); // En cas d'erreur de parsing, redirige vers la connexion
      }
    }
  } else {
    next(); // Laisse passer la navigation si aucune authentification n'est requise
  }
});

export default router;
