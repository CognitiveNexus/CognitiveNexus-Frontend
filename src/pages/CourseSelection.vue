<template>
  <el-container class="main">
    <el-main>
      <el-text class="select-title">课程选择</el-text>
      <div class="course-select">
        <div class="course-category" v-for="category in courseCategories">
          <CardGroup :category="category" />
        </div>
      </div>
    </el-main>
    <el-footer>
      <el-text class="course-playground" type="primary" @click="router.push('/playground')">自由练习 ></el-text>
    </el-footer>
  </el-container>
</template>

<script setup lang="ts" name="CourseSelection">
import { useRouter } from 'vue-router';
import { courseCategories } from '@/courses/index';

const router = useRouter();
</script>

<style scoped>
.select-title {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 50px;
  margin: 20px;
}
.course-select {
  display: flex;
  flex-wrap: wrap;
  max-width: 1280px;
  gap: 20px;
  justify-content: space-between;
  margin: auto;
  align-items: center;
}
.course-category {
  flex: 1;
  align-self: flex-start;
}
.course-playground {
  display: block;
  text-align: center;
  cursor: pointer;
}
</style>
