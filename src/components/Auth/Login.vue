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
      <div v-if="errorMessage" class="alert alert-danger mt-3">{{ errorMessage }}</div>
    </form>

    <!-- Lien pour "Mot de passe oublié" -->
    <div class="text-center mt-4">
      <a @click="navigateToResetPassword" class="forgot-password-link">Mot de passe oublié ?</a>
    </div>

    <!-- Lien pour "S'inscrire" -->
    <div class="text-center mt-2">
      <span class="register-link">Pas encore de compte ?</span>
      <a @click="navigateToRegister" class="register-link">S'inscrire</a>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const errorMessage = ref('');
const router = useRouter();

// Fonction de gestion de la connexion
const handleLogin = async () => {
  try {
    const response = await fetch('http://localhost:3002/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email.value, password: password.value }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erreur de connexion');
    }

    const data = await response.json();
    localStorage.setItem('user', JSON.stringify({ email: email.value }));
    router.push('/dashboard');
  } catch (error) {
    errorMessage.value = 'Une erreur est survenue lors de la connexion. Détails : ' + error.message;
    console.error('Erreur de connexion :', error);
  }
};

// Fonction pour rediriger vers "Mot de passe oublié"
const navigateToResetPassword = () => {
  router.push('/reset-password');
};

// Fonction pour rediriger vers "S'inscrire"
const navigateToRegister = () => {
  router.push('/register');
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
