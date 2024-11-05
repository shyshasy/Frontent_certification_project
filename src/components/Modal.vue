<template>
    <div v-if="isOpen" class="modal-overlay">
      <div class="modal-content">
        <button class="btn-close" @click="$emit('close')">×</button>
        <h3>{{ title }}</h3>
        <slot></slot>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      isOpen: { type: Boolean, required: true },
      title: { type: String, required: true }
    }
  }
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5); /* Dark overlay */
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal-content {
    background: white; /* Solid white background */
    padding: 20px;
    border-radius: 10px;
    position: relative;
    max-width: 50%; /* Optional: Limit the width */
    width: 100%; /* Responsive width */
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2); /* Optional: Add a shadow for depth */
  }
  
  .btn-close {
    position: absolute;
    top: 10px;
    right: 10px;
    color: red; /* Change close button color to red */
    background: none; /* Remove default button styling */
    border: none; /* Remove border */
    font-size: 1.5rem; /* Increase size for ergonomics */
    cursor: pointer; /* Change cursor to pointer */
  }
  
  .btn-close:hover {
    color: darkred; /* Change color on hover for better feedback */
  }
  </style>
  