<template>
    <div>
        <div v-if="provider == CaptchaProvider.Turnstile">
            <vue-turnstile :site-key="siteKey" v-model="token" />
        </div>
    </div>
</template>
<script setup lang="ts">
import VueTurnstile from 'vue-turnstile';
import { CaptchaProvider } from '../const';
import { ref, watch } from 'vue';

const token = ref('')
defineProps<{
  provider: string
  siteKey: string
  url: string
}>()

const emit = defineEmits<{
  (e: 'update:token', token: string): void
}>()

watch(token, (val) => {
  emit('update:token', val)
})
</script>
<style lang="">

</style>