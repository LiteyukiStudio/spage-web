// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import { getUserInfo } from '../api/user'

const routes = [
  { path: '/', component: () => import('../pages/Home.vue'), name: 'home' },
  { path: '/login', component: () => import('../pages/Login.vue'), name: 'login' },
  { path: '/register', component: () => import('../pages/Register.vue'), name: 'register' },
  // { path: '/:owner', component: () => import('../pages/owner/Index.vue'), name: 'owner' },
  // { path: '/:owner/:project', component: () => import('../pages/project/Index.vue'), name: 'owner-project' },
  // { path: '/:owner/:project/:site', component: () => import('../pages/site/Index.vue'), name: 'owner-project-site' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, _, next) => {
  if (to.path === '/login') {
    return next()
  }
  try {
    await getUserInfo()
    next()
  } catch (error) {
    // 跳转到登录页，并带上原目标地址
    next({ path: '/login', query: { redirect: to.fullPath } })
  }
})

export default router