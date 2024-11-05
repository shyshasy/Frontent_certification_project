<template>
    <div class="container">
      <h1 class="title">Gestion des Évaluations</h1>
  
      <!-- Bouton pour ajouter une évaluation -->
      <button @click="showCreateForm = true" class="btn-add">
        Ajouter une Évaluation
      </button>
  
      <!-- Formulaire de création d'une nouvelle évaluation -->
      <div v-if="showCreateForm" class="form-container">
        <h2 class="form-title">Ajouter une Évaluation</h2>
        <form @submit.prevent="createEvaluation" class="evaluation-form">
          <div class="form-grid">
            <div class="form-group">
              <label for="satis_score" class="form-label">Score de Satisfaction:</label>
              <input type="number" v-model="newEvaluation.satis_score" required class="form-input" />
            </div>
  
            <div class="form-group">
              <label for="commentaire" class="form-label">Commentaire:</label>
              <textarea v-model="newEvaluation.commentaire" required class="form-input commentaire-input"></textarea>
              <emoji-picker @emoji-click="addEmoji" style="margin-top: 10px;"></emoji-picker>
            </div>
  
            <div class="form-group">
              <label for="date_evaluation" class="form-label">Date d'Évaluation:</label>
              <input type="date" v-model="newEvaluation.date_evaluation" required class="form-input" />
            </div>
  
            <div class="form-group">
              <label for="utilisateur_id" class="form-label">ID Utilisateur:</label>
              <input type="number" v-model="newEvaluation.utilisateur_id" required class="form-input" />
            </div>
          </div>
  
          <div class="button-group">
            <button type="submit" class="btn-submit">Créer Évaluation</button>
            <button type="button" @click="showCreateForm = false" class="btn-cancel">Annuler</button>
          </div>
        </form>
      </div>
  
      <!-- Liste des évaluations -->
      <h2 class="list-title">Liste des Évaluations</h2>
      <ul class="evaluation-list">
        <li v-for="evaluation in evaluations" :key="evaluation.id" class="evaluation-item">
          <div>
            <h3 class="evaluation-comment">{{ evaluation.commentaire }}</h3>
            <p class="evaluation-score">Score: {{ evaluation.satis_score }}</p>
            <p class="evaluation-date">Date: {{ evaluation.date_evaluation }}</p>
            <p class="evaluation-user">ID Utilisateur: {{ evaluation.utilisateur_id }}</p>
          </div>
          <div class="button-group">
            <button @click="viewEvaluation(evaluation)" class="btn-view">Voir</button>
            <button @click="deleteEvaluation(evaluation.id)" class="btn-delete">Supprimer</button>
          </div>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import 'emoji-picker-element'; // Importer la bibliothèque d'emojis
  
  export default {
    setup() {
      const evaluations = ref([]);
      const newEvaluation = ref({
        satis_score: '',
        commentaire: '',
        date_evaluation: '',
        utilisateur_id: ''
      });
      const showCreateForm = ref(false);
      let nextId = 1; // Simuler un ID auto-incrémenté
  
      const createEvaluation = () => {
        if (!newEvaluation.value.satis_score || !newEvaluation.value.commentaire || !newEvaluation.value.date_evaluation || !newEvaluation.value.utilisateur_id) {
          alert("Veuillez remplir tous les champs !");
          return;
        }
  
        const evaluation = { id: nextId++, ...newEvaluation.value };
        evaluations.value.push(evaluation);
  
        // Réinitialiser le formulaire après succès
        newEvaluation.value = {
          satis_score: '',
          commentaire: '',
          date_evaluation: '',
          utilisateur_id: ''
        };
        showCreateForm.value = false;
      };
  
      const deleteEvaluation = (id) => {
  const isConfirmed = confirm("Êtes-vous sûr de vouloir supprimer cette évaluation ?");
  if (isConfirmed) {
    evaluations.value = evaluations.value.filter(evaluation => evaluation.id !== id);
  }
};

  
      const viewEvaluation = (evaluation) => {
        alert(`Détails de l'évaluation:\n
        Commentaire: ${evaluation.commentaire}\n
        Score: ${evaluation.satis_score}\n
        Date: ${evaluation.date_evaluation}\n
        ID Utilisateur: ${evaluation.utilisateur_id}`);
      };
  
      const addEmoji = (event) => {
        newEvaluation.value.commentaire += event.detail.unicode; // Ajouter l'emoji au commentaire
      };
  
      return {
        evaluations,
        newEvaluation,
        showCreateForm,
        createEvaluation,
        deleteEvaluation,
        viewEvaluation,
        addEmoji
      };
    }
  };
  </script>
  
  <style scoped>
  /* Le CSS reste inchangé */
  .container {
    max-width: 800px;
    margin: auto;
    padding: 20px;
    background: linear-gradient(to right, #a0c4ff, #80d3f6); /* Mélange de bleu */
    border-radius: 15px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }
  
  .title {
    text-align: center;
    font-size: 2.5rem;
    color: #003366; /* Couleur bleu foncé */
    margin-bottom: 20px;
  }
  
  .btn-add {
    display: block;
    margin: 20px auto;
    padding: 10px 20px;
    background-color: #0056b3; /* Bleu moyen */
    color: white;
    font-size: 1.2rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .btn-add:hover {
    background-color: #004494; /* Bleu foncé au survol */
  }
  
  .form-container {
    background: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    margin-bottom: 20px;
    animation: slideIn 0.5s ease;
  }
  
  .form-title {
    font-size: 1.8rem;
    color: #003366; /* Couleur bleu foncé */
    margin-bottom: 15px;
  }
  
  .evaluation-form {
    display: flex;
    flex-direction: column;
  }
  
  .form-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 15px; /* Espace entre les champs */
  }
  
  .form-group {
    display: flex;
    flex-direction: column;
  }
  
  .form-label {
    font-size: 1rem;
    margin-bottom: 5px;
    color: #333;
  }
  
  .form-input {
    padding: 12px;
    border: 2px solid #ddd;
    border-radius: 8px;
    transition: border-color 0.3s ease;
  }
  
  .form-input:focus {
    background-color: linear-gradient(45deg, #007bff, #00c6ff, #00e3e3, #0004ff); 
    outline: none;
  }
  
  .commentaire-input {
    height: 100px; /* Hauteur du champ de commentaire */
    resize: none; /* Désactiver le redimensionnement */
  }
  
  .button-group {
    display: flex;
    justify-content: space-between;
    margin-top: 20px; /* Espacement au-dessus des boutons */
  }
  
  .btn-submit {
    background-color: #4CAF50; /* Vert */
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    flex: 1;
    margin-right: 10px;
  }
  
  .btn-submit:hover {
    background-color: #45a049; /* Vert au survol */
  }
  
  .btn-cancel {
    background-color: #f44336; /* Rouge */
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    flex: 1;
  }
  
  .btn-cancel:hover {
    background-color: #e53935; /* Rouge au survol */
  }
  
  .list-title {
    font-size: 1.8rem;
    color: #1976D2; /* Bleu */
    margin-top: 20px;
    margin-bottom: 10px;
  }
  
  .evaluation-list {
    list-style-type: none;
    padding: 0;
  }
  
  .evaluation-item {
    background: white;
    padding: 20px;
    margin-bottom: 15px;
    border-radius: 10px;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s;
  }
  
  .evaluation-item:hover {
    transform: scale(1.02);
  }
  
  .evaluation-comment {
    font-size: 1.2rem;
    color: #333;
  }
  
  .evaluation-score,
  .evaluation-date,
  .evaluation-user {
    font-size: 0.9rem;
    color: #666;
  }
  
  .button-group {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
  }
  
  .btn-view,
  .btn-delete {
    background-color: #1976D2; /* Bleu */
    color: white;
    padding: 5px 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .btn-view:hover {
    background-color: #1565C0; /* Bleu foncé au survol */
  }
  
  .btn-delete {
    background-color: #f44336; /* Rouge */
  }
  
  .btn-delete:hover {
    background-color: #e53935; /* Rouge foncé au survol */
  }
  
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  </style>
