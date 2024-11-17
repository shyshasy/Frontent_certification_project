<template>
  <div>
    <h2 class="text-center">Gestion des Guichets</h2>
    <button class="btn btn-success mb-3" @click="openAddModal">Ajouter un Guichet</button>

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
            <input type="number" v-model="newForm.numero_guichet" placeholder="Numero du Guichet" class="form-control" required />
            <select v-model="newForm.status" class="form-control" required>
              <option value="" disabled>Status</option>
              <option :value="true">Ouvert</option>
              <option :value="false">Fermé</option>
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
            <input type="number" v-model="editForm.numero_guichet" placeholder="Numero du Guichet" class="form-control" required />
            <select v-model="editForm.status" class="form-control" required>
              <option value="" disabled>Status</option>
              <option :value="true">Ouvert</option>
              <option :value="false">Fermé</option>
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
import { useToast } from 'vue-toastification';  // Importation de vue-toastification

export default {
  components: {
    Modal,
  },
  setup() {
    const guichets = ref([]);
    const isAddModalOpen = ref(false);
    const isEditModalOpen = ref(false);
    const newForm = ref({ numero_guichet: '', status: false, responsable: '' });
    const editForm = ref({ numero_guichet: '', status: false, responsable: '' });
    const selectedGuichetId = ref(null);
    const toast = useToast();  // Initialisation de vue-toastification

    const fetchGuichets = async () => {
      try {
        const response = await axios.get('http://localhost:5002/api/guichets');
        guichets.value = response.data;
      } catch (error) {
        console.error("Erreur dans fetchGuichets:", error);
      }
    };

    fetchGuichets();

    const showToast = (message, type = 'success') => {
      toast(message, { type });
    };

    const openAddModal = () => {
      isAddModalOpen.value = true;
    };

    const closeAddModal = () => {
      isAddModalOpen.value = false;
      newForm.value = { numero_guichet: '', status: false, responsable: '' };
    };

    const openEditModal = (guichet) => {
      selectedGuichetId.value = guichet.id;
      if (!selectedGuichetId.value) {
        console.error("ID du guichet invalide");
        showToast("ID du guichet non valide.", 'error');
        return;
      }
      editForm.value = { 
        ...guichet, 
        status: Boolean(guichet.status)  
      };
      isEditModalOpen.value = true;
    };

    const closeEditModal = () => {
      isEditModalOpen.value = false;
      editForm.value = { numero_guichet: '', status: false, responsable: '' };
    };

    const submitAddForm = async () => {
      const formData = {
        numero_guichet: newForm.value.numero_guichet,
        status: Boolean(newForm.value.status),
        responsable: newForm.value.responsable,
      };

      try {
        await axios.post('http://localhost:5002/api/guichets', formData);
        showToast('Guichet ajouté avec succès !');
        closeAddModal();
        await fetchGuichets();
      } catch (error) {
        console.error("Erreur lors de l'ajout du guichet:", error);
        showToast("Erreur lors de l'ajout du guichet !", 'error');
      }
    };

    const submitEditForm = async () => {
      if (!selectedGuichetId.value) {
        console.error("ID du guichet est manquant !");
        showToast("Impossible de trouver l'ID du guichet.", 'error');
        return;
      }

      const updatedData = {
        numero_guichet: editForm.value.numero_guichet,
        status: editForm.value.status ? 'true' : 'false', 
        responsable: editForm.value.responsable,
      };

      try {
        await axios.put(`http://localhost:5002/api/guichets/${selectedGuichetId.value}`, updatedData);
        showToast('Guichet modifié avec succès !');
        closeEditModal();
        await fetchGuichets();
      } catch (error) {
        console.error("Erreur dans submitEditForm:", error);
        showToast("Erreur lors de la modification du guichet !", 'error');
      }
    };

    const confirmDelete = async (guichetId) => {
      try {
        await axios.delete(`http://localhost:5002/api/guichets/${guichetId}`);
        showToast('Guichet supprimé avec succès !');
        await fetchGuichets();
      } catch (error) {
        console.error("Erreur lors de la suppression du guichet:", error);
        showToast("Erreur lors de la suppression du guichet !", 'error');
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
