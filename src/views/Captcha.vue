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
import { onMounted, ref, watch } from 'vue';

const token = ref('')
const props = defineProps<{
  provider: string
  siteKey: string
  url: string
}>()

console.log(props.provider, props.siteKey, props.url)

const emit = defineEmits<{
  (e: 'update:token', token: string): void
}>()

watch(token, (val) => {
  emit('update:token', val)
})

// 如果是 Disable，直接赋值并 emit
onMounted(() => {
  if (props.provider == CaptchaProvider.Disable) {
    token.value = 'no-captcha'
    emit('update:token', token.value)
  }
})
</script>
<style lang="">

</style>