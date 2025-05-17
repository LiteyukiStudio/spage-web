// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {path: '/', component: () => import('../pages/home/Index.vue'), name: 'home'},
  {path: '/login', component: () => import('../pages/login/Index.vue'), name: 'login'},
  { path: '/:owner', component: () => import('../pages/owner/Index.vue'), name: 'owner' },
  { path: '/:owner/:project', component: () => import('../pages/project/Index.vue'), name: 'owner-project' },
  { path: '/:owner/:project/:site', component: () => import('../pages/site/Index.vue'), name: 'owner-project-site' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

function isLoggedIn() {
  // TODO: Implement your authentication logic here
  return true
}

router.beforeEach((to, _, next) => {
  if (to.path !== '/login' && !isLoggedIn()) {
    next('/login')
  } else {
    next()
  }
})

export default router