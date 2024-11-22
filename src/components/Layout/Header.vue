<template>
  <nav class="custom-navbar">
    <div class="navbar-container">
      <!-- Logo -->
      <a class="navbar-brand" href="#">
        <img src="/SHYSHA.png" alt="Logo" class="brand-logo">
      </a>
      <!-- Navbar links -->
      <ul class="navbar-links">
        <li>
          <router-link class="nav-link" to="/dashboard" active-class="active-link">
            <i class="fas fa-tachometer-alt"></i> Dashboard
          </router-link>
        </li>
        <li>
          <router-link class="nav-link" to="/home" active-class="active-link">
            <i class="fas fa-home"></i> Home
          </router-link>
        </li>
        <li>
          <router-link class="nav-link" to="/login" active-class="active-link">
            <i class="fas fa-sign-in-alt"></i> Login
          </router-link>
        </li>
        <!-- <li>
          <router-link class="nav-link" to="/register" active-class="active-link">
            <i class="fas fa-user-plus"></i> Register
          </router-link>
        </li> -->
        <li>
          <router-link class="nav-link" to="/ticket-manager" active-class="active-link">
            <i class="fas fa-ticket-alt"></i> Ticket Manager
          </router-link>
        </li>
        <li>
          <router-link class="nav-link" to="/utilisateur" active-class="active-link">
            <i class="fas fa-users"></i> Utilisateur
          </router-link>
        </li>
        <li>
          <router-link class="nav-link" to="/gestion-guichet" active-class="active-link">
            <i class="fas fa-cogs"></i> Gestion De Guichet
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
/* Composition API */
</script>

<style scoped>
/* Navbar principale */
.custom-navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px; /* Hauteur ajustée de la navbar */
  background: linear-gradient(135deg, #007bff, #00c6ff); /* Dégradé bleu moderne */
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
  z-index: 1000;
}

.custom-navbar:hover {
  background-color: #0056b3;
}

/* Conteneur central */
.navbar-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 90%;
  max-width: 1200px;
}

/* Logo */
.brand-logo {
  height: 40px; /* Ajustement de la taille du logo */
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
  font-size: 1rem; /* Taille de la police ajustée */
  font-weight: 600;
  color: #ffffff;
  padding: 8px 12px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  min-width: 120px; /* Minimum largeur des liens */
  max-width: 200px; /* Largeur maximale ajustée */
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis; /* Affichage tronqué pour un texte trop long */
  transition: background-color 0.3s ease, transform 0.3s ease;
}

/* Style pour l'élément actif */
.nav-link.active-link {
  background: linear-gradient(135deg, #007bff, #00c6ff); /* Même dégradé bleu que le navbar */
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

/* Responsiveness */
@media (max-width: 768px) {
  .navbar-links {
    gap: 1.5rem;
  }
  .nav-link {
    font-size: 0.9rem;
    padding: 8px 12px;
  }
}
</style>
