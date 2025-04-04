<template>
  <el-text>课程完成情况</el-text>
  <br />
  <el-space :size="40" wrap>
    <el-progress type="dashboard" :percentage="item.percent" :color="colorScheme" v-for="item in allCoursesProgress">
      <template #default="{ percentage }">
        <span class="percentage-value">{{ percentage }}%</span>
        <span class="percentage-label">{{ item.name }}</span>
      </template>
    </el-progress>
  </el-space>
</template>

<script setup>
import { useCourseStoreManager } from '@/stores/courses';

const colorScheme = [
  { color: '#909399', percentage: 20 },
  { color: '#F56C6C', percentage: 40 },
  { color: '#E6A23C', percentage: 60 },
  { color: '#409EFF', percentage: 80 },
  { color: '#67C23A', percentage: 100 },
];

const { allCoursesProgress } = useCourseStoreManager();
</script>

<style scoped>
.percentage-value {
  display: block;
  font-size: 28px;
}
.percentage-label {
  font-size: 12px;
}
</style>
