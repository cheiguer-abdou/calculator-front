<template>
    <div class="calculator-container">
      <user-info
        :username="username"
        :balance="balance"
        @sign-out="signOut"
      />
      <div class="calculator">
        <CalculatorDisplay :value="display"/>
        <CalculatorKeypad @button-click="handleButtonClick" />
      </div>
    </div>
  </template>
  
  <script setup>
  import { onMounted } from 'vue';
  import UserInfo from './calculator/UserInfo.vue';
  import CalculatorDisplay from './calculator/CalculatorDisplay.vue';
  import CalculatorKeypad from './calculator/CalculatorKeypad.vue';
  import { useUserInfo } from '../composables/useUserInfo';
  import { useCalculator } from '../composables/useCalculator';
  
  const { username, balance, loadUserInfo, signOut } = useUserInfo();
  const { display, handleButtonClick } = useCalculator(username);
  
  onMounted(() => {
    loadUserInfo();
  });
  </script>
  
  <style scoped>
  .calculator-container {
    width: 800px;
    margin: 0 auto;
  }
  
  .calculator {
    max-width: 50vw;
    margin: 0 auto;
    padding: 20px;
    background: #333;
    border-radius: 8px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
  }
  </style>
  