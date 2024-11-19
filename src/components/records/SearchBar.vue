<template>
    <div class="search-section">
      <div class="search-box">
        <label for="search" class="search-label">Search by Operation Type:</label>
        <input 
          type="text" 
          :value="searchTerm"
          @input="$emit('search', $event.target.value)"
          id="search" 
          class="search-input"
          placeholder="Enter operation type (e.g., addition, division)..."
        />
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from "vue";
  defineProps(['searchTerm'])
  defineEmits(['search'])
  </script>
  
  <style scoped>
  .search-section {
    margin-bottom: 20px;
  }
  
  .search-box {
    max-width: 500px;
    margin: 0 auto;
  }
  
  .search-label {
    display: block;
    font-weight: bold;
    color: #333;
    margin-bottom: 5px;
  }
  
  .search-input {
    width: 100%;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
    transition: border-color 0.3s;
  }
  
  .search-input:focus {
    border-color: #4CAF50;
    outline: none;
    box-shadow: 0 0 4px rgba(76, 175, 80, 0.3);
  }
  </style>