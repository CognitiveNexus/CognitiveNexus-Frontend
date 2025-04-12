<template>
  <el-menu class="menu-container" :default-active="route.path.replace(/(?<=\/.+?)[\/#].*$/, '')" mode="horizontal" :router="true" :ellipsis="false">
    <div class="menu-left"></div>
    <el-menu-item index="/home" class="menu-title">
      <span class="title">思维脉络</span>
    </el-menu-item>
    <div class="menu-right">
      <el-menu-item v-if="!isAuthenticated" @click="showLoginDialog = true">
        <el-icon><User /></el-icon>登录
      </el-menu-item>
      <el-sub-menu v-else index="user-menu">
        <template #title>
          <el-icon><User /></el-icon>{{ username }}
        </template>
        <el-menu-item @click="profile">学习记录</el-menu-item>
        <el-menu-item @click="logout">退出登录</el-menu-item>
      </el-sub-menu>
    </div>
  </el-menu>
  <LoginDialog />
</template>

<script setup lang="ts" name="AppHeader">
import { useRoute, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { ElNotification } from 'element-plus';
import LoginDialog from '@/components/LoginDialog.vue';
import { useAuthStore } from '@/stores/Auth';

const route = useRoute();
const router = useRouter();

const authStore = useAuthStore();
const { username, isAuthenticated, showLoginDialog } = storeToRefs(authStore);

const logout = () => {
  authStore.clearAuth();
  ElNotification({
    title: '退出登录成功',
    type: 'success',
  });
};

const profile = () => {
  router.push({
    name: 'profile',
  });
};
</script>

<style scoped>
.menu-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 50px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.151);
}

.menu-left {
  flex: 1;
}

.menu-title {
  flex: 1;
  text-align: center;
}

.menu-right {
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.title {
  font-family: 'ChuangKeTieJin', sans-serif;
  font-size: 30px;
  color: transparent;
  background-image: linear-gradient(90deg, #60afff, #b180ff);
  background-clip: text;
}
</style>
