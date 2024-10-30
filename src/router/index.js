import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/Auth/Login.vue'; // Vérifiez ce chemin
import Register from '../components/Auth/Register.vue'; // Vérifiez ce chemin
import UserProfile from '../components/User/UserProfile.vue'; // Vérifiez ce chemin
import QueueManagement from '../components/QueueManagement.vue'; // Ajoutez cette ligne pour importer la page de gestion des files d'attente
import TicketHistory from '../components/TicketHistory.vue'; // Ajoutez cette ligne pour importer l'historique des billets
import ReservationForm from '../components/ReservationForm.vue'; // Ajoutez cette ligne pour importer le formulaire de réservation
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from '../components/Layout/Home.vue';




const routes = [
  { path: '/home', component: Home }, 
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/user-profile', component: UserProfile },
  { path: '/queue', component: QueueManagement }, // Ajoutez cette route
  { path: '/history', component: TicketHistory }, // Ajoutez cette route
  { path: '/reservation', component: ReservationForm }, // Ajoutez cette route
  { path: '/', redirect: '/login' }, // Redirection vers la page de connexion par défaut
  


];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
