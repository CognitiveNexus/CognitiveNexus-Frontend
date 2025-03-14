<template>
  <el-container class="main-container">
    <el-header>
      <RouterLink to="/home" class="router-link-custom"><h3>思维脉络 CognitiveNexus</h3></RouterLink>
    </el-header>
    <el-container>
      <SideMenu/>
      <RouterView></RouterView>
    </el-container>
    <el-footer height="50px">Footer</el-footer>
  </el-container>
</template>

<script setup lang="ts" name="App">
import { RouterView, RouterLink } from 'vue-router';
import SideMenu from './components/SideMenu.vue';
</script>

<style scoped>
.main-container{
  font-family: Inter, 'Helvetica Neue', Helvetica, 'PingFang SC',
      'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
  height: 100vh;
}
.el-aside{
  user-select: none;
  overflow: auto;
}
.el-header{
  border-bottom: 2px solid #DCDFE6;
  padding: 0px 30px;
  text-align: left;
  user-select: none;
  color: rgb(51.2, 126.4, 204);
}
.el-menu-vertical:not(.el-menu--collapse){
  height: 100%;
}
</style>