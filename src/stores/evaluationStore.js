import { ref, onMounted } from 'vue';
import axios from 'axios';
import 'emoji-picker-element';

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

    // Charger les évaluations lors du montage du composant
    const loadEvaluations = async () => {
      try {
        const response = await axios.get('http://localhost:5002/api/evaluations/');
        evaluations.value = response.data;
      } catch (error) {
        console.error('Erreur lors du chargement des évaluations:', error);
      }
    };

    onMounted(() => {
      loadEvaluations();
    });

    // Créer une nouvelle évaluation
    const createEvaluation = async () => {
      if (!newEvaluation.value.satis_score || !newEvaluation.value.commentaire || !newEvaluation.value.date_evaluation || !newEvaluation.value.utilisateur_id) {
        alert("Veuillez remplir tous les champs !");
        return;
      }

      // Log de la requête pour vérifier les données
      console.log('Création de l\'évaluation avec les données:', newEvaluation.value);

      try {
        // Effectuer la requête POST pour créer une évaluation
        const response = await axios.post('http://localhost:5002/api/evaluations/', newEvaluation.value);
        
        // Log pour vérifier la réponse du serveur
        console.log('Réponse du serveur après création:', response.data);

        // Recharger toutes les évaluations pour s'assurer qu'elles sont bien à jour
        loadEvaluations();

        // Réinitialiser le formulaire
        newEvaluation.value = {
          satis_score: '',
          commentaire: '',
          date_evaluation: '',
          utilisateur_id: ''
        };

        // Masquer le formulaire de création
        showCreateForm.value = false;
      } catch (error) {
        // Log détaillé de l'erreur pour aider au débogage
        if (error.response) {
          console.error('Erreur lors de la création de l\'évaluation:', error.response.data);
        } else {
          console.error('Erreur réseau ou autre:', error.message);
        }
      }
    };

    // Supprimer une évaluation
    const deleteEvaluation = async (id) => {
      const isConfirmed = confirm("Êtes-vous sûr de vouloir supprimer cette évaluation ?");
      if (isConfirmed) {
        try {
          // Effectuer la requête DELETE pour supprimer l'évaluation
          await axios.delete(`http://localhost:5002/api/evaluations/${id}`);
          
          // Filtrer l'évaluation supprimée de la liste
          evaluations.value = evaluations.value.filter(evaluation => evaluation.id !== id);
        } catch (error) {
          console.error('Erreur lors de la suppression de l\'évaluation:', error);
        }
      }
    };

    // Afficher les détails d'une évaluation
    const viewEvaluation = (evaluation) => {
      alert(`Détails de l'évaluation:\n
        Commentaire: ${evaluation.commentaire}\n
        Score: ${evaluation.satis_score}\n
        Date: ${evaluation.date_evaluation}\n
        ID Utilisateur: ${evaluation.utilisateur_id}`);
    };

    // Ajouter un emoji au commentaire
    const addEmoji = (event) => {
      newEvaluation.value.commentaire += event.detail.unicode;
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
