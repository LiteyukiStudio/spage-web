<template>
    <div class="login-container">
        <el-card class="login-card">
            <div class="login-title">
                <img src="../assets/logo.svg" alt="Logo" style="height: 4rem;" />
                <p style="font-size: 2rem; font-weight: bold; margin-top: 0;">{{ t('ui.login') }}</p>
            </div>
            <Captcha :provider="provider" :site-key="siteKey" :url="url" @update:token="token = $event"></Captcha>
            <el-form @submit.prevent="handleLogin" :model="form" :rules="rules" ref="loginForm" label-position="top">
                <el-form-item prop="username">
                    <el-input v-model="form.username" :placeholder="t('ui.username')" autocomplete="username"
                        :prefix-icon=User />
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="form.password" :placeholder="t('ui.password')" type="password"
                        autocomplete="current-password" :prefix-icon=Lock show-password />
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" style="width: 100%;" :loading="loading" @click="handleLogin" :disabled="!token || loading">
                        {{ t('ui.login') }}
                    </el-button>
                </el-form-item>

                <div v-if="error" class="login-error" style="color: #f56c6c;">
                    {{ error }}
                </div>
            </el-form>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter, useRoute } from 'vue-router'
import Captcha from '../views/Captcha.vue';
import { getCaptcha } from '../api/captcha'
import { User, Lock } from '@element-plus/icons-vue'

const router = useRouter()
const route = useRoute()
const { t, } = useI18n()

// Captcha
const siteKey = ref('')
const provider = ref('')
const url = ref('')
const token = ref('')

const form = ref({ username: '', password: '' })
const error = ref('')
const rules = {
    username: [
        { required: true, message: t('ui.please_input') + t('ui.username'), trigger: 'blur' }
    ],
    password: [
        { required: true, message: t('ui.please_input') + t('ui.password'), trigger: 'blur' }
    ]
}
const loading = ref(false)

function onLoginSuccess() {
    // 登录成功后跳转
    const redirect = route.query.redirect as string
    router.replace(redirect || '/')
}

function handleLogin() {
    // 登录逻辑
    const { username, password } = form.value
    if (!username || !password) {
        error.value = t('ui.loginError')
        return
    }
    loading.value = true
    error.value = ''
    // 模拟登录请求
    setTimeout(() => {
        loading.value = false
        if (username === 'admin' && password === 'admin') {
            onLoginSuccess()
        } else {
            error.value = t('ui.loginError')
        }
    }, 1000)
}


onMounted(async () => {
    // 获取验证码
    await getCaptcha().then((res) => {
        siteKey.value = res.site_key
        provider.value = res.provider
        url.value = res.url
    }).catch((err) => {
        console.error(err)
    })
})

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
    border-radius: var(--card-br);
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