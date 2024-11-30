<template>
  <nav class="custom-navbar" v-if="useRoute().path !== '/login'">
    <div class="navbar-container">
      <!-- Logo -->
      <a class="navbar-brand" href="#">
        <img src="/SHYSHA.png" alt="Logo" class="brand-logo">
      </a>

      <!-- Navbar links -->
      <ul class="navbar-links">
        <li>
          <router-link class="nav-link" to="/dashboard" active-class="active-link">
            <i class="fas fa-tachometer-alt"></i> Tableau De board
          </router-link>
        </li>
        <li>
          <router-link class="nav-link" to="/home" active-class="active-link">
            <i class="fas fa-home"></i> Acceuil
          </router-link>
        </li>
        <li v-if="useRoute().path === '/login'">
          <router-link class="nav-link"  to="/login" active-class="active-link">
            <i class="fas fa-sign-in-alt"></i> Se Connecter
          </router-link>
        </li>
        <li>
          <router-link class="nav-link" to="/ticket-manager" active-class="active-link">
            <i class="fas fa-ticket-alt"></i> Ticket 
          </router-link>
        </li>
        <li>
          <router-link class="nav-link" to="/utilisateur" active-class="active-link">
            <i class="fas fa-users"></i> Utilisateur
          </router-link>
        </li>
        <li>
          <router-link class="nav-link" to="/gestion-guichet" active-class="active-link">
            <i class="fas fa-cogs"></i> Guichet
          </router-link>
        </li>
      </ul>

      <!-- User Profile Dropdown -->
      <div class="user-actions">
        <div class="user-info" @click="toggleDropdown">
          <i class="fas fa-user-circle"></i>
          <span>{{ userName }}</span>
        </div>
        
        <!-- Dropdown menu -->
        <div v-if="showDropdown" class="dropdown-menu">
          <router-link class="dropdown-item" to="/edit-profile">Modifier Profil</router-link>
          <router-link class="dropdown-item" to="/change-password">Changer Mot de Passe</router-link>
          <button @click="logout" class="dropdown-item">
            <i class="fas fa-sign-out-alt"></i> Logout
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';

// Variable réactive pour stocker le nom de l'utilisateur
const userNames = computed(() => {
  return localStorage.getItem("nomUtilisateurConnecter");
});

const userName = userNames.value; // Utilisez userNames.value pour accéder à la valeur

// Variable pour afficher/masquer le menu déroulant
const showDropdown = ref(false);

// Fonction pour basculer l'affichage du menu
const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
};

// Fonction de déconnexion
const logout = () => {
  localStorage.removeItem('user');
  // localStorage.removeItem("nomUtilisateurConnecter")
  window.location.href = '/login';
};

</script>

<style scoped>
/* Navbar principale */
/* Navbar principale */
.custom-navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background: linear-gradient(135deg, #007bff, #007bff);
  display: flex;
  align-items: center;
  justify-content: center; /* Centrer la barre de navigation */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
  z-index: 1000;
  padding: 0 20px; /* Ajouter du padding à gauche et à droite pour éviter que les éléments ne touchent les bords */
}

.navbar-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px; /* Limite la largeur maximale du contenu */
  padding: 0 60px; /* Ajouter des marges gauche et droite */
}

/* Logo */
.brand-logo {
  height: 40px;
  transition: transform 0.3s ease, filter 0.3s ease;
}

.brand-logo:hover {
  transform: scale(1.15);
  filter: brightness(1.3);
}

/* Liens */
.navbar-links {
  list-style: none;
  display: flex;
  gap: 2rem;
  margin: 0;
  padding: 0;
}

.nav-link {
  text-decoration: none;
  font-size: 1rem;
  font-weight: 600;
  color: #ffffff;
  padding: 8px 12px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.nav-link.active-link {
  background: linear-gradient(135deg, #007bff, #00c6ff);
  color: #f1f1f1;
  font-weight: bold;
}

.nav-link:hover {
  background-color: #0056b3;
  color: #f1f1f1;
  transform: scale(1.05);
}

.nav-link i {
  margin-right: 8px;
  font-size: 1.2rem;
  transition: transform 0.3s ease;
}

.nav-link:hover i {
  transform: rotate(360deg);
}

/* Conteneur utilisateur et menu déroulant */
.user-actions {
  display: flex;
  align-items: center;
  position: relative;
}

.user-info {
  color: #fff;
  font-size: 1rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

/* Dropdown menu */
.dropdown-menu {
  position: absolute;
  top: 60px;
  right: 0;
  background-color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.dropdown-item {
  padding: 12px 20px;
  font-size: 1rem;
  color: #333;
  text-align: left;
  text-decoration: none;
  transition: background-color 0.3s;
}

.dropdown-item:hover {
  background-color: #f1f1f1;
}

.logout-button {
  background-color: transparent;
  border: none;
  color: inherit;
  text-align: left;
  width: 100%;
  cursor: pointer;
  font-size: inherit;
}

.logout-button:hover {
  background-color: #f1f1f1;
}

</style>
