<template>
    <div class="display">{{ value }}</div>
  </template>
  
  <script setup>
  import { defineProps } from "vue";
  defineProps({
    value: {
      type: String,
      required: true
    }
  });
  </script>
  
  <style scoped>
  .display {
    background: #000;
    color: #fff;
    font-size: 2em;
    height: 4rem;
    text-align: right;
    padding: .5rem 2rem;
    border-radius: 8px;
    margin-bottom: 10px;
  }
  </style>
  