<template>
  <el-container>
    <el-main>
      <el-collapse>
        <el-collapse-item title="普通">
          <CardGroup diff="normal" />
        </el-collapse-item>
      </el-collapse>
    </el-main>
  </el-container>
</template>

<script setup lang="ts" name="CourseSelecter"></script>

<style scoped>
.el-main {
  margin: 0px 10%;
}
</style>
