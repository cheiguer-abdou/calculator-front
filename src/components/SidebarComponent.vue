<template>
  <div :class="['sidebar', { collapsed: isCollapsed }]">
    <button class="toggle-button" @click="toggleSidebar">
      {{ isCollapsed ? '☰' : '&times;' }}
    </button>
    <h2 v-if="!isCollapsed">Menu</h2>
    <nav>
      <ul>
        <li>
          <router-link to="/calculator" class="link">
            <i class="fa-solid fa-calculator"></i>
            <span v-if="!isCollapsed">Calculator</span>
          </router-link>
        </li>
        <li>
          <router-link to="/records" class="link">
            <i class="fa-solid fa-sheet-plastic"></i>
            <span v-if="!isCollapsed">Records</span>
          </router-link>
        </li>
        <li class="sign-out-item">
          <a href="#" class="link" @click.prevent="handleSignOut">
            <i class="fa-solid fa-sign-out-alt"></i>
            <span v-if="!isCollapsed">Sign Out</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>
  
<script setup>
  import { ref, onMounted, onUnmounted } from 'vue'
  import { useUserInfo } from '@/composables/useUserInfo'

  const isCollapsed = ref(false)
  const { signOut } = useUserInfo()

  const toggleSidebar = () => {
    isCollapsed.value = !isCollapsed.value
  }

  const handleSignOut = async () => {
    await signOut()
  }

  const handleResize = () => {
    isCollapsed.value = window.innerWidth < 800
  }

  onMounted(() => {
    window.addEventListener('resize', handleResize)
    handleResize() 
  })

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
  })
</script>
  
<style scoped>
.sidebar {
  width: 200px;
  background-color: #2c3e50;
  color: #ffffff;
  padding: 20px;
  height: 100vh;
  overflow: hidden;
  transition: width 0.3s ease;
  display: flex;
  flex-direction: column;
}

.collapsed {
  width: 60px;
  padding: 10px;
}

.sidebar h2 {
  font-size: 1.2em;
  margin-bottom: 20px;
  transition: opacity 0.3s ease;
}

.collapsed h2 {
  opacity: 0;
}

nav {
  flex-grow: 1;
}

nav ul {
  list-style: none;
  padding: 0;
}

nav li {
  margin: 10px 0;
}

.link {
  color: #b0c4de;
  text-decoration: none;
  padding: 8px 12px;
  display: flex;
  gap: 1rem;
  border-radius: 4px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.link:hover {
  background-color: #34495e;
  color: #ffffff;
}

.router-link-active {
  background-color: #1abc9c;
  color: #ffffff;
}

.toggle-button {
  background: none;
  border: none;
  color: #ffffff;
  cursor: pointer;
  font-size: 2rem;
  margin-bottom: 10px;
  padding: 10px;
}

.sign-out-item {
  margin-top: auto;
  border-top: 1px solid #34495e;
  padding-top: 10px;
}
</style>