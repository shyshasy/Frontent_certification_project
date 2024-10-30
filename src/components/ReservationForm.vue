<template>
  <div class="container mt-5">
    <h2 class="text-center mb-4">{{ $t('reservation.title') }}</h2>
    <form @submit.prevent="handleSubmit" class="bg-light p-4 rounded shadow">
      <div class="mb-3">
        <label for="reservationDate" class="form-label">{{ $t('reservation.reservationDate') }}</label>
        <input
          type="text"
          id="reservationDate"
          v-model="date"
          ref="datepicker"
          required
          class="form-control"
        />
      </div>
      <div class="mb-3">
        <label for="reservationTime" class="form-label">{{ $t('reservation.reservationTime') }}</label>
        <select
          id="reservationTime"
          v-model="time"
          required
          class="form-control"
          :disabled="availableTimeSlots.length === 0"
        >
          <option disabled value="">{{ $t('reservation.selectTime') }}</option>
          <option v-for="slot in availableTimeSlots" :key="slot" :value="slot">
            {{ slot }}
          </option>
        </select>
        <small v-if="availableTimeSlots.length === 0 && date" class="text-danger">
          {{ $t('reservation.noAvailableTime') }}
        </small>
      </div>
      <button type="submit" class="btn btn-primary w-100" :disabled="!time">{{ $t('reservation.reserve') }}</button>
    </form>
  </div>
</template>

<script>
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Arabic, French, English } from 'flatpickr/dist/l10n';

export default {
  data() {
    return {
      date: '',
      time: '',
      availableTimeSlots: [],
    };
  },
  mounted() {
    flatpickr(this.$refs.datepicker, {
      dateFormat: "Y-m-d", // Format YYYY-MM-DD
      locale: this.getLocale(), // Définir la langue
      onChange: this.handleDateChange,
    });
  },
  methods: {
    handleDateChange(selectedDates, dateStr) {
      this.date = dateStr; // Met à jour la date en format YYYY-MM-DD
      this.checkAvailability();
    },
    async checkAvailability() {
      if (this.date) {
        try {
          const response = await fetch(`/api/availability?date=${this.date}`);
          if (response.ok) {
            this.availableTimeSlots = await response.json();
            this.time = ''; // Réinitialise l'heure sélectionnée si la date change
          } else {
            this.availableTimeSlots = [];
            console.error("Erreur lors de la récupération des créneaux horaires.");
          }
        } catch (error) {
          console.error("Erreur de communication avec le serveur:", error);
          this.availableTimeSlots = [];
        }
      } else {
        this.availableTimeSlots = [];
      }
    },
    async handleSubmit() {
      if (this.availableTimeSlots.length > 0 && this.time) {
        // Gère la soumission du formulaire
        console.log('Réservation pour le', this.date, 'à', this.time);
      }
    },
    getLocale() {
      const language = this.$i18n.locale; // Récupérer la langue actuelle
      switch (language) {
        case 'fr':
          return French; // Langue française
        case 'ar':
          return Arabic; // Langue arabe
        default:
          return English; // Langue par défaut (anglais)
      }
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 500px;
  margin: auto;
}

h2 {
  color: #007bff;
}

.form-control {
  border-radius: 0.375rem;
}

.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
}

.btn-primary:hover {
  background-color: #0056b3;
}
</style>
