<template>
  <div class="container-fluid">
    <h2 class="text-center">Gestion des Guichets</h2>
    <!-- Bouton Ajouter -->
    <div class="mb-3 d-flex justify-content-end align-items-end">
      <button class="btn btn-primary text-start" @click="openAddModal">
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
          <td>{{ guichet.status }}</td>  <!-- Afficher le texte 'Ouvert' ou 'Fermé' -->
          <td>{{ guichet.responsable }}</td>
          <td>
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
            <input 
              type="number" 
              v-model.number="newForm.numero_guichet" 
              placeholder="Numéro du Guichet" 
              class="form-control mb-3" 
              required 
            />
            <select v-model="newForm.status" class="form-control" required>
              <option :value="true">Ouvert</option>
              <option :value="false">Fermé</option>
            </select>
          </div>
          <div class="form-right">
            <input 
              v-model="newForm.responsable" 
              placeholder="Responsable" 
              class="form-control mb-3" 
              required 
            />
          </div>
        </div>
        <button class="btn btn-success mt-3">Ajouter un Guichet</button>
      </form>
    </Modal>

    <!-- Modale pour modifier un guichet -->
    <Modal :isOpen="isEditModalOpen" title="Modifier Guichet" @close="closeEditModal">
      <form @submit.prevent="submitEditForm" class="form-container pt-5 pb-5">
        <div class="form-grid">
          <div class="form-left">
            <input 
              type="number" 
              v-model.number="editForm.numero_guichet" 
              placeholder="Numéro du Guichet" 
              class="form-control mb-3" 
              required 
            />
            <select v-model="editForm.status" class="form-control" required>
              <option :value="true">Ouvert</option>
              <option :value="false">Fermé</option>
            </select>
          </div>
          <div class="form-right">
            <input 
              v-model="editForm.responsable" 
              placeholder="Responsable" 
              class="form-control mb-3" 
              required 
            />
          </div>
        </div>
        <button class="btn btn-success mt-3">Sauvegarder</button>
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
  components: { Modal, FontAwesomeIcon },
  setup() {
    const toast = useToast();
    const guichets = ref([]);
    const isAddModalOpen = ref(false);
    const isEditModalOpen = ref(false);
    const newForm = ref({ numero_guichet: '', status: true, responsable: '' });
    const editForm = ref({ numero_guichet: '', status: true, responsable: '' });
    const selectedGuichetId = ref(null);

    const fetchGuichets = async () => {
      try {
        const response = await axios.get('http://localhost:5002/api/guichets');
        // Log pour vérifier la réponse de l'API
        console.log('Réponse API Guichets:', response.data);
        
        guichets.value = response.data.map(guichet => ({
          ...guichet,
          status: guichet.statut ? 'Ouvert' : 'Fermé', // Convertir statut en 'Ouvert' ou 'Fermé'
        }));
        console.log('Guichets après mise à jour:', guichets.value); // Vérification de l'interface
      } catch (error) {
        toast.error('Erreur lors du chargement des guichets.');
      }
    };

    fetchGuichets();

    const openAddModal = () => (isAddModalOpen.value = true);
    const closeAddModal = () => {
      isAddModalOpen.value = false;
      newForm.value = { numero_guichet: '', status: true, responsable: '' };
    };

    const openEditModal = (guichet) => {
      selectedGuichetId.value = guichet.id;
      editForm.value = { ...guichet };
      isEditModalOpen.value = true;
    };

    const closeEditModal = () => {
      isEditModalOpen.value = false;
      editForm.value = { numero_guichet: '', status: true, responsable: '' };
    };

    const submitAddForm = async () => {
      try {
        const payload = JSON.parse(JSON.stringify(newForm.value));
        payload.status = Boolean(payload.status); // Assurez-vous que le status est un boolean

        console.log('Formulaire ajouté:', payload); // Vérification de l'objet avant envoi

        await axios.post('http://localhost:5002/api/guichets', payload);
        toast.success('Guichet ajouté avec succès !');
        closeAddModal();
        fetchGuichets();
      } catch (error) {
        toast.error("Erreur lors de l'ajout du guichet.");
      }
    };

    const submitEditForm = async () => {
      try {
        console.log('Formulaire modifié:', editForm.value);
        const payload = {
          ...editForm.value,
          status: Boolean(editForm.value.status), // Assurez-vous d'envoyer un boolean
        };
        await axios.put(`http://localhost:5002/api/guichets/${selectedGuichetId.value}`, payload);
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
