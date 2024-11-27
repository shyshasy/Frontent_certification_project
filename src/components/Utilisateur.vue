<template>
  <div class="container-fluid">
    <h2 class="text-center">Gestion des Utilisateurs</h2>
    <!-- Bouton Ajouter -->
    <div class=" mb-3  d-flex justify-content-end align-items-end ">

      <button class="btn btn-primary  text-start" @click="openAddModal">
        <font-awesome-icon icon="plus-circle" /> Ajouter un Utilisateur
      </button>
    </div>

    <!-- Message de notification -->
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
            <!-- Icônes pour les actions -->
            <font-awesome-icon
              icon="eye"
              class="text-info me-3"
              style="cursor: pointer"
              @click="viewUser(utilisateur)"
            />
            <font-awesome-icon
              icon="edit"
              class="text-warning me-3"
              style="cursor: pointer"
              @click="openEditModal(utilisateur)"
            />
            <font-awesome-icon
              icon="trash"
              class="text-danger me-3"
              style="cursor: pointer"
              @click="confirmDelete(utilisateur.id)"
            />
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modale pour ajouter un utilisateur -->
    <Modal :isOpen="isAddModalOpen" title="Ajouter un Utilisateur" @close="closeAddModal">
      <form @submit.prevent="submitAddForm" class="form-container pt-5 pb-5">
        <div class="form-grid">
          <div class="form-left">
            <input v-model="newForm.nom" placeholder="Nom" type="text" class=" form-control mb-3" required />
            <select v-model="newForm.role" class="form-control" required>
              <option value="" disabled>Rôle</option>
              <option value="ADMIN">Administrateur</option>
              <option value="CLIENT">Client</option>
            </select>
          </div>
          <div class="form-right">
            <input v-model="newForm.email" placeholder="Email" type="email" class="mb-3 form-control" required />
            <select v-model="newForm.status" class="form-control" required>
              <option value="" disabled>Statut</option>
              <option :value="true">Actif</option>
              <option :value="false">Inactif</option>
            </select>
          </div>
        </div>
        <input v-model="newForm.password" type="password" placeholder="Mot de passe" class="form-control mt-3" required />
         <!-- Bouton Ajouter -->
      <button class="btn btn-primary mb-3 btn-right  mt-3" @click="openAddModal">
        Ajouter un Utilisateur
      </button>
      </form>
    </Modal>

    <!-- Modale pour modifier un utilisateur -->
    <Modal :isOpen="isEditModalOpen" title="Modifier Utilisateur" @close="closeEditModal">
      <form @submit.prevent="submitEditForm" class="form-container pt-5 pb-5">
        <div class="form-grid">
          <div class="form-left">
            
            <input v-model="editForm.nom" placeholder="Nom" class="form-control mb-3" required />
            <select v-model="editForm.role" class="form-control" required>
              <option value="ADMIN">Administrateur</option>
              <option value="CLIENT">Client</option>
            </select>
          </div>
          <div class="form-right">
            <input v-model="editForm.email" placeholder="Email" type="email" class="mb-3 form-control" required />
            <select v-model="editForm.status" class="form-control" required>
              <option :value="true">Actif</option>
              <option :value="false">Inactif</option>
            </select>
          </div>
        </div>
        <input v-model="editForm.password" type="password" placeholder="Mot de passe" class="form-control mt-3" required />
        <button type="submit" class="btn btn-success mt-3">
          <font-awesome-icon icon="save" /> Sauvegarder
        </button>
      </form>
    </Modal>
     <!-- Modale pour visualiser un utilisateur -->
     <Modal :isOpen="isViewModalOpen" title="Voir utilisateur" @close="closeViewModal">
      <div class="border-bottom mb-2"></div>
      <form class="form-container">
        <div class="form-group">
          <label for="viewName">Nom</label>
          <input id="viewName" disabled class="form-control" type="text" :value="selectedUser.nom" readonly />
        </div>
        <div class="form-group">
          <label for="viewEmail">Email</label>
          <input id="viewEmail" disabled class="form-control" type="email" :value="selectedUser.email" readonly />
        </div>
        <div class="form-group">
          <label for="viewRole">Role</label>
          <input id="viewRole" disabled class="form-control" type="text" :value="selectedUser.role" readonly />
        </div>
        <div class="form-group">
          <label for="viewStatus"  >Status</label>
          <input disabled
            id="viewStatus"
            class="form-control"
            type="text"
            :value="selectedUser.status ? 'Actif' : 'Inactif'"
            readonly
          />
        </div>
        <div class="form-group text-end">
          <button class="btn btn-secondary" @click.prevent="closeViewModal">Close</button>
        </div>
      </form>
    </Modal>
  </div>
</template>



<script setup>
import { ref, onMounted } from 'vue';
import Modal from './Modal.vue';
import { useUserStore } from '../stores/utilisateurStore.js';

const userStore = useUserStore();

const isAddModalOpen = ref(false);
const isEditModalOpen = ref(false);
const newForm = ref({ nom: '', email: '', role: '', status: '', password: '' });
const editForm = ref({ nom: '', email: '', role: '', status: '', password: '' });
const selectedUserId = ref(null);

onMounted(() => {
  userStore.loadUserData(); // Charger les utilisateurs lors du montage du composant
});

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
  
 await userStore.addUser(newForm.value.nom, newForm.value.role, newForm.value.email, newForm.value.status, newForm.value.password)
  closeAddModal();
};

const submitEditForm = () => {
  userStore.updateUser(selectedUserId.value, editForm.value);
  closeEditModal();
};

const confirmDelete = (id) => {
  const confirmation = window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?");
  if (confirmation) {
    userStore.removeUser(id);
  }
};

const isViewModalOpen = ref(false);
const selectedUser = ref({});

const viewUser = (utilisateur) => {
  selectedUser.value = { ...utilisateur };
  isViewModalOpen.value = true;
};

const closeViewModal = () => {
  isViewModalOpen.value = false;
};

const utilisateurs = userStore.utilisateurs;
const notification = userStore.notification;
</script>

<style>

form-container {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label{
  width: 100%;
  text-align: left;
}

.form-control {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.form-control[readonly] {
  cursor: not-allowed;
  background-color: #e9ecef;
}

.text-end {
  text-align: right;
}
.text-center {
  text-align: center;
  margin-bottom: 20px;
}

.form-container {
  max-width: 800px;
  margin: auto;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.table-striped tbody tr:nth-of-type(odd) {
  background-color: rgba(0, 0, 0, 0.05);
}

.button-group {
  display: flex;
  gap: 0.5rem;
}

.alert {
  margin-bottom: 20px;
}
</style>
