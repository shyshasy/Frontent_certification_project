<template>
    <div id="app">
      <CounterManagement />
    </div>
  </template>
  
  <script>
// useCounterManagement.js
import { ref } from 'vue';

export function useCounterManagement() {
  const counters = ref([]);
  const newCounterName = ref('');
  const newCounterManager = ref('');
  const editingCounter = ref(null);

  const addCounter = () => {
    if (newCounterName.value && newCounterManager.value) {
      counters.value.push({ name: newCounterName.value, manager: newCounterManager.value });
      newCounterName.value = '';
      newCounterManager.value = '';
    }
  };

  const editCounter = (counter) => {
    editingCounter.value = { ...counter };
  };

  const cancelCounterEdit = () => {
    editingCounter.value = null;
  };

  const updateCounter = () => {
    if (editingCounter.value) {
      const index = counters.value.findIndex(c => c.name === editingCounter.value.name);
      if (index !== -1) {
        counters.value[index] = editingCounter.value;
      }
    }
    cancelCounterEdit();
  };

  const removeCounter = (counter) => {
    counters.value = counters.value.filter(c => c.name !== counter.name);
  };

  return {
    counters,
    newCounterName,
    newCounterManager,
    editingCounter,
    addCounter,
    editCounter,
    cancelCounterEdit,
    updateCounter,
    removeCounter,
  };
}

  </script>
  