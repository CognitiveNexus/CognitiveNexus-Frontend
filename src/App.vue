<template>
  <el-container class="main-container">
    <AppHeader/>
    <el-container>
      <RouterView></RouterView>
    </el-container>
    <el-footer height="50px">Footer</el-footer>
  </el-container>
</template>

<script setup lang="ts" name="App">
import { RouterView } from 'vue-router';
</script>

<style scoped>
.main-container{
  font-family: Inter, 'Helvetica Neue', Helvetica, 'PingFang SC',
      'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
  height: 100vh;
}
.el-menu-vertical:not(.el-menu--collapse){
  height: 100%;
}
.el-footer{
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.151);
}
</style>