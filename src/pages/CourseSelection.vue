<template>
  <el-container class="main">
    <el-main>
      <el-text>选择</el-text>
      <CourseSelecter />
    </el-main>
  </el-container>
</template>

<script setup lang="ts" name="CourseSelection"></script>

<style scoped>
.el-text {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 50px;
  margin: 20px;
}
</style>
