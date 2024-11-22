<template>
  <div class="auth-container">
    <h2 class="text-center mb-4">Réinitialiser votre mot de passe</h2>
    <form @submit.prevent="resetPassword">
      <div class="form-group">
        <div class="input-icon">
          <input
            type="password"
            v-model="newPassword"
            class="form-control"
            placeholder="Nouveau mot de passe"
            required
          />
          <i class="fas fa-lock"></i>
        </div>
      </div>
      <button type="submit" class="btn btn-primary btn-block">Réinitialiser le mot de passe</button>
    </form>

    <div v-if="resetSuccess" class="text-center mt-4">
      <p class="success-message">Votre mot de passe a été réinitialisé avec succès. Redirection vers la page de connexion...</p>
    </div>
    <div v-if="resetFailed" class="text-center mt-4">
      <p class="error-message">Une erreur s'est produite. Veuillez réessayer.</p>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '@/stores/auth';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from 'vue-toastification'; // Importer le composant Toast

export default {
  setup() {
    const newPassword = ref('');
    const resetSuccess = ref(false);
    const resetFailed = ref(false);
    const route = useRoute();
    const router = useRouter();
    const toast = useToast(); // Initialiser le toast
    const token = route.query.token;
    const authStore = useAuthStore();

    // Fonction pour réinitialiser le mot de passe
    const resetPassword = async () => {
      if (token && newPassword.value) {
        const success = await authStore.resetPassword(token, newPassword.value);
        if (success) {
          resetSuccess.value = true;

          // Afficher un toast de succès
          toast.success('Mot de passe réinitialisé avec succès. Redirection vers la page de connexion...');
          
          // Attendre 3 secondes avant de rediriger vers la page de connexion
          setTimeout(() => {
            router.push('/login');
          }, 3000);
        } else {
          resetFailed.value = true;

          // Afficher un toast d'erreur
          toast.error("Échec de la réinitialisation du mot de passe. Veuillez réessayer.");
        }
      } else {
        resetFailed.value = true;
        
        // Afficher un toast d'erreur
        toast.error("Veuillez entrer un nouveau mot de passe valide.");
      }
    };

    return {
      newPassword,
      resetSuccess,
      resetFailed,
      resetPassword,
    };
  },
};
</script>

<style scoped>
.auth-container {
  max-width: 400px;
  margin: auto;
  padding: 30px;
  border: 1px solid #ccc;
  border-radius: 12px;
  background: linear-gradient(135deg, #007bff, #00c6ff);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  animation: fadeIn 0.5s ease-in-out;
}

h2 {
  font-weight: 700;
  color: #fff;
}

.form-group {
  position: relative;
  margin-bottom: 20px;
}

.input-icon {
  position: relative;
}

.input-icon input {
  padding-left: 40px;
  border: none;
  border-radius: 5px;
  width: 100%;
}

.input-icon i {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #aaa;
}

.btn {
  border-radius: 5px;
  background: #5ab1ff;
  color: white;
  padding: 10px 20px;
  border: none;
  transition: background-color 0.3s;
}

.btn:hover {
  background-color: #007bff;
}

.success-message {
  color: #fff;
}

.error-message {
  color: #ff4d4d;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
