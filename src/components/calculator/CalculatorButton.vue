<template>
    <button 
      :class="['calculator-button', type]"
      @click="$emit('click', value)"
    >
      {{ value }}
    </button>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from "vue";
  defineProps({
    value: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'number'
    }
  });
  
  defineEmits(['click']);
  </script>
  
  <style scoped>
  .calculator-button {
    font-size: 1.5em;
    border: none;
    padding: 20px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .calculator-button.number {
    background: #444;
    color: #fff;
  }
  
  .calculator-button.operator,
  .calculator-button.function {
    background: #ff9500;
    color: #fff;
  }
  
  .calculator-button:active {
    background: #666;
  }
  
  .calculator-button.operator:active,
  .calculator-button.function:active {
    background: #ffab40;
  }
  </style>