<template>
  <div class="container mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
    <h1 class="text-4xl font-bold text-center text-purple-800 mb-8">Gestion des Évaluations</h1>
    
    <!-- Bouton pour ajouter une évaluation -->
    <button @click="showCreateForm = true" class="bg-gradient-to-r from-purple-600 to-purple-800 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition duration-300 mb-6">
      Ajouter une Évaluation
    </button>

    <!-- Formulaire de création d'une nouvelle évaluation -->
    <div v-if="showCreateForm" class="my-6 p-6 border border-purple-300 rounded-lg shadow-lg bg-white">
      <h2 class="text-3xl font-semibold text-purple-600 mb-4">Ajouter une Évaluation</h2>
      <form @submit.prevent="createEvaluation" class="space-y-4">
        <div>
          <label for="satis_score" class="block text-lg font-medium text-gray-700">Score de Satisfaction:</label>
          <input type="number" v-model="newEvaluation.satis_score" required class="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-purple-300" />
        </div>

        <div>
          <label for="commentaire" class="block text-lg font-medium text-gray-700">Commentaire:</label>
          <input type="text" v-model="newEvaluation.commentaire" required class="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-purple-300" />
        </div>

        <div>
          <label for="date_evaluation" class="block text-lg font-medium text-gray-700">Date d'Évaluation:</label>
          <input type="date" v-model="newEvaluation.date_evaluation" required class="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-purple-300" />
        </div>

        <div>
          <label for="utilisateur_id" class="block text-lg font-medium text-gray-700">ID Utilisateur:</label>
          <input type="number" v-model="newEvaluation.utilisateur_id" required class="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-purple-300" />
        </div>

        <div class="flex space-x-4">
          <button type="submit" class="w-full bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300">Créer Évaluation</button>
          <button type="button" @click="showCreateForm = false" class="w-full bg-red-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-700 transition duration-300">Annuler</button>
        </div>
      </form>
    </div>

    <!-- Liste des évaluations -->
    <h2 class="text-3xl font-semibold text-purple-600 mb-4">Liste des Évaluations</h2>
    <ul class="space-y-4">
      <li v-for="evaluation in evaluations" :key="evaluation.id" class="flex justify-between items-center bg-white p-4 border border-gray-300 rounded-lg shadow-sm hover:shadow-lg transition duration-300">
        <div>
          <h3 class="font-semibold text-lg text-purple-700">{{ evaluation.commentaire }}</h3>
          <p class="text-sm text-gray-600">Score: {{ evaluation.satis_score }}</p>
        </div>
        <div>
          <button @click="editEvaluation(evaluation)" class="bg-blue-500 text-white font-bold py-1 px-3 rounded-lg hover:bg-blue-600 transition duration-300">Modifier</button>
          <button @click="deleteEvaluation(evaluation.id)" class="bg-red-500 text-white font-bold py-1 px-3 rounded-lg hover:bg-red-600 transition duration-300">Supprimer</button>
        </div>
      </li>
    </ul>

    <!-- Formulaire de modification d'une évaluation -->
    <div v-if="showEditForm" class="my-6 p-6 border border-purple-300 rounded-lg shadow-lg bg-white">
      <h2 class="text-3xl font-semibold text-purple-600 mb-4">Modifier l'Évaluation</h2>
      <form @submit.prevent="updateEvaluation" class="space-y-4">
        <div>
          <label for="edit_satis_score" class="block text-lg font-medium text-gray-700">Score de Satisfaction:</label>
          <input type="number" v-model="editingEvaluation.satis_score" required class="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-purple-300" />
        </div>

        <div>
          <label for="edit_commentaire" class="block text-lg font-medium text-gray-700">Commentaire:</label>
          <input type="text" v-model="editingEvaluation.commentaire" required class="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-purple-300" />
        </div>

        <div>
          <label for="edit_date_evaluation" class="block text-lg font-medium text-gray-700">Date d'Évaluation:</label>
          <input type="date" v-model="editingEvaluation.date_evaluation" required class="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-purple-300" />
        </div>

        <div>
          <label for="edit_utilisateur_id" class="block text-lg font-medium text-gray-700">ID Utilisateur:</label>
          <input type="number" v-model="editingEvaluation.utilisateur_id" required class="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-purple-300" />
        </div>

        <div class="flex space-x-4">
          <button type="submit" class="w-full bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300">Mettre à jour</button>
          <button type="button" @click="showEditForm = false" class="w-full bg-red-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-700 transition duration-300">Annuler</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const evaluations = ref([]);
    const newEvaluation = ref({
      satis_score: '',
      commentaire: '',
      date_evaluation: '',
      utilisateur_id: ''
    });
    const editingEvaluation = ref({});
    const showCreateForm = ref(false);
    const showEditForm = ref(false);

    const fetchEvaluations = async () => {
      try {
        const response = await axios.get('http://localhost:3000/evaluations');
        evaluations.value = response.data;
      } catch (error) {
        console.error('Erreur lors de la récupération des évaluations :', error);
      }
    };

    const createEvaluation = async () => {
      try {
        await axios.post('http://localhost:3000/evaluations', newEvaluation.value);
        newEvaluation.value = {
          satis_score: '',
          commentaire: '',
          date_evaluation: '',
          utilisateur_id: ''
        };
        showCreateForm.value = false;
        fetchEvaluations();
      } catch (error) {
        console.error('Erreur lors de la création de l\'évaluation :', error);
      }
    };

    const editEvaluation = (evaluation) => {
      editingEvaluation.value = { ...evaluation };
      showEditForm.value = true;
    };

    const updateEvaluation = async () => {
      try {
        await axios.put(`http://localhost:3000/evaluations/${editingEvaluation.value.id}`, editingEvaluation.value);
        editingEvaluation.value = {};
        showEditForm.value = false;
        fetchEvaluations();
      } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'évaluation :', error);
      }
    };

    const deleteEvaluation = async (id) => {
      try {
        await axios.delete(`http://localhost:3000/evaluations/${id}`);
        fetchEvaluations();
      } catch (error) {
        console.error('Erreur lors de la suppression de l\'évaluation :', error);
      }
    };

    onMounted(() => {
      fetchEvaluations();
    });

    return {
      evaluations,
      newEvaluation,
      editingEvaluation,
      showCreateForm,
      showEditForm,
      createEvaluation,
      editEvaluation,
      updateEvaluation,
      deleteEvaluation
    };
  }
};
</script>

<style scoped>
.container {
  background-color: #f8f9fa;
}

button {
  transition: background-color 0.3s ease;
}
</style>
