<template>
  <nav class="navbar navbar-expand-lg innovative-navbar">
    <div class="container-fluid">
      <!-- Logo -->
      <a class="navbar-brand" href="#" id="logs">
        <img src="/SHYSHA.png" alt="Brand Logo" class="brand-logo">
      </a>
      <!-- Toggler for mobile -->
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Navbar links -->
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/dashboard">
              <i class="fa fa-tachometer-alt"></i> Dashboard
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/home">
              <i class="fa fa-home"></i> Home
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/login">
              <i class="fa fa-sign-in"></i> Login
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/register">
              <i class="fa fa-user-plus"></i> Register
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/queue-management">
              <i class="fa fa-list"></i> QueueManagement
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/utilisateur">
              <i class="fa fa-users"></i> Utilisateur
            </router-link>
          </li>

          <li class="nav-item">
            <router-link class="nav-link" to="/gestion-guichet">
              <i class="fa fa-ticket-alt"></i> Gestion De Guichet
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
/* Setup pour Composition API */
</script>

<style scoped>
.innovative-navbar {
  position: fixed; /* Fixe la navbar en haut */
  top: 0; /* Positionne la navbar en haut de l'écran */
  left: 0;
  width: 100%; /* Prend toute la largeur de l'écran */
  z-index: 1000; /* S'assure que la navbar reste au-dessus des autres éléments */
  background: linear-gradient(45deg, #007bff, #00c6ff, #00e3e3, #0004ff); 
  padding: 0.75rem 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  transition: background-color 0.5s ease, box-shadow 0.5s ease;
  background-size: 400% 400%;
  animation: gradientShift 12s ease infinite;
  margin: 0; /* Supprimer les marges pour qu'il soit bord à bord */
  height: 75px;
}

.container-fluid {
  max-width: 100%; /* Supprimer la restriction de largeur par défaut */
  padding: 0; /* Supprimer le padding par défaut */
}

/* Animation du dégradé */
@keyframes gradientShift {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

/* Style du logo */
.brand-logo {
  width: 50px; 
  height: 50px;
  border: none; 
  border-radius: 8px; 
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5); 
  transition: transform 0.3s ease;
 
}

.brand-logo:hover {
  transform: scale(1.1);
}.brand-logo {
  max-height: 65px; /* Limite la hauteur maximale à 50px */
  width: auto; /* La largeur s'adapte automatiquement pour conserver les proportions */
  object-fit: contain; /* Empêche l'image de s'étirer */
  border: none; 
  border-radius: 5px; 
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5); 
  transition: transform 0.3s ease;
}

.brand-logo:hover {
  transform: scale(1.1);
}


/* Style des éléments de la navbar */
.navbar-nav .nav-item {
  margin-left: 1rem;
  flex: 1; /* Ensure items take equal space */
}

.navbar-nav {
  display: flex;
  flex-wrap: wrap; /* Allow wrapping if necessary */
}

.nav-link {
  color: white !important;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  transition: color 0.4s ease, transform 0.4s ease, background-color 0.4s ease;
  position: relative;
  padding: 0.5rem 1rem; /* Added padding for better spacing */
  border-radius: 5px; /* Rounded corners for the hover effect */
  white-space: nowrap; /* Prevent text from breaking onto the next line */
  overflow: hidden; /* Hide overflowed content */
  text-overflow: ellipsis; /* Add ellipsis if text is too long */
}

.nav-link:hover {
  color: #ffd700 !important;
  transform: scale(1.05);
  text-shadow: 0 0 10px rgba(255, 215, 0, 0.7), 0 0 20px rgba(255, 215, 0, 0.5);
}

.nav-link i {
  margin-right: 0.5rem; /* Spacing between icon and text */
}

.nav-link::before {
  content: "";
  position: absolute;
  bottom: -5px;
  left: 50%;
  width: 0;
  height: 2px;
  background-color: #ffd700;
  transition: width 0.3s ease, left 0.3s ease;
}

.nav-link:hover::before {
  width: 100%;
  left: 0;
}

.navbar-toggler-icon {
  background-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30' fill='white'><path stroke='rgba(255, 255, 255, 0.5)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/></svg>");
}

@media (max-width: 768px) {
  .navbar-nav {
    text-align: center;
    width: 100%;
  }
  .nav-item {
    width: 100%; /* Make each item take up the full width */
  }
  .nav-link {
    padding: 0.5rem;
  }
}


.brand-logo {
  width: 90px; 
  height: auto;
  border: none; 
  border-radius: 8px; 
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5); 
  transition: transform 0.3s ease;
}

.brand-logo:hover {
  transform: scale(1.1);
}

.navbar-nav .nav-item {
  margin-left: 1rem;
  flex: 1; /* Ensure items take equal space */
}

.navbar-nav {
  display: flex;
  flex-wrap: wrap; /* Allow wrapping if necessary */
}

.nav-link {
  color: white !important;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  transition: color 0.4s ease, transform 0.4s ease, background-color 0.4s ease;
  position: relative;
  padding: 0.5rem 1rem; /* Added padding for better spacing */
  border-radius: 5px; /* Rounded corners for the hover effect */
  white-space: nowrap; /* Prevent text from breaking onto the next line */
  overflow: hidden; /* Hide overflowed content */
  text-overflow: ellipsis; /* Add ellipsis if text is too long */
}

.nav-link:hover {
  color: #ffd700 !important;
  transform: scale(1.05);
  text-shadow: 0 0 10px rgba(255, 215, 0, 0.7), 0 0 20px rgba(255, 215, 0, 0.5);
}

.nav-link i {
  margin-right: 0.5rem; /* Spacing between icon and text */
}

.nav-link::before {
  content: "";
  position: absolute;
  bottom: -5px;
  left: 50%;
  width: 0;
  height: 2px;
  background-color: #ffd700;
  transition: width 0.3s ease, left 0.3s ease;
}

.nav-link:hover::before {
  width: 100%;
  left: 0;
}

.navbar-toggler-icon {
  background-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30' fill='white'><path stroke='rgba(255, 255, 255, 0.5)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/></svg>");
}

@media (max-width: 768px) {
  .navbar-nav {
    text-align: center;
    width: 100%;
  }
  .nav-item {
    width: 100%; /* Make each item take up the full width */
  }
  .nav-link {
    padding: 0.5rem;
  }
}
</style>
