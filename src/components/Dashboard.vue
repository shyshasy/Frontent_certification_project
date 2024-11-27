<template>
  <div class="container-fluid">
    <h2 class="text-center">Tableau de Bord des Tickets</h2>

    <!-- Cartes des statistiques -->
    <div class="row">
      <div class="col-md-3">
        <div class="card text-white bg-info mb-3">
          <div class="card-header">Total des Tickets</div>
          <div class="card-body">
            <h5 class="card-title">{{ totalTickets }}</h5>
          </div>
        </div>
      </div>

      <div class="col-md-3">
        <div class="card text-white bg-success mb-3">
          <div class="card-header">Tickets Terminés</div>
          <div class="card-body">
            <h5 class="card-title">{{ ticketsTermines }}</h5>
          </div>
        </div>
      </div>

      <div class="col-md-3">
        <div class="card text-white bg-warning mb-3">
          <div class="card-header">Tickets En Cours</div>
          <div class="card-body">
            <h5 class="card-title">{{ ticketsEnCours }}</h5>
          </div>
        </div>
      </div>

      <div class="col-md-3">
        <div class="card text-white bg-danger mb-3">
          <div class="card-header">Tickets En Attente</div>
          <div class="card-body">
            <h5 class="card-title">{{ ticketsEnAttente }}</h5>
          </div>
        </div>
      </div>
    </div>

    <!-- Graphique de répartition des statuts -->
    <div class="row mt-4">
      <div class="col-md-6">
        <h5 class="text-center">Répartition des Statuts</h5>
        <canvas id="statusPieChart"></canvas>
      </div>

      <!-- Graphique des tickets par guichet -->
      <div class="col-md-6">
        <h5 class="text-center">Tickets par Guichet</h5>
        <canvas id="guichetBarChart"></canvas>
      </div>
    </div>

    <!-- Graphique des tickets au fil du temps -->
    <div class="row mt-4">
      <div class="col-md-12">
        <h5 class="text-center">Évolution des Tickets dans le Temps</h5>
        <canvas id="timeLineChart"></canvas>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Chart from 'chart.js/auto';
import { useTicketStore } from '../stores/ticketStore.js';

const ticketStore = useTicketStore();
const totalTickets = ref(0);
const ticketsTermines = ref(0);
const ticketsEnCours = ref(0);
const ticketsEnAttente = ref(0);

const statusPieChart = ref(null);
const guichetBarChart = ref(null);
const timeLineChart = ref(null);

const fetchTicketStats = async () => {
  await ticketStore.fetchTickets();
  
  const tickets = ticketStore.tickets.value;

  totalTickets.value = tickets.length;
  ticketsTermines.value = tickets.filter(ticket => ticket.statut === 'Terminé').length;
  ticketsEnCours.value = tickets.filter(ticket => ticket.statut === 'En cours').length;
  ticketsEnAttente.value = tickets.filter(ticket => ticket.statut === 'En attente').length;

  createStatusPieChart(tickets);
  createGuichetBarChart(tickets);
  createTimeLineChart(tickets);
};

const createStatusPieChart = (tickets) => {
  const statutCounts = {
    'En attente': tickets.filter(ticket => ticket.statut === 'En attente').length,
    'En cours': tickets.filter(ticket => ticket.statut === 'En cours').length,
    'Terminé': tickets.filter(ticket => ticket.statut === 'Terminé').length
  };

  const ctx = document.getElementById('statusPieChart').getContext('2d');
  statusPieChart.value = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: Object.keys(statutCounts),
      datasets: [{
        data: Object.values(statutCounts),
        backgroundColor: ['#f39c12', '#3498db', '#2ecc71']
      }]
    }
  });
};

const createGuichetBarChart = (tickets) => {
  const guichetCounts = tickets.reduce((acc, ticket) => {
    acc[ticket.guichet] = (acc[ticket.guichet] || 0) + 1;
    return acc;
  }, {});

  const ctx = document.getElementById('guichetBarChart').getContext('2d');
  guichetBarChart.value = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: Object.keys(guichetCounts),
      datasets: [{
        label: 'Nombre de Tickets',
        data: Object.values(guichetCounts),
        backgroundColor: '#3498db'
      }]
    }
  });
};

const createTimeLineChart = (tickets) => {
  const ticketsByDate = tickets.reduce((acc, ticket) => {
    const date = new Date(ticket.date_heure_creation).toLocaleDateString();
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  const ctx = document.getElementById('timeLineChart').getContext('2d');
  timeLineChart.value = new Chart(ctx, {
    type: 'line',
    data: {
      labels: Object.keys(ticketsByDate),
      datasets: [{
        label: 'Nombre de Tickets',
        data: Object.values(ticketsByDate),
        borderColor: '#e74c3c',
        fill: false
      }]
    }
  });
};

onMounted(async () => {
  await fetchTicketStats();
});
</script>

<style>
/* Style pour rendre le tableau de bord plus attrayant */
.card {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.canvas {
  margin: 20px auto;
}

h2 {
  color: #2c3e50;
  margin-bottom: 30px;
}

.chartjs-render-monitor {
  max-height: 400px;
}

.text-center {
  font-weight: bold;
}

.row {
  margin-bottom: 30px;
}
</style>
