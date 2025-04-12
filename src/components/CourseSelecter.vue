<template>
  <div class="course-select">
    <div class="course-category" v-for="category in courseCategories">
      <CardGroup :category="category" />
    </div>
  </div>
</template>

<script setup lang="ts" name="CourseSelecter">
import { courseCategories } from '@/courses/index';
</script>

<style scoped>
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
</style>
