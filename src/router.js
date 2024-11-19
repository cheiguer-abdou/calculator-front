import { createRouter, createWebHistory } from 'vue-router'
import { getCurrentUser } from 'aws-amplify/auth'
import CalculatorPage from './components/CalculatorPage.vue'
import LoginPage from './components/LoginPage.vue'
import RecordsPage from './components/RecordsPage.vue'

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginPage
  },
  {
    path: '/calculator',
    name: 'calculator',
    component: CalculatorPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/records',
    name: 'records',
    component: RecordsPage,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

async function checkAuth() {
  try {
    const user = await getCurrentUser()
    return user
  } catch (error) {
    console.error('Authentication error:', error)
    return null
  }
}

router.beforeEach(async (to, from, next) => {
  const user = await checkAuth()
  
  // If the route requires auth
  if (to.meta.requiresAuth) {
    if (!user) {
      next('/')
    } else {
      next()
    }
    return
  }
  
  // If trying to access login page while already authenticated
  if (to.path === '/' && user) {
    next(from.path || '/calculator')
    return
  }

  next()
})

export default router