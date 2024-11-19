<template>
    <div class="buttons">
      <calculator-button
        v-for="button in buttons"
        :key="button.value"
        :value="button.value"
        :type="button.type"
        @click="handleClick"
      />
    </div>
  </template>
  
  <script setup>
  import { defineEmits } from "vue";
  import CalculatorButton from './CalculatorButton.vue';
  
  const emit = defineEmits(['button-click']);
  
  const buttons = [
    { value: 'C', type: 'function' },
    { value: '÷', type: 'operator' },
    { value: '×', type: 'operator' },
    { value: '⌫', type: 'function' },
    { value: '7', type: 'number' },
    { value: '8', type: 'number' },
    { value: '9', type: 'number' },
    { value: '−', type: 'operator' },
    { value: '4', type: 'number' },
    { value: '5', type: 'number' },
    { value: '6', type: 'number' },
    { value: '+', type: 'operator' },
    { value: '1', type: 'number' },
    { value: '2', type: 'number' },
    { value: '3', type: 'number' },
    { value: '√', type: 'function' },
    { value: '0', type: 'number' },
    { value: '.', type: 'number' },
    { value: '=', type: 'function' },
    { value: 'RND', type: 'function' } // Added random string button
  ];
  
  const handleClick = (value) => {
    emit('button-click', value);
  };
  </script>
  
  <style scoped>
  .buttons {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
  }
  </style>