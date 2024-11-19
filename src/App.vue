<template>
  <div id="app">
    <Sidebar v-if="showSidebar" />
    <div class="content">
      <RouterView />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Sidebar from './components/SidebarComponent.vue'

const route = useRoute()
const showSidebar = computed(() => route.name !== 'login')
</script>

<style>
#app {
  width: 100vw;
  max-height: 100vh;
  display: flex;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.content {
  display: grid;
  width: 80%;
  place-items: center;
  flex: 1;
  padding: 20px;
}
</style>
