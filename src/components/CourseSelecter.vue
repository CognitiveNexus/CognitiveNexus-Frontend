<template>
  <el-container>
    <el-main>
      <el-collapse v-model="activeNames">
        <el-collapse-item title="基础" name="1">
          <CardGroup diff="basic" />
        </el-collapse-item>
        <el-collapse-item title="普通" name="2">
          <CardGroup diff="normal" />
        </el-collapse-item>
      </el-collapse>
    </el-main>
  </el-container>
</template>

<script setup lang="ts" name="CourseSelecter">
import { ref } from "vue";
const activeNames = ref(["1", "2"]);
</script>

<style scoped>
.el-main {
  margin: 0px 10%;
}
</style>
