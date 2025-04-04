<template>
  <el-container>
    <el-header class="title">{{ username }}</el-header>
    <el-divider></el-divider>
    <el-main><CourseProgress /></el-main>
  </el-container>
</template>

<script setup lang="ts" name="Profile">
import { useAuthStore } from '@/stores/Auth';
import { storeToRefs } from 'pinia';

const authStore = useAuthStore();
const { username } = storeToRefs(authStore);
</script>

<style scoped>
.title {
  display: flex;
  align-items: center;
  font-size: 40px;
}
.el-container {
  padding: 20px 15%;
}
</style>
