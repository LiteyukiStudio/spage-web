<template>
  <div class="layout">
    <header class="header">这里是头部</header>
    <main class="main">
      <slot /> <!-- 页面内容会插入这里 -->
    </main>
    <footer class="footer">这里是底部</footer>
  </div>
</template>

<script setup lang="ts">
// 可以在这里引入全局样式、导航栏等
</script>

<style scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.header {
  background: #42b983;
  color: #fff;
  padding: 16px;
  text-align: center;
}
.main {
  flex: 1;
  padding: 24px;
  background: #f5f5f5;
}
.footer {
  background: #222;
  color: #fff;
  text-align: center;
  padding: 12px;
}
</style>