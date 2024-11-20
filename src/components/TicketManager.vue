<template>
  <div class="ticket-manager">
    <h1>Gestionnaire de Tickets</h1>

    <!-- Bouton pour ouvrir la modal -->
    <button type="button" class="btn btn-primary" @click="openModal">Prendre un ticket</button>

    <!-- Modal pour ajouter un ticket -->
    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <h2>Ajouter un Ticket</h2>

        <form @submit.prevent="addTicket" class="grid-form">
          <div class="form-group">
            <label for="name">Nom:</label>
            <input v-model="name" type="text" id="name" class="form-control" placeholder="Entrez votre nom" required />
          </div>

          <div class="form-group">
            <label for="phone">Téléphone:</label>
            <input 
              v-model="phone" 
              type="tel" 
              id="phone" 
              class="form-control" 
              placeholder="Entrez votre numéro de téléphone" 
              required 
              @input="validatePhone"
              pattern="\d{8}" 
              title="Le numéro de téléphone doit contenir exactement 8 chiffres"
            />
          </div>

          <div class="form-group">
            <label for="status">Statut:</label>
            <select v-model="status" id="status" class="form-control">
              <option value="en attente">En attente</option>
              <option value="en cours">En cours</option>
              <option value="terminé">Terminé</option>
            </select>
          </div>

          <div class="form-actions">
            <button type="submit" class="btn btn-success">Ajouter</button>
            <button type="button" class="btn btn-secondary" @click="closeModal">Annuler</button>
          </div>
        </form>
      </div>
    </div>

    <div class="ticket-list">
  <div v-for="ticket in tickets" :key="ticket.ticketNumber" class="ticket-card">
    <div class="ticket-content">
      <h2>Ticket #{{ ticket.ticketNumber }}</h2>
      <p><strong>Nom:</strong> {{ ticket.name }}</p>
      <p><strong>Téléphone:</strong> {{ ticket.phone }}</p>
      <p><strong>Date d'émission:</strong> {{ ticket.date }}</p>
      <p><strong>Statut:</strong> {{ ticket.status }}</p>
    </div>
    <div class="status-actions">
      <button class="btn btn-info" @click="updateStatus(ticket, 'en attente')">En attente</button>
      <button class="btn btn-warning" @click="updateStatus(ticket, 'en cours')">En cours</button>
      <button class="btn btn-success" @click="updateStatus(ticket, 'terminé')">Terminé</button>
    </div>
  </div>
</div>

  </div>
</template>

<script setup>
import { ref } from 'vue';

const name = ref('');
const phone = ref('');
const status = ref('en attente');
const tickets = ref([]);
let nextTicketNumber = ref(1);

const showModal = ref(false);

const addTicket = () => {
  const newTicket = {
    name: name.value,
    phone: phone.value,
    ticketNumber: nextTicketNumber.value++,
    date: new Date().toLocaleString(),
    status: status.value
  };

  tickets.value.push(newTicket);
  resetForm();
  closeModal();
};

const resetForm = () => {
  name.value = '';
  phone.value = '';
  status.value = 'en attente';
};

const openModal = () => {
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

const updateStatus = (ticket, newStatus) => {
  ticket.status = newStatus;
};
</script>

<style scoped>
.ticket-manager {
  max-width: 1200px;
  margin: auto;
  padding: 20px;
}

button.btn-primary {
  margin-bottom: 20px;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 500px;
  max-width: 100%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  animation: fadeIn 0.3s ease;
}

/* Form Grid Layout */
.grid-form {
  display: grid;
  grid-template-columns: 1fr 1fr; /* Deux colonnes de tailles égales */
  gap: 15px;
  max-width: 100%; /* Empêche le débordement en limitant la largeur */
  box-sizing: border-box; /* Assure que les bordures et les marges sont incluses dans la largeur */
  overflow: hidden; /* Cache le débordement si nécessaire */
}

.form-group {
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.form-group label {
  font-size: 0.9em;
  margin-bottom: 5px;
}

.form-actions {
  grid-column: span 2;
  display: flex;
  justify-content: space-between;
}

.ticket-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;

}

.ticket-card {
  display: grid;
  grid-template-columns: 1fr auto; /* Colonne de texte à gauche, boutons à droite */
  justify-content: space-between;
  align-items: flex-start;
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  width: 100%;
  max-width: 900px;
  box-sizing: border-box;
}

.ticket-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.ticket-card h2, .ticket-card p {
  margin: 0;
  margin-bottom: 10px; /* Espacement entre les éléments textuels */
}

.status-actions {
  display: flex;
  flex-direction: column; /* Aligne les boutons verticalement */
  justify-content: flex-end;
  gap: 10px;
  align-items: flex-end; /* Aligne les boutons à droite */
  flex-shrink: 0;
  grid-column: 2 / 3; /* Place les boutons dans la 2ème colonne */
}

.ticket-content {
  display: flex;
  flex-direction: column;
  gap: 10px;
  grid-column: 1 / 2; /* Place le texte dans la 1ère colonne */
  align-items: flex-start; /* Aligne le texte à gauche */
}



.status-actions button {
  padding: 8px 16px;
  border-radius: 5px;
  font-size: 1em;
  transition: background-color 0.3s, color 0.3s;
  cursor: pointer;
  margin-right: 10px; /* Ajoute de l'espace entre les boutons */
  width: 150px; /* Définit la même taille pour tous les boutons */
  box-sizing: border-box; /* Assure que padding et bordures sont inclus dans la largeur */
}


.status-actions button:hover {
  transform: scale(1.05); /* L'effet de survol reste inchangé */
}


.status-actions {
  gap: 8px;  /* Réduction de l'espacement entre les boutons */
}



</style>
