<template>
    <div class="home-container">
      <h1 class="title">Bienvenue sur votre Dashboard</h1>
      <p class="description">Accédez facilement à toutes les fonctionnalités avec un simple clic.</p>
  
      <div class="card-grid">
        <!-- Ticket Manager -->
        <div class="card ticket-manager">
          <router-link to="/ticket-manager" class="card-link">
            <div class="card-content">
              <i class="fas fa-ticket-alt card-icon"></i>
              <h3>Ticket Manager</h3>
              <p>Suivez et gérez vos tickets en un clin d'œil.</p>
            </div>
          </router-link>
        </div>
  
        <!-- Utilisateur -->
        <div class="card utilisateur">
          <router-link to="/utilisateur" class="card-link">
            <div class="card-content">
              <i class="fas fa-users card-icon"></i>
              <h3>Utilisateurs</h3>
              <p>Gérez vos utilisateurs facilement.</p>
            </div>
          </router-link>
        </div>
  
        <!-- Gestion de Guichet -->
        <div class="card guichet">
          <router-link to="/gestion-guichet" class="card-link">
            <div class="card-content">
              <i class="fas fa-cogs card-icon"></i>
              <h3>Gestion de Guichet</h3>
              <p>Configurez et optimisez vos guichets.</p>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {};
  </script>
  
  <style scoped>
  /* Style principal de la page d'accueil */
  .home-container {
    text-align: center;
    padding: 80px;
    background-color: #eff6fb;
    min-height: 100vh;
  }
  
  .title {
    font-size: 3rem;
    color: #222;
    font-weight: 700;
    margin-bottom: 15px;
  }
  
  .description {
    font-size: 1.25rem;
    color: #555;
    margin-bottom: 40px;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }
  
  /* Grille des cartes */
  .card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    margin-top: 50px;
    padding: 0 20px;
  }
  
  /* Style pour chaque carte */
  .card {
    background-color: #ffffff;
    border-radius: 15px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    position: relative;
    transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;
    cursor: pointer;
    padding: 20px;
  }
  
  .card:hover {
    transform: translateY(-10px);
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.2);
    background-color: #007bff; /* Blue color on hover */
  }
  
  .card:hover .card-icon {
    color: #fff;
  }
  
  .card-link {
    text-decoration: none;
    color: inherit;
  }
  
  /* Icône de chaque carte */
  .card-icon {
    font-size: 3.5rem;
    color: #007bff;
    margin-bottom: 20px;
    transition: color 0.3s ease;
  }
  
  /* Titres des cartes */
  .card h3 {
    font-size: 1.75rem;
    color: #333;
    margin-bottom: 10px;
    font-weight: 600;
  }
  
  /* Description sous chaque titre */
  .card p {
    color: #777;
    font-size: 1rem;
    transition: color 0.3s ease;
  }
  
  /* Nouveau style de fond - Dégradé linéaire pour chaque carte */
  .ticket-manager:hover {
    background: linear-gradient(135deg, #007bff, #00c6ff); /* Blue gradient */
  }
  
  .utilisateur:hover {
    background: linear-gradient(135deg, #007bff, #00c6ff); /* Blue gradient */
  }
  
  .guichet:hover {
    background: linear-gradient(135deg, #007bff, #00c6ff); /* Blue gradient */
  }
  
  /* Mobile - Réduction de l'espace entre les cartes */
  @media (max-width: 768px) {
    .card-grid {
      grid-template-columns: 1fr;
      padding: 0;
    }
  
    .title {
      font-size: 2.5rem;
    }
  
    .description {
      font-size: 1rem;
      margin-bottom: 30px;
    }
  }
  </style>
  