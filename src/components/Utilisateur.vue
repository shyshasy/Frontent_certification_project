<template>
  <div>
    <h2 class="text-center">Gestion des Utilisateurs</h2>
    <button class="btn btn-success mb-3" @click="openAddModal">Ajouter un Utilisateur</button>

    <!-- Message de confirmation -->
    <div v-if="notification" class="alert alert-info">{{ notification }}</div>

    <!-- Tableau des utilisateurs -->
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Nom</th>
          <th>Email</th>
          <th>Rôle</th>
          <th>Statut</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="utilisateur in utilisateurs" :key="utilisateur.id">
          <td>{{ utilisateur.nom }}</td>
          <td>{{ utilisateur.email }}</td>
          <td>{{ utilisateur.role }}</td>
          <td>{{ utilisateur.status ? 'Actif' : 'Inactif' }}</td>
          <td>
            <div class="button-group">
              <button class="btn btn-primary me-2" @click="openEditModal(utilisateur)">Modifier</button>
              <button class="btn btn-danger" @click="confirmDelete(utilisateur.id)">Supprimer</button>
              <button class="btn btn-info" @click="viewUser(utilisateur)">Voir</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modale pour ajouter un utilisateur -->
    <Modal :isOpen="isAddModalOpen" title="Ajouter un Utilisateur" @close="closeAddModal">
      <form @submit.prevent="submitAddForm" class="form-container">
        <div class="form-grid">
          <div class="form-left">
            <input v-model="newForm.nom" placeholder="Nom" class="form-control" required />
            <select v-model="newForm.role" class="form-control" required>
              <option value="" disabled>Rôle</option>
              <option value="admin">Administrateur</option>
              <option value="client">Utilisateur</option>
            </select>
          </div>
          <div class="form-right">
            <input v-model="newForm.email" placeholder="Email" type="email" class="form-control" required />
            <select v-model="newForm.status" class="form-control" required>
              <option value="" disabled>Statut</option>
              <option :value="true">Actif</option>
              <option :value="false">Inactif</option>
            </select>
          </div>
        </div>
        <input v-model="newForm.password" type="password" placeholder="Mot de passe" class="form-control mt-3" required />
        <button type="submit" class="btn btn-primary mt-3">Ajouter</button>
      </form>
    </Modal>

    <!-- Modale pour modifier un utilisateur -->
    <Modal :isOpen="isEditModalOpen" title="Modifier Utilisateur" @close="closeEditModal">
      <form @submit.prevent="submitEditForm" class="form-container">
        <div class="form-grid">
          <div class="form-left">
            <input v-model="editForm.nom" placeholder="Nom" class="form-control" required />
            <select v-model="editForm.role" class="form-control" required>
              <option value="admin">Administrateur</option>
              <option value="client">Utilisateur</option>
            </select>
          </div>
          <div class="form-right">
            <input v-model="editForm.email" placeholder="Email" type="email" class="form-control" required />
            <select v-model="editForm.status" class="form-control" required>
              <option :value="true">Actif</option>
              <option :value="false">Inactif</option>
            </select>
          </div>
        </div>
        <input v-model="editForm.password" type="password" placeholder="Mot de passe" class="form-control mt-3" required />
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
    const utilisateurs = ref([]);
    const isAddModalOpen = ref(false);
    const isEditModalOpen = ref(false);
    const newForm = ref({ nom: '', email: '', role: '', status: '', password: '' });
    const editForm = ref({ nom: '', email: '', role: '', status: '', password: '' });
    const selectedUserId = ref(null);
    const notification = ref('');

    // Fetch users from the backend
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5002/api/utilisateurs');
        utilisateurs.value = response.data;
      } catch (error) {
        console.error(error);
      }
    };

    // Appeler fetchUsers sur le montage du composant pour charger les utilisateurs
    fetchUsers();

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
      newForm.value = { nom: '', email: '', role: '', status: '', password: '' };
    };

    const openEditModal = (utilisateur) => {
      selectedUserId.value = utilisateur.id;
      editForm.value = { ...utilisateur };
      isEditModalOpen.value = true;
    };

    const closeEditModal = () => {
      isEditModalOpen.value = false;
      editForm.value = { nom: '', email: '', role: '', status: '', password: '' };
    };

    const submitAddForm = async () => {
      try {
        await axios.post('http://localhost:5002/api/utilisateurs', newForm.value);
        showNotification('Utilisateur ajouté avec succès !');
        closeAddModal();
        await fetchUsers(); // Rafraîchir les utilisateurs après l'ajout
      } catch (error) {
        console.error("Error in submitAddForm:", error);
        showNotification("Erreur lors de l'ajout de l'utilisateur !");
      }
    };

    const submitEditForm = async () => {
      try {
        await axios.put(
          `http://localhost:5002/api/utilisateurs/${selectedUserId.value}`,
          editForm.value
        );
        showNotification('Utilisateur modifié avec succès !');
        closeEditModal();
        await fetchUsers(); // Rafraîchir les utilisateurs après la modification
      } catch (error) {
        console.error("Error in submitEditForm:", error);
        showNotification("Erreur lors de la modification de l'utilisateur !");
      }
    };

    const confirmDelete = async (id) => {
      try {
        const confirmation = window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?");
        if (!confirmation) return;

        await axios.delete(`http://localhost:5002/api/utilisateurs/${id}`);
        showNotification('Utilisateur supprimé avec succès !');
        await fetchUsers(); // Rafraîchir les utilisateurs après la suppression
      } catch (error) {
        console.error("Error in confirmDelete:", error);
        showNotification('Une erreur est survenue lors de la suppression de l\'utilisateur.');
      }
    };

    const viewUser = (utilisateur) => {
      alert(`Détails de l'utilisateur :\nNom: ${utilisateur.nom}\nEmail: ${utilisateur.email}\nRôle: ${utilisateur.role}\nStatut: ${utilisateur.status ? 'Actif' : 'Inactif'}`);
    };

    return {
      utilisateurs,
      isAddModalOpen,
      isEditModalOpen,
      newForm,
      editForm,
      notification,
      openAddModal,
      closeAddModal,
      openEditModal,
      closeEditModal,
      submitAddForm,
      submitEditForm,
      confirmDelete,
      viewUser,
    };
  },
};

  </script>
  
  <style>
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
  