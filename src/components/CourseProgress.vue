<template>
  <el-text>课程完成情况</el-text>
  <br />
  <el-space :size="40" wrap>
    <!-- <div v-for="item in courseArray" class="main">
      <el-progress type="dashboard" :percentage="item.totalPercent" :color="colorScheme">
        <template #default="{ percentage }">
          <span class="percentage-value">{{ percentage }}%</span>
          <span class="percentage-label">{{ item.diff }}</span>
        </template>
      </el-progress>
      <el-popover placement="bottom" :width="250" trigger="click">
        <template #reference>
          <el-button class="m-2">Detail</el-button>
        </template>
        <div v-for="course in item.detail">
          <el-text style="float: left">{{ course.name }}</el-text>
          <br />
          <el-progress :percentage="course.percent" :color="colorScheme"></el-progress>
          <br />
        </div>
      </el-popover>
    </div> -->
  </el-space>
</template>

<script setup lang="ts" name="CourseProgress">
// import { useCourseStoreManager } from '@/stores/courses';
import type { DiffProgress } from '@/types/CoursesNameType';

const colorScheme = [
  { color: '#909399', percentage: 20 },
  { color: '#F56C6C', percentage: 40 },
  { color: '#E6A23C', percentage: 60 },
  { color: '#409EFF', percentage: 80 },
  { color: '#67C23A', percentage: 100 },
];

// const store = useCourseStoreManager();
// let courseArray = [] as DiffProgress[];
// courseArray.push(store.getDiffProgress('basic'));
// courseArray.push(store.getDiffProgress('normal'));
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
