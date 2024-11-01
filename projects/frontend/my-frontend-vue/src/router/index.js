import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import AdminView from '../views/AdminView.vue'
import SalesManagerView from '../views/SalesManagerView.vue'
import RegisterUserView from '../views/RegisterUserView.vue'
import CreateView from '../views/CreateView.vue'
import UserDetail from '../views/UserDetail.vue'
import ViewLogsView from '../views/ViewLogsView.vue'
import {jwtDecode} from 'jwt-decode'
import { name } from 'arcaptcha-vue3'

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
    meta: { requiresAuth: true, role: 'admin'}
  },
  {
    path: '/salesManager',
    name: 'salesManager',
    component: SalesManagerView,
    meta: { requiresAuth: true, role: 'sales_manager'}
  },
  {
    path: '/admin/registerUser',
    name: 'registerUser',
    component: RegisterUserView,
    meta: { requiresAuth: true, role: 'admin'}
  },
  {
    path: '/create',
    name: 'create',
    component: CreateView,
    meta: { requiresAuth: true}
  },
  {
    path:'/users/:id',
    name: 'userDetail',
    component: UserDetail,
    props:(route) =>{
      return {
          id: route.params.id,
          action: route.query.action
      };
    }
  },
  {
    path: '/logs',
    name:'Logs',
    component: ViewLogsView,
    meta: { requiresAuth: true}
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
      const decodedToken = jwtDecode(token);
      const userRole = decodedToken.role
      if(to.meta.role && to.meta.role === userRole){
        next()
      }else if(!to.meta.role){
        next()
      }else{
        next('/login')
      }
      
    }
    else{
      next('/login')
    }
  }else{
    next()
  }
})

export default router
