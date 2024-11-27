<!-- <template>
  <div class="ticket-manager">
    <h1>Gestionnaire de Tickets</h1>

    
    <div class="buttons">
      <button class="btn btn-primary" @click="openModal('addTicket')">Prendre un ticket</button>
      <button class="btn btn-info" @click="openModal('viewStats')">Voir les statistiques</button>
    </div>

    <div v-if="currentModal === 'addTicket'" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <h2>Ajouter un Ticket</h2>

        <form @submit.prevent="addTicket" class="grid-form">
          <div class="form-group">
            <label for="name">Nom :</label>
            <input 
              v-model="name" 
              type="text" 
              id="name" 
              class="form-control" 
              placeholder="Entrez votre nom" 
              required 
            />
          </div>

          <div class="form-group">
            <label for="phone">Téléphone :</label>
            <input 
              v-model="phone" 
              type="tel" 
              id="phone" 
              class="form-control" 
              placeholder="Entrez votre numéro de téléphone" 
              required 
              pattern="\d{8}" 
              title="Le numéro de téléphone doit contenir exactement 8 chiffres"
            />
          </div>

          <div class="form-group">
            <label for="guichet">Sélectionner un Guichet :</label>
            <select 
              v-model="selectedGuichet" 
              id="guichet" 
              class="form-control" 
              required
            >
              <option 
                v-for="guichet in guichets" 
                :key="guichet.id" 
                :value="guichet.numero_guichet"
              >
                Guichet {{ guichet.numero_guichet }} - {{ guichet.status ? 'Ouvert' : 'Fermé' }}
              </option>
            </select>
          </div>

          <div class="form-actions">
            <button type="submit" class="btn btn-success">Ajouter</button>
            <button type="button" class="btn btn-secondary" @click="closeModal">Annuler</button>
          </div>
        </form>
      </div>
    </div>

    <div v-if="currentModal === 'viewStats'" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content stats-modal">
        <h2>Statistiques des Tickets</h2>
        <div class="stats-container">
          <div class="stats-left">
            <canvas id="pieChart"></canvas>
          </div>
          <div class="stats-right">
            <canvas id="lineChart"></canvas>
          </div>
        </div>

        <div class="ticket-counts">
          <h3>Nombre de tickets par guichet :</h3>
          <ul>
            <li v-for="(count, guichet) in ticketCounts" :key="guichet">
              Guichet {{ guichet }} : {{ count }} ticket(s)
            </li>
          </ul>
        </div>

        <div class="form-actions">
          <button class="btn btn-secondary" @click="closeModal">Fermer</button>
        </div>
      </div>
    </div>

    <div class="ticket-list">
      <div 
        v-for="ticket in tickets" 
        :key="ticket.ticketNumber" 
        class="ticket-card"
      >
        <div class="ticket-content">
          <h2>Ticket #{{ ticket.ticketNumber }}</h2>
          <p><strong>Nom :</strong> {{ ticket.name }}</p>
          <p><strong>Téléphone :</strong> {{ ticket.phone }}</p>
          <p><strong>Date :</strong> {{ ticket.date }}</p>
          <p><strong>Guichet :</strong> {{ ticket.guichet }}</p>
          <p><strong>Statut :</strong> {{ ticket.status }}</p>
        </div>
        <div class="status-actions">
          <button 
            class="btn btn-outline-info custom-btn" 
            @click="updateStatus(ticket, 'en attente')"
          >
            En attente
          </button>
          <button 
            class="btn btn-outline-warning custom-btn" 
            @click="updateStatus(ticket, 'en cours')"
          >
            En cours
          </button>
          <button 
            class="btn btn-outline-success custom-btn" 
            @click="updateStatus(ticket, 'terminé')"
          >
            Terminé
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';
import Chart from 'chart.js/auto';
import axios from 'axios';

const name = ref('');
const phone = ref('');
const selectedGuichet = ref('');
const status = ref('en attente');
const tickets = ref([]);
const guichets = ref([]);
let nextTicketNumber = ref(1);

const currentModal = ref(null);
let pieChartInstance = null;
let lineChartInstance = null;



const ticketCounts = ref({});



const fetchGuichets = async () => {
  try {
    const response = await axios.get('http://localhost:5002/api/guichets');
    guichets.value = response.data;
  } catch (error) {
    console.error('Erreur lors du chargement des guichets', error);
  }
};

onMounted(() => {
  fetchGuichets();
});

const addTicket = () => {
  if (!selectedGuichet.value) {
    alert('Veuillez sélectionner un guichet.');
    return;
  }

  const newTicket = {
    name: name.value,
    phone: phone.value,
    ticketNumber: nextTicketNumber.value++,
    date: new Date().toLocaleString(),
    guichet: selectedGuichet.value,
    status: status.value,
  };

  tickets.value.push(newTicket);

  updateTicketCounts(); 

  resetForm();
  closeModal();
  renderCharts();  
};

const resetForm = () => {
  name.value = '';
  phone.value = '';
  selectedGuichet.value = '';
  status.value = 'en attente';
};

const openModal = (modalType) => {
  currentModal.value = modalType;
  if (modalType === 'viewStats') {
    nextTick(renderCharts); 
  }
};

const closeModal = () => {
  currentModal.value = null;
};

const updateStatus = (ticket, newStatus) => {
  ticket.status = newStatus;
};


const updateTicketCounts = () => {
  ticketCounts.value = {}; 
  tickets.value.forEach((ticket) => {
    ticketCounts.value[ticket.guichet] = (ticketCounts.value[ticket.guichet] || 0) + 1;
  });
};


const renderCharts = () => {
  if (tickets.value.length === 0) {
    return; 
  }


  const ticketCountsData = ticketCounts.value;

  if (pieChartInstance) {
    pieChartInstance.destroy();
  }
  if (lineChartInstance) {
    lineChartInstance.destroy();
  }

  const pieChartEl = document.getElementById('pieChart');
  const lineChartEl = document.getElementById('lineChart');

  
  const ctx1 = pieChartEl.getContext('2d');
  pieChartInstance = new Chart(ctx1, {
    type: 'doughnut',
    data: {
      labels: Object.keys(ticketCountsData),
      datasets: [
        {
          data: Object.values(ticketCountsData),
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50', '#FFA500'],
        },
      ],
    },
  });

 
  const ctx2 = lineChartEl.getContext('2d');
  lineChartInstance = new Chart(ctx2, {
    type: 'line',
    data: {
      labels: Object.keys(ticketCountsData),
      datasets: [
        {
          label: 'Tickets par guichet',
          data: Object.values(ticketCountsData),
          fill: false,
          borderColor: '#4CAF50',
          tension: 0.1,
        },
      ],
    },
  });
};
</script>

<style scoped>

.custom-btn {
  border-width: 2px; 
  background-color: transparent; 
}

.custom-btn:hover {
  opacity: 0.9; 
}

.buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

.buttons button {
  display: inline-block;
  line-height: normal;
  margin: 0;
  padding: 10px 20px;
}

.buttons .btn-info {
  margin-top: -19px; 
}


.ticket-manager {
  max-width: 1200px;
  margin: auto;
  padding: 20px;
}

button.btn-primary {
  margin-bottom: 20px;
}


.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10; 
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  max-width: 90%; 
  max-height: 80vh; 
  overflow-y: auto;
  box-sizing: border-box;
}

.stats-modal .modal-content {
  width: 100%; 
  max-width: 1200px; 
  padding: 30px;
}

.stats-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
}

.stats-left, .stats-right {
  width: 100%;
  height: 300px;
}

.ticket-counts {
  margin-top: 20px;
}

.ticket-counts ul {
  list-style-type: none;
  padding: 0;
}

.ticket-counts li {
  font-size: 16px;
  margin-bottom: 5px;
}

.form-actions {
  display: flex;
  justify-content: space-between;
}

.ticket-list {
  margin-top: 40px;
}

.ticket-card {
  background-color: #f9f9f9;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.ticket-content h2 {
  margin-bottom: 10px;
}

.status-actions {
  margin-top: 10px;
}

.status-actions button {
  margin-right: 5px;
}.status-actions {
  display: flex;
  flex-direction: column;  
  gap: 20px; 
  margin-top: 10px;
}

.status-actions button {
  width: 100%;  
}


.ticket-list .ticket-card {
  display: flex;
  justify-content: space-between;
}

.btn {
  padding: 10px 15px;
  font-size: 14px;
}

.modal-content {
  background-color: #fff;
  padding: 40px 20px; 
  border-radius: 8px;
  max-width: 80%;
  overflow-y: auto;
}

.stats-modal .modal-content {
  width: 80%;
  max-width: 1000px;
  padding: 40px 20px; 
}


</style> -->
<!-- <template>
  <div class="container-fluid">
    <h2 class="text-center">Gestion des Tickets</h2>

    
    <div class="mb-3 d-flex justify-content-end align-items-end">
      <button class="btn btn-primary" @click="openAddModal">
        Ajouter un Ticket
      </button>
    </div>


    <div v-if="notification" class="alert alert-info">{{ notification }}</div>

    <table class="table table-striped">
      <thead>
        <tr>
          <th>Nom</th>
          <th>Téléphone</th>
          <th>Numéro</th>
          <th>Statut</th>
          <th>Date/Heure de Création</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="ticket in tickets" :key="ticket.id">
          <td>{{ ticket.nom }}</td>
          <td>{{ ticket.telephone }}</td>
          <td>{{ ticket.numero }}</td>
          <td>
            <span>{{ ticket.statut }}</span>
         
            <div class="dropdown d-inline">
              <button class="btn btn-secondary btn-sm dropdown-toggle" type="button" id="statusDropdown" aria-expanded="false" @click="toggleDropdown(ticket.id)">
                Changer statut
              </button>
              <ul class="dropdown-menu" :class="{ show: dropdownId === ticket.id }">
                <li><button class="dropdown-item" @click="changeStatus(ticket.id, 'En cours')">En cours</button></li>
                <li><button class="dropdown-item" @click="changeStatus(ticket.id, 'En attente')">En attente</button></li>
                <li><button class="dropdown-item" @click="changeStatus(ticket.id, 'Terminé')">Terminé</button></li>
              </ul>
            </div>
          </td>
          <td>{{ ticket.date_heure_creation }}</td>
          <td>
      
            <font-awesome-icon
              icon="eye"
              class="text-info me-3"
              style="cursor: pointer"
              @click="viewTicket(ticket)"
            />
            <font-awesome-icon
              icon="edit"
              class="text-warning me-3"
              style="cursor: pointer"
              @click="openEditModal(ticket)"
            />
            <font-awesome-icon
              icon="trash"
              class="text-danger me-3"
              style="cursor: pointer"
              @click="confirmDelete(ticket.id)"
            />
          </td>
        </tr>
      </tbody>
    </table>


    <Modal :isOpen="isAddModalOpen" title="Ajouter un Ticket" @close="closeAddModal">
      <form @submit.prevent="submitAddForm" class="form-container pt-3 pb-3">
        <input v-model="newForm.nom" placeholder="Nom" class="form-control mb-3" required />
        <input v-model="newForm.telephone" placeholder="Téléphone" class="form-control mb-3" required />
        <input v-model.number="newForm.numero" placeholder="Numéro" class="form-control mb-3" required />
        <select v-model="newForm.statut" class="form-control mb-3" required>
          <option value="En attente">En attente</option>
          <option value="En cours">En cours</option>
          <option value="Terminé">Terminé</option>
        </select>
        <button type="submit" class="btn btn-primary">
          Ajouter
        </button>
      </form>
    </Modal>

 
    <Modal :isOpen="isEditModalOpen" title="Modifier un Ticket" @close="closeEditModal">
      <form @submit.prevent="submitEditForm" class="form-container pt-3 pb-3">
        <input v-model="editForm.nom" placeholder="Nom" class="form-control mb-3" required />
        <input v-model="editForm.telephone" placeholder="Téléphone" class="form-control mb-3" required />
        <input v-model.number="editForm.numero" placeholder="Numéro" class="form-control mb-3" required />
        <select v-model="editForm.statut" class="form-control mb-3" required>
          <option value="En attente">En attente</option>
          <option value="En cours">En cours</option>
          <option value="Terminé">Terminé</option>
        </select>
        <button type="submit" class="btn btn-success">
          Sauvegarder
        </button>
      </form>
    </Modal>

    <Modal :isOpen="isViewModalOpen" title="Voir un Ticket" @close="closeViewModal">
      <div class="form-container pt-3 pb-3">
        <p><strong>Nom : </strong>{{ selectedTicket.nom }}</p>
        <p><strong>Téléphone : </strong>{{ selectedTicket.telephone }}</p>
        <p><strong>Numéro : </strong>{{ selectedTicket.numero }}</p>
        <p><strong>Statut : </strong>{{ selectedTicket.statut }}</p>
        <p><strong>Date/Heure de Création : </strong>{{ selectedTicket.date_heure_creation }}</p>
        <button class="btn btn-secondary" @click="closeViewModal">Fermer</button>
      </div>
    </Modal>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Modal from './Modal.vue';

const tickets = ref([]);
const notification = ref('');
const isAddModalOpen = ref(false);
const isEditModalOpen = ref(false);
const isViewModalOpen = ref(false);

const newForm = ref({ nom: '', telephone: '', numero: null, statut: 'En attente' });
const editForm = ref({});
const selectedTicket = ref({});
const dropdownId = ref(null);


const openAddModal = () => (isAddModalOpen.value = true);
const closeAddModal = () => (isAddModalOpen.value = false);

const openEditModal = (ticket) => {
  editForm.value = { ...ticket };
  isEditModalOpen.value = true;
};
const closeEditModal = () => (isEditModalOpen.value = false);

const viewTicket = (ticket) => {
  selectedTicket.value = { ...ticket };
  isViewModalOpen.value = true;
};
const closeViewModal = () => (isViewModalOpen.value = false);

const submitAddForm = () => {
  const newTicket = {
    id: Date.now(),
    ...newForm.value,
    date_heure_creation: new Date().toISOString(),
  };
  tickets.value.push(newTicket);
  notification.value = 'Ticket ajouté avec succès !';
  closeAddModal();
};

const submitEditForm = () => {
  tickets.value = tickets.value.map((ticket) =>
    ticket.id === editForm.value.id ? { ...editForm.value } : ticket
  );
  notification.value = 'Ticket modifié avec succès !';
  closeEditModal();
};

const confirmDelete = (id) => {
  if (window.confirm('Êtes-vous sûr de vouloir supprimer ce ticket ?')) {
    tickets.value = tickets.value.filter((ticket) => ticket.id !== id);
    notification.value = 'Ticket supprimé avec succès !';
  }
};

const changeStatus = (id, newStatus) => {
  const ticket = tickets.value.find((t) => t.id === id);
  if (ticket) {
    ticket.statut = newStatus;
    notification.value = `Statut du ticket ${id} mis à jour en "${newStatus}"`;
  }
};

// Toggle dropdown visibility
const toggleDropdown = (id) => {
  dropdownId.value = dropdownId.value === id ? null : id;
};
</script> -->

<!-- <template>
  <div class="container-fluid">
    <h2 class="text-center">Gestion des Tickets</h2>

    <div class="mb-3 d-flex justify-content-end align-items-end">
      <button class="btn btn-primary" @click="openAddModal">
        Ajouter un Ticket
      </button>
    </div>

  
    <div v-if="notification" class="alert alert-info">{{ notification }}</div>

 
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Nom</th>
          <th>Téléphone</th>
          <th>Numéro</th>
          <th>Statut</th>
          <th>Date/Heure de Création</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="ticket in tickets" :key="ticket.id">
          <td>{{ ticket.nom }}</td>
          <td>{{ ticket.telephone }}</td>
          <td>{{ ticket.numero }}</td>
          <td>
       
            <span class="me-3">{{ ticket.statut }}</span>

     
            <div class="dropdown d-inline position-relative">
              <button
                class="btn btn-secondary btn-sm dropdown-toggle"
                type="button"
                aria-expanded="false"
                @click="toggleDropdown(ticket.id)"
              >
                Changer statut
              </button>
              <ul
                class="dropdown-menu shadow-sm"
                :class="{ show: dropdownId === ticket.id }"
                style="z-index: 1050; min-width: 150px"
              >
                <li>
                  <button
                    class="dropdown-item"
                    @click="() => { changeStatus(ticket.id, 'En cours'); toggleDropdown(null); }"
                  >
                    En cours
                  </button>
                </li>
                <li>
                  <button
                    class="dropdown-item"
                    @click="() => { changeStatus(ticket.id, 'En attente'); toggleDropdown(null); }"
                  >
                    En attente
                  </button>
                </li>
                <li>
                  <button
                    class="dropdown-item"
                    @click="() => { changeStatus(ticket.id, 'Terminé'); toggleDropdown(null); }"
                  >
                    Terminé
                  </button>
                </li>
              </ul>
            </div>
          </td>
          <td>{{ ticket.date_heure_creation }}</td>
          <td>
            
            <font-awesome-icon
              icon="eye"
              class="text-info me-3"
              style="cursor: pointer"
              @click="viewTicket(ticket)"
            />
            <font-awesome-icon
              icon="edit"
              class="text-warning me-3"
              style="cursor: pointer"
              @click="openEditModal(ticket)"
            />
            <font-awesome-icon
              icon="trash"
              class="text-danger me-3"
              style="cursor: pointer"
              @click="confirmDelete(ticket.id)"
            />
          </td>
        </tr>
      </tbody>
    </table>

    
    <Modal :isOpen="isAddModalOpen" title="Ajouter un Ticket" @close="closeAddModal">
      <form @submit.prevent="submitAddForm" class="form-container pt-3 pb-3">
        <input v-model="newForm.nom" placeholder="Nom" class="form-control mb-3" required />
        <input v-model="newForm.telephone" placeholder="Téléphone" class="form-control mb-3" required />
        <input v-model.number="newForm.numero" placeholder="Numéro" class="form-control mb-3" required />
        <select v-model="newForm.statut" class="form-control mb-3" required>
          <option value="En attente">En attente</option>
          <option value="En cours">En cours</option>
          <option value="Terminé">Terminé</option>
        </select>
        <button type="submit" class="btn btn-primary">
          Ajouter
        </button>
      </form>
    </Modal>

 
    <Modal :isOpen="isEditModalOpen" title="Modifier un Ticket" @close="closeEditModal">
      <form @submit.prevent="submitEditForm" class="form-container pt-3 pb-3">
        <input v-model="editForm.nom" placeholder="Nom" class="form-control mb-3" required />
        <input v-model="editForm.telephone" placeholder="Téléphone" class="form-control mb-3" required />
        <input v-model.number="editForm.numero" placeholder="Numéro" class="form-control mb-3" required />
        <select v-model="editForm.statut" class="form-control mb-3" required>
          <option value="En attente">En attente</option>
          <option value="En cours">En cours</option>
          <option value="Terminé">Terminé</option>
        </select>
        <button type="submit" class="btn btn-success">
          Sauvegarder
        </button>
      </form>
    </Modal>

   
    <Modal :isOpen="isViewModalOpen" title="Voir un Ticket" @close="closeViewModal">
      <div class="form-container pt-3 pb-3">
        <p><strong>Nom : </strong>{{ selectedTicket.nom }}</p>
        <p><strong>Téléphone : </strong>{{ selectedTicket.telephone }}</p>
        <p><strong>Numéro : </strong>{{ selectedTicket.numero }}</p>
        <p><strong>Statut : </strong>{{ selectedTicket.statut }}</p>
        <p><strong>Date/Heure de Création : </strong>{{new Date(selectedTicket.date_heure_creation).toLocaleDateString()}}</p>
        <button class="btn btn-secondary" @click="closeViewModal">Fermer</button>
      </div>
    </Modal>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Modal from './Modal.vue';

const tickets = ref([]);
const notification = ref('');
const isAddModalOpen = ref(false);
const isEditModalOpen = ref(false);
const isViewModalOpen = ref(false);

const newForm = ref({ nom: '', telephone: '', numero: null, statut: 'En attente' });
const editForm = ref({});
const selectedTicket = ref({});
const dropdownId = ref(null);

const openAddModal = () => (isAddModalOpen.value = true);
const closeAddModal = () => (isAddModalOpen.value = false);

const openEditModal = (ticket) => {
  editForm.value = { ...ticket };
  isEditModalOpen.value = true;
};
const closeEditModal = () => (isEditModalOpen.value = false);

const viewTicket = (ticket) => {
  selectedTicket.value = { ...ticket };
  isViewModalOpen.value = true;
};
const closeViewModal = () => (isViewModalOpen.value = false);

const submitAddForm = () => {
  const newTicket = {
    id: Date.now(),
    ...newForm.value,
    date_heure_creation: new Date().toLocaleString(), 
  };
  tickets.value.push(newTicket);
  notification.value = 'Ticket ajouté avec succès !';
  closeAddModal();
};

const submitEditForm = () => {
  tickets.value = tickets.value.map((ticket) =>
    ticket.id === editForm.value.id ? { ...editForm.value } : ticket
  );
  notification.value = 'Ticket modifié avec succès !';
  closeEditModal();
};

const confirmDelete = (id) => {
  if (window.confirm('Êtes-vous sûr de vouloir supprimer ce ticket ?')) {
    tickets.value = tickets.value.filter((ticket) => ticket.id !== id);
    notification.value = 'Ticket supprimé avec succès !';
  }
};

const changeStatus = (id, newStatus) => {
  const ticket = tickets.value.find((t) => t.id === id);
  if (ticket) {
    ticket.statut = newStatus;
    notification.value = `Statut du ticket ${id} mis à jour en "${newStatus}"`;
  }
};

const toggleDropdown = (id) => {
  dropdownId.value = dropdownId.value === id ? null : id;
};
</script>

<style>
.dropdown-menu {
  border-radius: 8px;
  padding: 5px 0;
  font-size: 14px;
  transition: all 0.3s ease-in-out;
}

.dropdown-menu .dropdown-item:hover {
  background-color: #f8f9fa;
  color: #495057;
}

.dropdown-menu .dropdown-item {
  padding: 10px 15px;
}
</style> -->


<template>
  <div class="container-fluid">
    <h2 class="text-center">Gestion des Tickets</h2>

    <!-- Bouton Ajouter -->
    <div class="mb-3 d-flex justify-content-end align-items-end">
      <button class="btn btn-primary" @click="openAddModal">
        Ajouter un Ticket
      </button>
    </div>

    <!-- Message de notification -->
    <div v-if="notification" class="alert alert-info">{{ notification }}</div>

    <!-- Tableau des tickets -->
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Nom</th>
          <th>Téléphone</th>
          <th>Numéro</th>
          <th>Statut</th>
          <th>Guichet</th>
          <th>Date/Heure de Création</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="ticket in ticketStore.tickets.value" :key="ticket.id">

          <td>{{ ticket.nom }}</td>
          <td>{{ ticket.telephone }}</td>
          <td>{{ ticket.numero }}</td>
          <td>{{ ticket.statut }}</td>
          <td>{{ticket.guichet.numero_guichet }}</td>
          <td>
              {{
                new Intl.DateTimeFormat('fr-FR', { 
                  dateStyle: 'short', 
                  timeStyle: 'short' 
                }).format(new Date(ticket.date_heure_creation))
              }}
            </td>

          <td>
            <!-- Boutons de changement de statut -->
            <button
              v-if="ticket.statut !== 'Terminé'"
              class="btn btn-outline-primary btn-sm me-2"
              @click="changeStatus(ticket, 'En attente')"
            >
              En attente
            </button>
            <button
              v-if="ticket.statut !== 'Terminé'"
              class="btn btn-outline-warning btn-sm me-2"
              @click="changeStatus(ticket, 'En cours')"
            >
              En cours
            </button>
            <button
              v-if="ticket.statut !== 'Terminé'"
              class="btn btn-outline-success btn-sm me-2"
              @click="changeStatus(ticket, 'Terminé')"
            >
              Terminé
            </button>

            <!-- Actions existantes -->
            <font-awesome-icon
              icon="eye"
              class="text-info me-3"
              style="cursor: pointer"
              @click="viewTicket(ticket)"
            />
            <font-awesome-icon
              icon="edit"
              class="text-warning me-3"
              style="cursor: pointer"
              @click="openEditModal(ticket)" 
            />

            <font-awesome-icon
              icon="trash"
              class="text-danger me-3"
              style="cursor: pointer"
              @click="confirmDelete(ticket.id)"
            />
          </td>
        </tr>
      </tbody>
    </table>

   
    <Modal :isOpen="isAddModalOpen" title="Ajouter un Ticket" @close="closeAddModal">
      <form @submit.prevent="submitAddForm" class="form-container">
        <div class="row">
          <div class="col-md-6">
            <input v-model="newForm.nom" placeholder="Nom" class="form-control mb-3" required />
          </div>
          <div class="col-md-6">
            <input v-model="newForm.telephone" placeholder="Téléphone" class="form-control mb-3" required />
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <input v-model.number="newForm.numero" placeholder="Numéro" class="form-control mb-3" required />
          </div>
          <div class="col-md-6">
        <select v-model="newForm.statut" class="form-control mb-3" required>
          <option value="En attente">En attente</option>
          <option value="En cours">En cours</option>
          <option value="Terminé">Terminé</option>
        </select>
      </div>
        </div>
        <select v-model="newForm.guichet" class="form-control mb-3" required>
          <option disabled value="">Sélectionnez un guichet</option>
          <option v-for="guichet in guichets" :key="guichet.id" :value="guichet.id">
            {{ guichet.numero_guichet }}
          </option>
        </select>
        <button type="submit" class="btn btn-primary">Ajouter</button>
      </form>
    </Modal>
    <Modal :isOpen="isEditModalOpen" title="Modifier un Ticket" @close="closeEditModal">
      <form @submit.prevent="submitEditForm" class="form-container pt-3 pb-3">
        <input v-model="selectedTicket.nom" placeholder="Nom" class="form-control mb-3" required />
        <input v-model="selectedTicket.telephone" placeholder="Téléphone" class="form-control mb-3" required />
        <input v-model.number="selectedTicket.numero" placeholder="Numéro" class="form-control mb-3" required />
        <select v-model="selectedTicket.statut" class="form-control mb-3" required>
          <option value="En attente">En attente</option>
          <option value="En cours">En cours</option>
          <option value="Terminé">Terminé</option>
        </select>
        <select v-model="selectedTicket.guichet" class="form-control mb-3" required>
          <option disabled value="">Sélectionnez un guichet</option>
          <option v-for="guichet in guichets" :key="guichet.id" :value="guichet.id">
            {{ guichet.numero_guichet }}
          </option>
        </select>
        <button type="submit" class="btn btn-primary">Enregistrer</button>
      </form>
    </Modal>

    <Modal :isOpen="isViewModalOpen" title="Voir un Ticket" @close="closeViewModal">
      <div class="form-container pt-3 pb-3">
        <p><strong>Nom : </strong>{{ selectedTicket.nom }}</p>
        <p><strong>Téléphone : </strong>{{ selectedTicket.telephone }}</p>
        <p><strong>Numéro : </strong>{{ selectedTicket.numero }}</p>
        <p><strong>Statut : </strong>{{ selectedTicket.statut }}</p>
        <p><strong>Guichet : </strong>{{selectedTicket.numero_guichet }}</p>
        <p><strong>Date/Heure de Création : </strong>{{ selectedTicket.date_heure_creation }}</p>
        <button class="btn btn-secondary" @click="closeViewModal">Fermer</button>
      </div>
    </Modal>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import Modal from './Modal.vue';
import axios from 'axios';
import { useTicketStore } from '../stores/ticketStore.js'; 

const ticketStore = useTicketStore(); 

const tickets = ref([]);
const guichets = ref([]);
const notification = ref('');
const isAddModalOpen = ref(false);
const isViewModalOpen = ref(false);
const isEditModalOpen = ref(false);  // Déclarez une variable pour gérer l'état du modal d'édition
const newForm = ref({ nom: '', telephone: '', numero: null, statut: 'En attente', guichet: '' });
const selectedTicket = ref({});

// Modale management
const openAddModal = () => (isAddModalOpen.value = true);
const closeAddModal = () => (isAddModalOpen.value = false);

const viewTicket = (ticket) => {
  selectedTicket.value = { ...ticket };
  isViewModalOpen.value = true;
};
const closeViewModal = () => (isViewModalOpen.value = false);

// Ouvrir le modal d'édition
const openEditModal = (ticket) => {
  
  selectedTicket.value = { ...ticket };  // Remplir le ticket sélectionné avec les données du ticket à éditer
  isEditModalOpen.value = true;  // Ouvrir le modal d'édition
};

// Fermer le modal d'édition
const closeEditModal = () => {
  isEditModalOpen.value = false;
};

// Enregistrer les modifications du ticket
const submitEditForm = () => {
  const index = tickets.value.findIndex((ticket) => ticket.id === selectedTicket.value.id);
  if (index !== -1) {
    tickets.value[index] = { ...selectedTicket.value };  // Mettre à jour le ticket modifié
    notification.value = 'Ticket modifié avec succès !';
  }
  closeEditModal();  // Fermer le modal après modification
};

// Fetch guichets depuis le backend
const fetchGuichets = async () => {
  try {
    const response = await axios.get('http://localhost:5002/api/guichets');
    guichets.value = response.data;
    console.log("Gichets", guichets.value);
    
  } catch (error) {
    console.error("Erreur lors de la récupération des guichets :", error.message);
  }
};
const user  = computed(()=> localStorage.getItem("UserConnecter"))
console.log(user.value);

// Ajouter un ticket
const submitAddForm = async () => {
  const newTicket = {
    id: Date.now(),
    ...newForm.value,
  
    date_heure_creation: new Date().toLocaleString(),
  };

  try {
    await ticketStore.addTicket(newTicket.nom, newTicket.telephone, newTicket.numero, newTicket.statut, newTicket.guichet, user.value); // Appel au store pour ajouter le ticket via l'API
    notification.value = 'Ticket ajouté avec succès !';
  } catch (error) {
    notification.value = "Erreur lors de l'ajout du ticket";
  } finally {
    closeAddModal();
  }
};


// Supprimer un ticket
const confirmDelete = (id) => {
  if (window.confirm('Êtes-vous sûr de vouloir supprimer ce ticket ?')) {
    tickets.value = tickets.value.filter((ticket) => ticket.id !== id);
    notification.value = 'Ticket supprimé avec succès !';
    ticketStore.deleteTicket(id)

  }
};

// Trouver le nom du guichet
const getGuichetName = (id) => {
  console.log("numero " ,id);
  
  const guichet = guichets.value.find((g) => g.id === id);
  return guichet ? guichet.numero_guichet: 'N/A';
};

// Changer le statut du ticket
const changeStatus = (ticket, statut) => {
  if (ticket.statut === 'Terminé') {
    return;
  }
  ticket.statut = statut;
  notification.value = `Statut du ticket mis à jour à "${statut}" !`;
};

// Charger les guichets au montage
onMounted(async ()=> {
 await fetchGuichets()
  await ticketStore.fetchTickets()
  
}

);
</script>

<style>
.table {
  font-size: 14px;
}
.dropdown-menu {
  border-radius: 8px;
}
</style>
