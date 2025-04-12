<template>
  <el-menu :default-active="route.path.replace(/(?<=\/.+?)[\/#].*$/, '')" mode="horizontal" :router="true" :ellipsis="false">
    <el-menu-item index="/home">
      <span class="title">思维脉络</span>
    </el-menu-item>
    <el-menu-item index="/course">课程</el-menu-item>
    <el-menu-item index="/playground">练习场</el-menu-item>
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
.el-menu {
  padding: 0px 50px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.151);
}
.title {
  font-family: 'ChuangKeTieJin', sans-serif;
  font-size: 30px;
  color: transparent;
  background-image: linear-gradient(90deg, #60afff, #b180ff);
  background-clip: text;
}
.el-menu--horizontal > .el-menu-item:nth-last-child(2) {
  margin-right: auto;
}
</style>
