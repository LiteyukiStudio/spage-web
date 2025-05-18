<template>
  <div class="common-layout">
    <el-container>
      <el-header><slot name="header"></slot></el-header>
      <el-container>
        <el-aside width="200px"><slot name="aside"></slot></el-aside>
        <el-container>
          <el-main><slot name="main"></slot></el-main>
          <el-footer><slot name="footer"></slot></el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
    
}
</script>

<style lang="">
    
</style>