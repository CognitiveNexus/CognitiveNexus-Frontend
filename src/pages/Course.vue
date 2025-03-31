<template>
  <el-container>
    <el-aside class="animation-render">
      <Animation />
    </el-aside>
    <el-divider direction="vertical" class="vertical-divider" />
    <el-main class="text-render">
      <CourseReader class="text-reader" />
    </el-main>
  </el-container>
</template>

<script setup lang="ts" name="Course">
import Animation from '@/components/animation/Animation.vue';
</script>

<style scoped>
.text-render {
  padding: 0px;
  width: 70%;
  height: 99%;
  overflow: hidden;
}
.animation-render {
  width: 30%;
  height: 100%;
}
.text-reader {
  flex: 1;
  min-width: 30%;
  height: 100%;
  display: flex;
}
.vertical-divider {
  height: 100%;
}
</style>
