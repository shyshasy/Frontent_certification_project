<!-- <template>
    <div v-if="user">
      <h3>Profil de l'utilisateur</h3>
      <p>Email: {{ user.email }}</p>
      <button @click="handleLogout">Se déconnecter</button>
    </div>
    <div v-else>
      <p>Veuillez vous connecter.</p>
    </div>
  </template>
  
  <script setup>
  import { useAuthStore } from '../../stores/auth';
  import { useRouter } from 'vue-router';
  
  const store = useAuthStore();
  const user = store.user; // Récupérer l'utilisateur connecté
  const router = useRouter();
  
  const handleLogout = () => {
    store.logout();
    router.push('/login'); // Rediriger vers la page de connexion
  };
  </script>
   -->