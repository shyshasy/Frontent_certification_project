<template>
    <div class="reporting-container">
      <h1>Rapports de File d'Attente</h1>
  
      <!-- Section de filtres -->
      <div class="filters">
        <label for="periode">Période :</label>
        <select v-model="periode" @change="chargerRapports">
          <option value="today">Aujourd'hui</option>
          <option value="week">Cette semaine</option>
          <option value="month">Ce mois-ci</option>
          <option value="all">Tout le temps</option>
        </select>
  
        <label for="guichet">Guichet :</label>
        <select v-model="guichetSelectionne" @change="chargerRapports">
          <option value="all">Tous les guichets</option>
          <option v-for="guichet in guichets" :key="guichet.id" :value="guichet.id">
            {{ guichet.nom }}
          </option>
        </select>
  
        <button @click="chargerRapports">Mettre à jour les rapports</button>
      </div>
  
      <!-- Statistiques générales -->
      <div class="reporting-section">
        <h2>Statistiques Générales</h2>
        <ul>
          <li><strong>Total d'utilisateurs :</strong> {{ totalUtilisateurs }}</li>
          <li><strong>Total de tickets générés :</strong> {{ totalTickets }}</li>
          <li><strong>Utilisateurs en attente :</strong> {{ enAttente }}</li>
          <li><strong>Utilisateurs servis :</strong> {{ servis }}</li>
        </ul>
      </div>
  
      <!-- Répartition des tickets par guichet -->
      <div class="reporting-section">
        <h2>Répartition des Tickets par Guichet</h2>
        <ul v-if="ticketsParGuichet.length">
          <li v-for="guichet in ticketsParGuichet" :key="guichet.guichetNom">
            <strong>{{ guichet.guichetNom }} :</strong> {{ guichet.tickets }} tickets
          </li>
        </ul>
        <p v-else>Aucune donnée disponible.</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  
  // Variables réactives pour stocker les données
  const totalUtilisateurs = ref(0);
  const totalTickets = ref(0);
  const enAttente = ref(0);
  const servis = ref(0);
  const ticketsParGuichet = ref([]);
  const guichets = ref([]);
  
  // Variables pour les filtres
  const periode = ref('all'); // Par défaut, on affiche toutes les périodes
  const guichetSelectionne = ref('all'); // Par défaut, on affiche tous les guichets
  
  // Fonction pour charger les rapports avec filtres
  const chargerRapports = async () => {
    try {
      const response = await axios.get('http://localhost:5002/api/reporting', {
        params: {
          periode: periode.value,
          guichetId: guichetSelectionne.value,
        },
      });
  
      const data = response.data;
  
      totalUtilisateurs.value = data.totalUtilisateurs;
      totalTickets.value = data.totalTickets;
      enAttente.value = data.enAttente;
      servis.value = data.servis;
      ticketsParGuichet.value = data.ticketsParGuichet;
      guichets.value = data.guichets;
    } catch (error) {
      console.error('Erreur lors du chargement des rapports:', error);
    }
  };
  
  // Charger les rapports et les guichets disponibles lorsque le composant est monté
  onMounted(() => {
    chargerRapports();
  });
  </script>
  
  <style scoped>
  .reporting-container {
    max-width: 800px;
    margin: 0 auto;
  }
  
  .filters {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  
  .reporting-section {
    margin-bottom: 20px;
  }
  </style>
  