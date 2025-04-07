<template>
  <el-container>
    <el-aside>
      <PracticeReader />
    </el-aside>
    <el-divider direction="vertical"></el-divider>
    <el-main><CodeJudger /></el-main>
  </el-container>
</template>

<script setup lang="ts" name="Practice"></script>

<style scoped>
.el-container {
  height: 100%;
}
.el-divider {
  height: 100%;
}
.el-aside {
  height: 100%;
  width: 33%;
  padding: 20px;
}
.el-main {
  height: 100%;
  width: 67%;
}
</style>
