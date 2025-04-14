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
      <FloatButton @click="handleClick">
        <div class="button-group">
          <el-button :icon="ChatLineRound" :class="{ buttonUp: true, buttonNormal: false }" data-toggle="askAi" size="large" color="#3f51b5">AI导师</el-button>
          <el-button :icon="ChatLineRound" :class="{ buttonDown: true }" data-toggle="forum" size="large" color="#009688">讨论</el-button>
        </div>
      </FloatButton>
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

const toggleAiDrawer = () => {
  aiDrawer.value = !aiDrawer.value;
};
const toggleForumDrawer = () => {
  alert('捏');
};
const handleClick = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  const toggle = target.dataset.toggle;
  if (toggle == 'askAi') {
    toggleAiDrawer();
  } else if (toggle == 'forum') {
    toggleForumDrawer();
  }
};
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
.button-group {
  display: flex;
  flex-direction: column;
  gap: 0;
  border-radius: 12px;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.2);
}
.buttonUp {
  border-radius: 12px 12px 0px 0px !important;
  margin: 0 !important;
}
.buttonDown {
  border-radius: 0px 0px 12px 12px !important;
  margin: 0 !important;
}
.buttonNormal {
  border-radius: 12px !important;
}
</style>
