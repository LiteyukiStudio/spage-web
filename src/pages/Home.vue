<template>
<default-layout>
  <template #header>
    <h1>Header</h1>
  </template>
  <template #aside>
    <h2>Aside</h2>
  </template>
  <template #main>
    <h3>Main</h3>
  </template>
  <template #footer>
    <h4>Footer</h4>
  </template>
</default-layout>
</template>
<script>
import DefaultLayout from '../layouts/DefaultLayout.vue'
import DefaultLayoutVue from '../layouts/DefaultLayout.vue'
export default {
  components: { DefaultLayout },
}
</script>
<style lang="">
    
</style>