<template>
  <div class="auth-container">
    <h2 class="text-center mb-4">Inscription</h2>
    <form @submit.prevent="handleRegister">
      <div class="form-group">
        <div class="input-icon">
          <input
            type="text"
            v-model="name"
            class="form-control"
            placeholder="Nom"
            required
          />
          <i class="fas fa-user"></i>
        </div>
      </div>
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
            type="tel"
            v-model="phone"
            class="form-control"
            placeholder="Numéro de téléphone"
            required
          />
          <i class="fas fa-phone"></i>
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
      <button type="submit" class="btn btn-primary btn-block" :disabled="isLoading">
        <span v-if="isLoading">Chargement...</span>
        <span v-else>S'inscrire</span>
      </button>
      <div class="text-center mt-3">
        <router-link class="register-link" to="/login">Déjà inscrit ?</router-link>
      </div>
    </form>
    <div v-if="errorMessage" class="alert alert-danger mt-3">{{ errorMessage }}</div>
    <div v-if="successMessage" class="alert alert-success mt-3">{{ successMessage }}</div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();

    // Déclaration des variables réactives
    const name = ref('');
    const email = ref('');
    const phone = ref('');
    const password = ref('');
    const errorMessage = ref('');
    const successMessage = ref('');
    const isLoading = ref(false);

    // Méthode d'inscription
    const handleRegister = () => {
      errorMessage.value = ''; // Réinitialiser le message d'erreur
      successMessage.value = ''; // Réinitialiser le message de succès
      isLoading.value = true; // Afficher l'indicateur de chargement

      // Vérifier si l'utilisateur est déjà inscrit
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const userExists = users.find(user => user.email === email.value);

      if (userExists) {
        errorMessage.value = 'Cet email est déjà utilisé.';
        isLoading.value = false;
        return;
      }

      // Créer un nouvel utilisateur
      const newUser = {
        name: name.value,
        email: email.value,
        phone: phone.value,
        password: password.value,
      };

      // Ajouter le nouvel utilisateur à la liste des utilisateurs
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));

      successMessage.value = 'Inscription réussie ! Vous pouvez maintenant vous connecter.';
      
      // Rediriger vers la page de connexion après l'inscription réussie
      setTimeout(() => {
        router.push('/login');
      }, 2000); // Délai avant la redirection

      isLoading.value = false; // Masquer l'indicateur de chargement
    };

    // Retourne les variables et méthodes nécessaires au template
    return {
      name,
      email,
      phone,
      password,
      errorMessage,
      successMessage,
      isLoading,
      handleRegister,
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
  transition: background-color 0.3s ease;
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
  transition: all 0.3s ease;
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
  transition: background-color 0.3s ease;
  background: #5ab1ff;
  color: white;
  padding: 10px 20px;
  border: none;
}

.btn:disabled {
  background-color: #ccc; /* Couleur pour le bouton désactivé */
  cursor: not-allowed; /* Curseur pour le bouton désactivé */
}

.btn:hover:not(:disabled) {
  background-color: #007bff;
}

.alert {
  border-radius: 5px;
}

.register-link {
  color: #fff;
  font-weight: 600;
  text-decoration: none;
  transition: color 0.3s ease;
}

.register-link:hover {
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
