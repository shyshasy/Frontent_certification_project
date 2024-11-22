<template>
  <div class="container-fluid">
    <h2 class="text-center">Gestion des Guichets</h2>
    <!-- Bouton Ajouter -->
    <div class="mb-3 d-flex justify-content-end align-items-end">
      <button class="btn btn-primary  text-start" @click="openAddModal">
        <font-awesome-icon icon="plus-circle" /> Ajouter un Guichet
      </button>
    </div>

    <!-- Tableau des guichets -->
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Numéro Guichet</th>
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
            <!-- Icônes pour les actions -->
            <font-awesome-icon
              icon="eye"
              class="text-info me-3"
              style="cursor: pointer"
              @click="viewGuichet(guichet)"
            />
            <font-awesome-icon
              icon="edit"
              class="text-warning me-3"
              style="cursor: pointer"
              @click="openEditModal(guichet)"
            />
            <font-awesome-icon
              icon="trash"
              class="text-danger me-3"
              style="cursor: pointer"
              @click="confirmDelete(guichet.id)"
            />
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modale pour ajouter un guichet -->
    <Modal :isOpen="isAddModalOpen" title="Ajouter un Guichet" @close="closeAddModal">
      <form @submit.prevent="submitAddForm" class="form-container pt-5 pb-5">
        <div class="form-grid">
          <div class="form-left">
            <input type="number" v-model="newForm.numero_guichet" placeholder="Numéro du Guichet" class="form-control mb-3" required />
            <select v-model="newForm.status" class="form-control" required>
              <option value="" disabled>Status</option>
              <option :value="true">Ouvert</option>
              <option :value="false">Fermé</option>
            </select>
          </div>
          <div class="form-right">
            <input v-model="newForm.responsable" placeholder="Responsable" class="form-control mb-3" required />
          </div>
        </div>
        <!-- Bouton Ajouter -->
        <button class="btn btn-success mt-3">Ajouter un Guichet</button>
      </form>
    </Modal>

    <!-- Modale pour modifier un guichet -->
    <Modal :isOpen="isEditModalOpen" title="Modifier Guichet" @close="closeEditModal">
      <form @submit.prevent="submitEditForm" class="form-container pt-5 pb-5">
        <div class="form-grid">
          <div class="form-left">
            <input type="number" v-model="editForm.numero_guichet" placeholder="Numéro du Guichet" class="form-control mb-3" required />
            <select v-model="editForm.status" class="form-control" required>
              <option value="" disabled>Status</option>
              <option :value="true">Ouvert</option>
              <option :value="false">Fermé</option>
            </select>
          </div>
          <div class="form-right">
            <input v-model="editForm.responsable" placeholder="Responsable" class="form-control mb-3" required />
          </div>
        </div>
        <!-- Bouton Sauvegarder -->
        <div class="d-flex justify-content-center mt-3">
            <button class="btn btn-success" style="width: 150px;">
                <i class="fas fa-save"></i> Sauvegarder
            </button>
        </div>


        
      </form>
    </Modal>
  </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';
import { useToast } from 'vue-toastification';
import Modal from './Modal.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

export default {
  components: {
    Modal,
    FontAwesomeIcon,
  },
  setup() {
    const toast = useToast();
    const guichets = ref([]);
    const isAddModalOpen = ref(false);
    const isEditModalOpen = ref(false);
    const newForm = ref({ numero_guichet: '', status: false, responsable: '' });
    const editForm = ref({ numero_guichet: '', status: false, responsable: '' });
    const selectedGuichetId = ref(null);

    const fetchGuichets = async () => {
      try {
        const response = await axios.get('http://localhost:5002/api/guichets');
        guichets.value = response.data;
      } catch (error) {
        toast.error('Erreur lors du chargement des guichets.');
      }
    };

    fetchGuichets();

    const openAddModal = () => (isAddModalOpen.value = true);
    const closeAddModal = () => {
      isAddModalOpen.value = false;
      newForm.value = { numero_guichet: '', status: false, responsable: '' };
    };

    const openEditModal = (guichet) => {
      selectedGuichetId.value = guichet.id;
      editForm.value = { ...guichet, status: Boolean(guichet.status) };
      isEditModalOpen.value = true;
    };

    const closeEditModal = () => {
      isEditModalOpen.value = false;
      editForm.value = { numero_guichet: '', status: false, responsable: '' };
    };

    const submitAddForm = async () => {
      try {
        await axios.post('http://localhost:5002/api/guichets', newForm.value);
        toast.success('Guichet ajouté avec succès !');
        closeAddModal();
        fetchGuichets();
      } catch (error) {
        toast.error("Erreur lors de l'ajout du guichet.");
      }
    };

    const submitEditForm = async () => {
      try {
        await axios.put(`http://localhost:5002/api/guichets/${selectedGuichetId.value}`, editForm.value);
        toast.success('Guichet modifié avec succès !');
        closeEditModal();
        fetchGuichets();
      } catch (error) {
        toast.error("Erreur lors de la modification du guichet.");
      }
    };

    const confirmDelete = async (guichetId) => {
      try {
        await axios.delete(`http://localhost:5002/api/guichets/${guichetId}`);
        toast.success('Guichet supprimé avec succès !');
        fetchGuichets();
      } catch (error) {
        toast.error("Erreur lors de la suppression du guichet.");
      }
    };

    return {
      guichets,
      isAddModalOpen,
      isEditModalOpen,
      newForm,
      editForm,
      openAddModal,
      closeAddModal,
      submitAddForm,
      openEditModal,
      closeEditModal,
      submitEditForm,
      confirmDelete,
    };
  },
};
</script>

<style scoped>
.form-container {
  display: flex;
  flex-direction: column;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

.form-left,
.form-right {
  display: flex;
  flex-direction: column;
}

button-group {
  display: flex;
  gap: 10px;
}

button-group .btn {
  width: 100px;
}
</style>
