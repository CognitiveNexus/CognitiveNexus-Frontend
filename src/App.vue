<template>
  <el-config-provider :locale="zhCn">
    <el-container class="main-container">
      <div v-show="!atHomepage">
        <AppHeader />
      </div>
      <el-container>
        <RouterView></RouterView>
      </el-container>
      <el-footer v-show="atHomepage">
        <div class="footer-text">
          <el-text v-html="footerText" type="info" />
        </div>
      </el-footer>
    </el-container>
    <div v-show="!atHomepage">
      <FloatButton :icon="ChatLineRound" buttonText="AI导师" @click="aiDrawer = !aiDrawer" />
    </div>
    <LoginDialog />
    <AskAI v-model="aiDrawer" />
  </el-config-provider>
</template>

<script setup lang="ts" name="App">
import { ref, watch, computed } from 'vue';
import { RouterView, useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import { ChatLineRound } from '@element-plus/icons-vue';

import AskAI from '@/components/AskAI.vue';
import FloatButton from '@/components/FloatButton.vue';
import LoginDialog from '@/components/LoginDialog.vue';
import { useAuthStore } from '@/stores/Auth.ts';
import { useProgressStore } from '@/stores/Progress.ts';

const { isAuthenticated } = storeToRefs(useAuthStore());
const { fetchProgress, clearProgress } = useProgressStore();

const footerText = import.meta.env.COGNEX_FOOTER ?? '';

const aiDrawer = ref<boolean>(false);
const route = useRoute();
const atHomepage = computed(() => ['/', '/home'].includes(route.path));

if (isAuthenticated.value) {
  fetchProgress();
}

watch(isAuthenticated, async (isNowAuthenticated) => {
  if (isNowAuthenticated) {
    await fetchProgress();
  } else {
    clearProgress();
  }
});
</script>

<style scoped>
.main-container {
  font-family: Inter, 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
  height: 100vh;
  overflow: hidden;
}
.el-menu-vertical:not(.el-menu--collapse) {
  height: 100%;
}
.el-footer {
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.151);
}
.footer-text {
  text-align: center;
  padding: 16px;
}
</style>
