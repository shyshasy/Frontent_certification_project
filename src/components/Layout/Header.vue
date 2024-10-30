<template>
  <nav class="innovative-navbar">
    <div class="navbar-logo">
      <a href="#" class="brand">
        <img src="/SHISHA.jpg" alt="Brand Logo" />
      </a>
    </div>
    <ul class="navbar-nav">
      <li class="nav-item">
        <router-link class="nav-link" to="/home" title="Home">
          <i class="fa fa-home"></i>
          <span class="link-text">Home</span>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/login" title="Login">
          <i class="fa fa-sign-in"></i>
          <span class="link-text">Login</span>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/register" title="Register">
          <i class="fa fa-user-plus"></i>
          <span class="link-text">Register</span>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/queue" title="Queue Management">
          <i class="fa fa-list"></i>
          <span class="link-text">Queue Management</span>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/history" title="Ticket History">
          <i class="fa fa-history"></i>
          <span class="link-text">History</span>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/reservation" title="Reservations">
          <i class="fa fa-calendar-check"></i>
          <span class="link-text">Reservations</span>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/user-profile" title="User Profile">
          <i class="fa fa-user"></i>
          <span class="link-text">Profile</span>
        </router-link>
      </li>
      <!-- Ajout de la gestion des tickets -->
      <li class="nav-item">
        <router-link class="nav-link" to="/ticket-management" title="Ticket Management">
          <i class="fa fa-ticket-alt"></i>
          <span class="link-text">Ticket Management</span>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {};
</script>

<style scoped>
/* Innovative sticky vertical navbar */
.innovative-navbar {
position: fixed;
top: 0;
left: 0;
width: 100%; /* Full width */
height: 60px; /* Adjust the height */
background: linear-gradient(45deg, #007bff, #00c6ff); /* Gradient background */
display: flex;
flex-direction: row; /* Align items horizontally */
justify-content: space-between; /* Distribute space evenly */
align-items: center;
padding: 0 20px; /* Padding on sides */
transition: background-color 0.3s ease, box-shadow 0.3s ease;
box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
z-index: 1000; /* Ensure navbar is above other elements */
}

.navbar-logo {
margin-right: 30px; /* Space between logo and nav items */
}

.navbar-logo img {
width: 50px;
height: auto;
transition: transform 0.3s ease;
}

.navbar-nav {
list-style: none;
padding: 0;
margin: 0;
display: flex;
flex-direction: row; /* Horizontal nav items */
}

.nav-item {
margin: 0 15px;
position: relative;
}

.nav-link {
display: flex;
align-items: center;
color: #ffffff;
font-size: 1.2rem;
padding: 10px;
text-decoration: none;
transition: background-color 0.3s ease, transform 0.3s ease;
}

/* Retiré l'effet de survol */
.nav-link:hover {
background-color: transparent; /* Suppression de l'effet de survol */
color: #ffffff; /* Couleur inchangée au survol */
}

.link-text {
display: inline-block;
font-size: 1rem;
font-weight: 600;
color: #fff;
}

/* Indicateur de lien actif */
.nav-item.active .nav-link {
border-left: 5px solid #fff; /* Bordure pour indiquer la page active */
}

/* Ajustements pour petits écrans */
@media (max-width: 768px) {
.innovative-navbar {
  width: 100%;
  height: auto;
  flex-direction: row;
  padding: 10px 0;
  background: linear-gradient(90deg, #007bff, #00c6ff);
  position: relative; /* Fixe pour éviter de cacher le contenu */
  height: 60px; /* Réduction de la hauteur sur mobile */
}

.nav-item {
  margin: 0 15px;
}

.nav-link {
  flex-direction: row;
  padding: 5px 15px;
}

.navbar-logo img {
  display: none; /* Cacher le logo sur mobile */
}
}
</style>
