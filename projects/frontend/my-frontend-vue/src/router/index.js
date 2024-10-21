import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import AdminView from '../views/AdminView.vue'
import SalesManagerView from '../views/SalesManagerView.vue'

const isLogin = false
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminView,
    meta: { requiresAuth: true, role: 'admin' }
  },
  {
    path: '/salesManager',
    name: 'salesManager',
    component: SalesManagerView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to,from, next) => {
  if(to.meta.requiresAuth){
    const token = localStorage.getItem('jwtToken')
    if(token){
      next()
    }
    else{
      next('/login')
    }
  }else{
    next()
  }
})

export default router
