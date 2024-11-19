<template>
    <div class="user-info">
      <h2>Welcome, {{ username }}</h2>
      <h2>Balance: {{ balance }}</h2>
      <button class="sign-out-btn" @click="$emit('sign-out')">Sign Out</button>
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from "vue";
  defineProps({
    username: String,
    balance: String
  });
  
  defineEmits(['sign-out', 'updateBalance']);
  </script>
  
  <style scoped>
  .user-info {
    background: #444;
    color: white;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .user-info h2 {
    margin: 0;
    font-size: 1.5em;
  }
  
  .sign-out-btn {
    background: #ff4444;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1em;
  }
  
  .sign-out-btn:hover {
    background: #ff6666;
  }
  </style>
  