<template>
  <el-config-provider :locale="zhCn">
    <el-container class="main-container">
      <AppHeader />
      <el-container>
        <RouterView></RouterView>
      </el-container>
      <el-footer></el-footer>
    </el-container>
    <FloatButton :icon="ChatLineRound" @click="aiDrawer = !aiDrawer" />
    <AskAI v-model="aiDrawer" />
  </el-config-provider>
</template>

<script setup lang="ts" name="App">
import { ref } from 'vue';
import { RouterView } from 'vue-router';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import { ChatLineRound } from '@element-plus/icons-vue';
import AskAI from '@/components/AskAI.vue';
import FloatButton from '@/components/FloatButton.vue';

const aiDrawer = ref<boolean>(false);
</script>

<style scoped>
.main-container {
  font-family: Inter, 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
  height: 100vh;
}
.el-menu-vertical:not(.el-menu--collapse) {
  height: 100%;
}
.el-footer {
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.151);
}
</style>
