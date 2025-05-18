<template>
    <div>
        <div v-if="provider == CaptchaProvider.Turnstile">
            <vue-turnstile :site-key="siteKey" v-model="token" />
        </div>
        <div v-else-if="provider == CaptchaProvider.hCaptcha">
            <vue-hcaptcha :siteKey="siteKey"></vue-hcaptcha>
        </div>
    </div>
</template>
<script setup lang="ts">
import VueTurnstile from 'vue-turnstile';
import { CaptchaProvider } from '../const';
import { ref } from 'vue';

const token = ref('')
defineProps<{
  provider: string
  siteKey: string
  url: string
}>()

defineEmits<{
  (e: 'update:token', token: string): void
}>()

</script>
<style lang="">

</style>