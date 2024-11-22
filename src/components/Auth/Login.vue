<template>
  <div class="auth-container">
    <h2 class="text-center mb-4">Connexion</h2>
    <form @submit.prevent="handleLogin">
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
      <div class="form-group">
        <div class="input-icon">
          <input
            type="password"
            v-model="password"
            class="form-control"
            placeholder="Mot de passe"
            required
          />
          <i class="fas fa-lock"></i>
        </div>
      </div>
      <button type="submit" class="btn btn-primary btn-block">Se connecter</button>
    </form>

    <!-- Lien pour "Mot de passe oublié" -->
    <div class="text-center mt-4">
      <router-link to="/forget-password" class="forgot-password-link">Mot de passe oublié ?</router-link>
    </div>

    <!-- Lien pour "S'inscrire" -->
    <div class="text-center mt-2">
      <span class="register-link">Pas encore de compte ?</span>
      <router-link to="/register" class="register-link">S'inscrire</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/auth';
import { useToast } from 'vue-toastification';  // Import toast

const store = useAuthStore()
const email = ref('');
const password = ref('');
const router = useRouter();
const toast = useToast();  // Initialize toast

const handleLogin = async () => {
  // Appel de la fonction de connexion dans le store
  const success = await store.login(email.value, password.value);
    
  if (success) {
    // Si la connexion est réussie
    toast.success("Connexion réussie", {
      position: "top-right",
      timeout: 3000,
    });
    router.push('/dashboard');  // Redirige vers le tableau de bord
  } else {
    // Si la connexion échoue
    toast.error("Échec de la connexion", {
      position: "top-right",
      timeout: 3000,
    });
  }
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
}

/* Styles pour les liens supplémentaires */
.forgot-password-link, .register-link {
  color: #fff;
  cursor: pointer;
}

.forgot-password-link:hover, .register-link:hover {
  color: #ffeb3b;
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
