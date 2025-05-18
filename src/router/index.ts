// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import { getUserInfo } from '../api/user'
const routes = [
  { path: '/', component: () => import('../pages/Home.vue'), name: 'home' },
  { path: '/login', component: () => import('../pages/Login.vue'), name: 'login' },
  // { path: '/:owner', component: () => import('../pages/owner/Index.vue'), name: 'owner' },
  // { path: '/:owner/:project', component: () => import('../pages/project/Index.vue'), name: 'owner-project' },
  // { path: '/:owner/:project/:site', component: () => import('../pages/site/Index.vue'), name: 'owner-project-site' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

/**
 * 检查是否登录，通过请求用户接口来实现
 * @returns 用户信息
 * @throws 获取失败时抛出异常
 */
async function isLoggedIn() {
  getUserInfo().catch((error) => {
      console.error('Error fetching user info:', error)
      return false
    }
  )
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