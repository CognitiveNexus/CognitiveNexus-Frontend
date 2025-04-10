<template>
  <el-container>
    <el-main>
      <el-collapse v-model="activeNames">
        <el-collapse-item v-for="(category, id) in courseCategories" :title="category.name" :name="id">
          <CardGroup :courses="category.courses" />
        </el-collapse-item>
      </el-collapse>
    </el-main>
  </el-container>
</template>

<script setup lang="ts" name="CourseSelecter">
import { ref } from 'vue';
import { courseCategories } from '@/courses/index';
const activeNames = ref(courseCategories.map((_, id) => id));
</script>

<style scoped>
.el-main {
  margin: 0px 10%;
}
</style>
