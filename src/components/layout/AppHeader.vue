<template>
  <el-menu :default-active="route.path.replace(/#.*$/, '')" mode="horizontal" :router="true" :ellipsis="false">
    <el-menu-item index="/home">
      <span class="title">思维脉络</span>
    </el-menu-item>
    <el-menu-item index="/course">课程</el-menu-item>
    <el-menu-item index="/playground">练习场</el-menu-item>
    <el-menu-item v-if="!isAuthenticated" @click="openLoginWindow">登录</el-menu-item>
    <el-sub-menu v-if="isAuthenticated" index="user-menu">
      <template #title>{{ username }}</template>
      <el-menu-item @click="logout">注销</el-menu-item>
    </el-sub-menu>
  </el-menu>
  <LoginDialog v-model="userWindowVisible" />
</template>

<script setup lang="ts" name="AppHeader">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { ElNotification } from 'element-plus';
import LoginDialog from '@/components/LoginDialog.vue';
import { useAuthStore } from '@/stores/Auth';

const route = useRoute();

const userWindowVisible = ref(false);
const authStore = useAuthStore();
const { username, isAuthenticated } = storeToRefs(authStore);

const openLoginWindow = () => {
  userWindowVisible.value = true;
};

const logout = () => {
  authStore.clearAuth();
  ElNotification({
    title: '注销成功',
    type: 'success',
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
  /** 文字渐变实现 */
  background-image: linear-gradient(90deg, #60afff, #b180ff);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
