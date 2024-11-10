<template>
  <div>
    <h2 class="text-center">Gestion des Guichets</h2>
    <button class="btn btn-success mb-3" @click="openAddModal">Ajouter un Guichet</button>

    <!-- Message de confirmation -->
    <div v-if="notification" class="alert alert-info">{{ notification }}</div>

    <!-- Tableau des guichets -->
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Numero Guichet</th>
          <th>Status</th>
          <th>Responsable</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="guichet in guichets" :key="guichet.id">
          <td>{{ guichet.numero_guichet }}</td>
          <td>{{ guichet.status ? 'Ouvert' : 'Fermé' }}</td>
          <td>{{ guichet.responsable }}</td>
          <td>
            <div class="button-group">
              <button class="btn btn-primary me-2" @click="openEditModal(guichet)">Modifier</button>
              <button class="btn btn-danger" @click="confirmDelete(guichet.id)">Supprimer</button>
              <button class="btn btn-info" @click="viewGuichet(guichet)">Voir</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modale pour ajouter un guichet -->
    <Modal :isOpen="isAddModalOpen" title="Ajouter un Guichet" @close="closeAddModal">
      <form @submit.prevent="submitAddForm" class="form-container">
        <div class="form-grid">
          <div class="form-left">
            <input v-model="newForm.numero_guichet" placeholder="Nom du Guichet" class="form-control" required />
            <select v-model="newForm.status" class="form-control" required>
              <option value="" disabled>Status</option>
              <option value="true">Ouvert</option>
              <option value="false">Fermé</option>
            </select>
          </div>
          <div class="form-right">
            <input v-model="newForm.responsable" placeholder="Responsable" class="form-control" required />
          </div>
        </div>
        <button type="submit" class="btn btn-primary mt-3">Ajouter</button>
      </form>
    </Modal>

    <!-- Modale pour modifier un guichet -->
    <Modal :isOpen="isEditModalOpen" title="Modifier Guichet" @close="closeEditModal">
      <form @submit.prevent="submitEditForm" class="form-container">
        <div class="form-grid">
          <div class="form-left">
            <input v-model="editForm.numero_guichet" placeholder="Nom du Guichet" class="form-control" required />
            <select v-model="editForm.status" class="form-control" required>
              <option value="" disabled>Status</option>
              <option value="true">Ouvert</option>
              <option value="false">Fermé</option>
            </select>
          </div>
          <div class="form-right">
            <input v-model="editForm.responsable" placeholder="Responsable" class="form-control" required />
          </div>
        </div>
        <button type="submit" class="btn btn-success mt-3">Sauvegarder</button>
      </form>
    </Modal>
  </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';
import Modal from './Modal.vue';

export default {
  components: {
    Modal,
  },
  setup() {
    const guichets = ref([]);
    const isAddModalOpen = ref(false);
    const isEditModalOpen = ref(false);
    const newForm = ref({ numero_guichet: '', status: '', responsable: '' });
    const editForm = ref({ numero_guichet: '', status: '', responsable: '' });
    const selectedGuichetId = ref(null);
    const notification = ref('');

    // Fetch guichets from the backend
    const fetchGuichets = async () => {
      try {
        const response = await axios.get('http://localhost:5002/api/guichets');
        guichets.value = response.data;
      } catch (error) {
        console.error(error);
      }
    };

    fetchGuichets();

    const showNotification = (message) => {
      notification.value = message;
      setTimeout(() => {
        notification.value = '';
      }, 3000);
    };

    const openAddModal = () => {
      isAddModalOpen.value = true;
    };

    const closeAddModal = () => {
      isAddModalOpen.value = false;
      newForm.value = { numero_guichet: '', status: '', responsable: '' };
    };

    const openEditModal = (guichet) => {
      selectedGuichetId.value = guichet.id;
      editForm.value = { ...guichet };
      isEditModalOpen.value = true;
    };

    const closeEditModal = () => {
      isEditModalOpen.value = false;
      editForm.value = { numero_guichet: '', status: '', responsable: '' };
    };

    const submitAddForm = async () => {
      try {
        await axios.post('http://localhost:5002/api/guichets', newForm.value);
        showNotification('Guichet ajouté avec succès !');
        closeAddModal();
        await fetchGuichets(); 
      } catch (error) {
        console.error("Error in submitAddForm:", error);
        showNotification("Erreur lors de l'ajout du guichet !");
      }
    };

    const submitEditForm = async () => {
  try {
    // Log de l'ID sélectionné
    console.log("Selected Guichet ID:", selectedGuichetId.value);

    // Extraire les données réelles du formulaire (enlevant le Proxy)
    const formData = { ...editForm.value };  // On clone les données de `editForm.value`
    console.log("Form Data:", formData);

    // Vérifiez si l'ID et les données du formulaire sont valides
    if (!selectedGuichetId.value) {
      throw new Error("L'ID du guichet n'est pas valide.");
    }

    if (!formData || Object.keys(formData).length === 0) {
      throw new Error("Les données du formulaire sont vides.");
    }

    // Effectuer la requête PUT avec axios
    await axios.put(
      `http://localhost:5002/api/guichets/${selectedGuichetId.value}`,
      formData
    );

    // Afficher une notification de succès et fermer le modal
    showNotification('Guichet modifié avec succès !');
    closeEditModal();

    // Recharger les données des guichets
    await fetchGuichets();
  } catch (error) {
    // Log de l'erreur complète pour faciliter le débogage
    console.error("Error in submitEditForm:", error);

    // Vérifiez si c'est une erreur Axios pour afficher un message d'erreur spécifique
    if (error.response) {
      console.error("Erreur réponse API:", error.response.data);
    }

    // Afficher une notification d'erreur à l'utilisateur
    showNotification("Erreur lors de la modification du guichet !");
  }
};

    const confirmDelete = (id) => {
      if (confirm("Êtes-vous sûr de vouloir supprimer ce guichet ?")) {
        deleteGuichet(id);
      }
    };

    const deleteGuichet = async (id) => {
      try {
        await axios.delete(`http://localhost:5002/api/guichets/${id}`);
        showNotification('Guichet supprimé avec succès !');
        await fetchGuichets();
      } catch (error) {
        console.error("Error in deleteGuichet:", error);
        showNotification("Erreur lors de la suppression du guichet !");
      }
    };

    const viewGuichet = (guichet) => {
      // Implement logic for viewing guichet details if needed
      console.log(guichet);
    };

    return {
      guichets,
      isAddModalOpen,
      isEditModalOpen,
      newForm,
      editForm,
      selectedGuichetId,
      notification,
      fetchGuichets,
      showNotification,
      openAddModal,
      closeAddModal,
      openEditModal,
      closeEditModal,
      submitAddForm,
      submitEditForm,
      confirmDelete,
      deleteGuichet,
      viewGuichet
    };
  },
};
</script>

<style>
/* Apply the same CSS styles for guichet form and table */
.form-container {
  max-width: 800px; /* Taille élargie du formulaire */
  margin: auto;
  background-color: transparent;
  border: none;
  padding: 20px;
  
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem; /* Espace entre les colonnes de gauche et de droite du formulaire */
}

.form-left,
.form-right {
  display: flex;
  flex-direction: column;
}

.form-control {
  width: 100%;
  padding: 12px; /* Ajustement du rembourrage interne pour les champs */
  margin-bottom: 20px; /* Espace supplémentaire entre chaque champ du formulaire */
}

.table-striped tbody tr:nth-of-type(odd) {
  background-color: rgba(0, 0, 0, 0.05);
}

.button-group {
  display: flex;
  gap: 0.5rem;
}

.alert {
  margin-bottom: 20px; /* Espace entre le message de notification et le tableau */
}

button[type="submit"] {
  margin-top: 20px; /* Espace supplémentaire entre les champs et le bouton */
}
</style>
