<template>
    <div class="login-container">
        <el-card class="login-card">
            <div class="switch-tabs">
                <span :class="{ active: activeTab === 'login' }" @click="activeTab = 'login'">登录</span>
                <span :class="{ active: activeTab === 'register' }" @click="activeTab = 'register'">注册</span>
                <div class="switch-underline" :style="{ left: activeTab === 'login' ? '0' : '50%' }"></div>
            </div>
            <transition name="fade-slide" mode="out-in">
                <div :key="activeTab">
                    <el-form v-if="activeTab === 'login'" :model="loginForm" @submit.prevent="onLogin">
                        <el-form-item>
                            <el-input v-model="loginForm.username" placeholder="用户名" prefix-icon="User" />
                        </el-form-item>
                        <el-form-item>
                            <el-input v-model="loginForm.password" type="password" placeholder="密码"
                                prefix-icon="Lock" />
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" style="width: 100%;" @click="onLogin">登录</el-button>
                        </el-form-item>
                        <el-alert v-if="loginError" :title="loginError" type="error" show-icon class="login-error" />
                    </el-form>
                    <el-form v-else :model="registerForm" @submit.prevent="onRegister">
                        <el-form-item>
                            <el-input v-model="registerForm.username" placeholder="用户名" prefix-icon="User" />
                        </el-form-item>
                        <el-form-item>
                            <el-input v-model="registerForm.password" type="password" placeholder="密码"
                                prefix-icon="Lock" />
                        </el-form-item>
                        <el-form-item>
                            <el-input v-model="registerForm.confirm" type="password" placeholder="确认密码"
                                prefix-icon="Lock" />
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" style="width: 100%;" @click="onRegister">注册</el-button>
                        </el-form-item>
                        <el-alert v-if="registerError" :title="registerError" type="error" show-icon
                            class="login-error" />
                    </el-form>
                </div>
            </transition>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { login, getUserInfo } from '../api/user'
import { ElNotification } from 'element-plus'
import { useI18n } from 'vue-i18n';
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

function onLoginSuccess() {
  // 登录成功后跳转
  const redirect = route.query.redirect as string
  router.replace(redirect || '/')
}
const { t,  } = useI18n()
const activeTab = ref<'login' | 'register'>('login')

const loginForm = ref({
    username: '',
    password: ''
})
const loginError = ref('')

const registerForm = ref({
    username: '',
    password: '',
    confirm: ''
})
const registerError = ref('')

function onLogin() {
    login(loginForm.value.username, loginForm.value.password)
        .then(() => {
            // 登录成功后获取用户信息
            getUserInfo()
                .then((user) => {
                    localStorage.setItem('language', user.language)
                })
                .catch((error) => {
                    ElNotification({
                        title: t('message.userinfo.error'),
                        message: error.response?.data?.message || t('message.unknown.error'),
                        type: 'error'
                    })
                })
            // 登录成功后跳转
            ElNotification({
                title: t('message.login.success'),
                type: 'success'
            })
            onLoginSuccess()
        })
        .catch((error) => {
            ElNotification({
                title: t('message.login.error.title'),
                message: error.response?.data?.message || t('message.login.error.title'),
                type: 'error'
            })
            loginError.value = error.message
        })
}

function onRegister() {
    if (!registerForm.value.username || !registerForm.value.password) {
        registerError.value = '请填写所有字段'
        return
    }
    if (registerForm.value.password !== registerForm.value.confirm) {
        registerError.value = '两次输入的密码不一致'
        return
    }
    registerError.value = ''
    alert('注册成功')
    activeTab.value = 'login'
}

</script>

<style scoped>
.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: #f5f5f5;
}

.login-card {
    width: 350px;
    padding: 24px 16px 16px 16px;
}

.login-title {
    text-align: center;
    margin-bottom: 24px;
}

.switch-tabs {
    display: flex;
    position: relative;
    margin-bottom: 24px;
    height: 32px;
    align-items: flex-end;
    user-select: none;
}

.switch-tabs span {
    flex: 1;
    text-align: center;
    cursor: pointer;
    font-size: 18px;
    color: #888;
    padding-bottom: 4px;
    transition: color 0.2s;
}

.switch-tabs .active {
    color: #409EFF;
    font-weight: bold;
}

.switch-underline {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50%;
    height: 2px;
    background: #409EFF;
    transition: left 0.3s;
}

.login-error {
    margin-top: 8px;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
    transition: all 0.3s cubic-bezier(.55, 0, .1, 1);
}

.fade-slide-enter-from,
.fade-slide-leave-to {
    opacity: 0;
    transform: translateY(20px);
}
</style>