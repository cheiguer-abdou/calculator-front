<template>
    <table class="records-table">
      <thead>
        <tr>
          <th>Type of Operation</th>
          <th>
            Amount
          </th>
          <th>User Balance</th>
          <th>Operation Response</th>
          <th>
            Date
            <button 
              @click="$emit('toggleSort', 'date')" 
              class="sort-button"
            >
              {{ getSortIcon('date') }}
            </button>
          </th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="loading" class="loading-row">
          <td colspan="6" class="loading-message">Loading...</td>
        </tr>
        <tr v-else-if="records.length === 0" class="empty-message-row">
          <td colspan="6" class="empty-message">No records found.</td>
        </tr>
        <tr v-else v-for="record in records" :key="record.id">
          <td>{{ record.operation_type }}</td>
          <td>{{ formatAmount(record.amount) }}</td>
          <td>{{ formatAmount(record.user_balance) }}</td>
          <td>{{ record.operation_response }}</td>
          <td>{{ formatDate(record.date) }}</td>
          <td>
            <button @click="$emit('deleteRecord', record.id)" class="delete-button">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </template>
  
  <script setup>
  import { formatDate, formatAmount } from '../../utils/formatters'
  import { defineProps, defineEmits } from "vue";
  
  const props = defineProps({
    records: { type: Array, required: true },
    loading: { type: Boolean, required: true },
    sortField: { type: String, required: true },
    sortOrder: { type: String, required: true }
  })
  
  defineEmits(['toggleSort', 'deleteRecord'])
  
  const getSortIcon = (field) => {
    if (props.sortField !== field) return '↕️'
    return props.sortOrder === 'asc' ? '↑' : '↓'
  }
  </script>
  
  <style scoped>
  .records-table {
    width: 100%;
    border-collapse: collapse;
    background-color: white;
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 20px;
  }
  
  .records-table th,
  .records-table td {
    padding: 12px 15px;
    border: 1px solid #ddd;
    text-align: left;
  }
  
  .records-table th {
    background-color: #4CAF50;
    color: white;
    font-weight: bold;
    position: relative;
  }
  
  .sort-button {
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    padding: 0 4px;
    font-size: 14px;
  }
  
  .sort-button:hover {
    opacity: 0.8;
  }
  
  .loading-row .loading-message,
  .empty-message-row .empty-message {
    text-align: center;
    padding: 20px;
    color: #666;
    font-style: italic;
  }
  
  .delete-button {
    color: #fff;
    background-color: #e74c3c;
    border: none;
    padding: 6px 12px;
    cursor: pointer;
    border-radius: 4px;
    font-size: 14px;
    transition: background-color 0.3s;
  }
  
  .delete-button:hover {
    background-color: #c0392b;
  }
  
  .records-table tbody tr:hover {
    background-color: #f9f9f9;
  }
  
  @media (max-width: 768px) {
    .records-table {
      font-size: 14px;
    }
    
    .records-table th,
    .records-table td {
      padding: 8px;
    }
  }
  </style>