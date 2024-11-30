
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
        <tr v-for="ticket in ticketStore.tickets.value.sort((a,b)=> a.numero - b.numero)" :key="ticket.id">

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
              @click=" ticketStore.editTicket(ticket.id, 'En attente')"
            >
              En attente
            </button>
            <button
              v-if="ticket.statut !== 'Terminé'"
              class="btn btn-outline-warning btn-sm me-2"
              @click="ticketStore.editTicket(ticket.id, 'En cours')"
            >
              En cours
            </button>
            <button
              v-if="ticket.statut !== 'Terminé'"
              class="btn btn-outline-success btn-sm me-2"
              @click="ticketStore.editTicket(ticket.id, 'Terminé')"
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
            <input 
              v-model="newForm.nom" 
              placeholder="Nom" 
              class="form-control mb-3" 
              required 
              pattern="[A-Za-zÀ-ÿ\s]+" 
              title="Le nom ne doit contenir que des lettres."
            />
          </div>

          <div class="col-md-6">
            <input 
              v-model="newForm.telephone" 
              placeholder="Téléphone" 
              class="form-control mb-3" 
              required 
              pattern="^\+222[432]\d{7}$" 
              title="Le numéro doit commencer par +222 et être suivi du chiffre 4, 3 ou 2, puis de 7 chiffres supplémentaires."
            />
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
    <form @submit.prevent="submitEditForm" class="form-container pt-3 pb-3 custom-form">
    <div class="row">
      <div class="col-md-6">
        <input v-model="selectedTicket.nom" placeholder="Nom" class="form-control mb-3" required />
      </div>
      <div class="col-md-6">
        <input v-model="selectedTicket.telephone" placeholder="Téléphone" class="form-control mb-3" required />
      </div>
    </div>

    <div class="row">
      <div class="col-md-6">
        <input v-model.number="selectedTicket.numero" placeholder="Numéro" class="form-control mb-3" required />
      </div>
      <div class="col-md-6">
        <select v-model="selectedTicket.statut" class="form-control mb-3" required>
          <option value="En attente">En attente</option>
          <option value="En cours">En cours</option>
          <option value="Terminé">Terminé</option>
        </select>
      </div>
    </div>

    <div class="row">
      <div class="col-md-6">
        <select v-model="selectedTicket.guichet" class="form-control mb-3" required>
          <option disabled value="">Sélectionnez un guichet</option>
          <option v-for="guichet in guichets" :key="guichet.id" :value="guichet.id">
            {{ guichet.numero_guichet }}
          </option>
        </select>
      </div>
    </div>

    <div class="row">
      <div class="col-12 text-center">
        <button type="submit" class="btn btn-primary">Enregistrer</button>
      </div>
    </div>
  </form> 

</Modal>

    <Modal :isOpen="isViewModalOpen" title="Voir un Ticket" @close="closeViewModal">
      <div class="form-container pt-3 pb-3">
        <p ><strong>Nom : </strong>{{ selectedTicket.nom }}</p>
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


const id = ref()
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
  id.value = selectedTicket.value.id

};

// Fermer le modal d'édition
const closeEditModal = () => {
  isEditModalOpen.value = false;
};


// Enregistrer les modifications du ticket
const submitEditForm = async() => {
  console.log("IDENTIFIANT ", id.value)
  // const index = tickets.value.findIndex((ticket) => ticket.id === selectedTicket.value.id);
  // if (index !== -1) {
  //   tickets.value[index] = { ...selectedTicket.value };  // Mettre à jour le ticket modifié
  //   notification.value = 'Ticket modifié avec succès !';
  // }

   await ticketStore.editTicket(Number(id.value), selectedTicket.value.statut, selectedTicket.value.nom, selectedTicket.value.telephone, selectedTicket.value.numero, selectedTicket.value.guichet_id, selectedTicket.value.utilisateur_id)
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
/* Style pour réduire la largeur du formulaire */
.custom-form {
  max-width: 600px; /* ajustez la largeur maximale comme vous le souhaitez */
  margin: 0 auto; /* centre le formulaire horizontalement */
  height: 295px;
}

.table {
  font-size: 14px;
}
.dropdown-menu {
  border-radius: 8px;
}
</style>
