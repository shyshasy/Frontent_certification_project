<template>
    <div class="auth-container">
      <h2 class="text-center mb-4">Demander un lien de réinitialisation</h2>
      <form @submit.prevent="sendResetLink">
        <div class="form-group">
          <div class="input-icon">
            <input
              type="email"
              v-model="email"
              class="form-control"
              placeholder="Email"
              required
            />
            <i class="fas fa-envelope"></i>
          </div>
        </div>
        <button type="submit" class="btn btn-primary btn-block">Envoyer le lien de réinitialisation</button>
      </form>
  
      <!-- Message de confirmation après l'envoi du lien -->
      <div v-if="resetLinkSent" class="alert alert-success mt-4">
        <p>Un lien de réinitialisation a été envoyé à votre email.</p>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { useAuthStore } from '@/stores/auth'; // Importer le store Pinia
  import { useToast } from 'vue-toastification'; // Importer les toasts
  
  export default {
    setup() {
      const email = ref('');
      const resetLinkSent = ref(false);
      const authStore = useAuthStore();
      const toast = useToast(); // Initialiser le toast
  
      // Envoyer la demande de réinitialisation
      const sendResetLink = async () => {
        const success = await authStore.requestPasswordReset(email.value);
        if (success) {
          resetLinkSent.value = true;
  
          // Afficher un toast de succès
          toast.success('Un lien de réinitialisation a été envoyé à votre email.');
        } else {
          // Afficher un toast d'erreur
          toast.error("Erreur lors de l'envoi du lien. Veuillez réessayer.");
        }
      };
  
      return {
        email,
        resetLinkSent,
        sendResetLink,
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
  
  .alert {
    border-radius: 5px;
    background-color: #dff0d8;
    padding: 10px;
    color: #3c763d;
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
  