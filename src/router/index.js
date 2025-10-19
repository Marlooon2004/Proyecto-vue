import { createRouter, createWebHistory } from 'vue-router'
import Estudiantes from '../views/view-estudiantes.vue'

const routes = [
  {
    path: '/',
    redirect: '/estudiantes' // Redirige a la vista de estudiantes
  },
  {
    path: '/estudiantes',
    name: 'Estudiantes',
    component: Estudiantes
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
