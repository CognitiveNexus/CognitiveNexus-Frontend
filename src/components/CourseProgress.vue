<template>
  <el-text>课程完成情况</el-text>
  <br />
  <el-space :size="40" wrap>
    <div v-for="category in categoryProgress" class="main">
      <el-progress type="dashboard" :percentage="category.percentage" :color="colorScheme">
        <template #default="{ percentage }">
          <span class="percentage-value">{{ percentage }}%</span>
          <span class="percentage-label">{{ category.name }}</span>
        </template>
      </el-progress>
      <el-popover placement="bottom" :width="250" trigger="click">
        <template #reference>
          <el-button class="m-2">Detail</el-button>
        </template>
        <div v-for="course in category.courses">
          <el-text style="float: left">{{ course.name }}</el-text>
          <br />
          <el-progress :percentage="Math.round((100 * (progress[course.id] ?? 0)) / course.pages.length)" :color="colorScheme"></el-progress>
          <br />
        </div>
      </el-popover>
    </div>
  </el-space>
</template>

<script setup lang="ts" name="CourseProgress">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { courseCategories } from '@/courses';
import { useProgressStore } from '@/stores/Progress';

const { progress } = storeToRefs(useProgressStore());
const categoryProgress = computed(() => {
  return courseCategories.map((category) => {
    const totalProgress = category.courses.reduce((acc, course) => acc + (progress.value[course.id] ?? 0), 0);
    const totalPages = category.courses.reduce((acc, course) => acc + course.pages.length, 0);
    const percentage = Math.round((100 * totalProgress) / totalPages);
    return {
      ...category,
      percentage,
    };
  });
});

const colorScheme = [
  { color: '#909399', percentage: 20 },
  { color: '#F56C6C', percentage: 40 },
  { color: '#E6A23C', percentage: 60 },
  { color: '#409EFF', percentage: 80 },
  { color: '#67C23A', percentage: 100 },
];
</script>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
}
.percentage-value {
  display: block;
  font-size: 28px;
}
.percentage-label {
  font-size: 12px;
}
</style>
