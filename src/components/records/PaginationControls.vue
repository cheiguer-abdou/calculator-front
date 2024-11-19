<template>
    <div class="pagination">
      <div class="pagination-records-per-page">
        <label for="records-per-page" class="per-page-label">Records per page:</label>
        <select
          id="records-per-page"
          :value="perPage"
          @change="handlePerPageChange($event)"
          class="records-per-page-select"
        >
          <option v-for="option in perPageOptions" :key="option" :value="option">
            {{ option }}
          </option>
        </select>
      </div>
  
      <div class="pagination-navigation">
        <button
          @click="$emit('changePage', currentPage - 1)"
          :disabled="currentPage === 1"
          class="pagination-button pagination-button-prev"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-left">
            <path d="m15 18-6-6 6-6"/>
          </svg>
          Previous
        </button>
  
        <span class="pagination-info">
          Page {{ currentPage }} of {{ totalPages }} ({{ totalRecords }} records)
        </span>
  
        <button
          @click="$emit('changePage', currentPage + 1)"
          :disabled="currentPage === totalPages"
          class="pagination-button pagination-button-next"
        >
          Next
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right">
            <path d="m9 18 6-6-6-6"/>
          </svg>
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from "vue";
  
  const perPageOptions = [5, 10, 25, 50, 100];
  
  defineProps({
    currentPage: { type: Number, required: true },
    totalPages: { type: Number, required: true },
    totalRecords: { type: Number, required: true },
    perPage: { type: Number, required: true }
  });
  
  const emit = defineEmits(['changePage', 'changePerPage']);
  
  const handlePerPageChange = (event) => {
    const newPerPage = parseInt(event.target.value);
    emit('changePerPage', newPerPage);
  };
  </script>
  
  <style scoped>
  .pagination {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    flex-wrap: wrap;
    gap: 10px;
  }
  
  .pagination-records-per-page {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .per-page-label {
    color: #333;
    font-weight: 500;
  }
  
  .records-per-page-select {
    padding: 8px 12px;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    background-color: white;
    font-size: 14px;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  
  .records-per-page-select:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
  }
  
  .pagination-navigation {
    display: flex;
    align-items: center;
    gap: 15px;
  }
  
  .pagination-button {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 8px 16px;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    background-color: white;
    color: #374151;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s, border-color 0.2s, color 0.2s;
  }
  
  .pagination-button:hover:not(:disabled) {
    background-color: #f3f4f6;
    border-color: #e5e7eb;
  }
  
  .pagination-button:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
  }
  
  .pagination-button:disabled {
    background-color: #f9fafb;
    color: #9ca3af;
    cursor: not-allowed;
  }
  
  .pagination-button svg {
    width: 18px;
    height: 18px;
  }
  
  .pagination-info {
    color: #6b7280;
    font-size: 14px;
  }
  
  /* Responsive adjustments */
  @media (max-width: 640px) {
    .pagination {
      flex-direction: column;
      align-items: stretch;
    }
  
    .pagination-navigation {
      flex-direction: column;
      gap: 10px;
    }
  
    .pagination-button {
      justify-content: center;
      width: 100%;
    }
  }
  </style>