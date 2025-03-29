<template>
  <el-container>
    <el-aside class="animation-render">
      <BubbleAnimation />
    </el-aside>
    <el-divider direction="vertical" class="vertical-divider" />
    <el-main class="text-render">
      <TextReader class="text-reader" :courseName="props.courseName" />
    </el-main>
  </el-container>
</template>

<script setup lang="ts" name="Course">
import BubbleAnimation from "@/components/animation/bubble.vue";
import type { CourseName } from "@/types/CoursesNameType";

const props = defineProps<{ courseName: CourseName }>();
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
