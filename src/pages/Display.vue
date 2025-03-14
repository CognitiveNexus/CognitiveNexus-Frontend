<template>
  <el-main class="chart-render" width="30%">
    <RouterView></RouterView>
  </el-main>
  <el-divider direction="vertical" class="vertical-divider" />
  <el-aside width="40%">
  </el-aside>
</template>

<script setup lang="ts" name="Display">

</script>

<style scoped>
.vertical-divider {
  height: 100%;
}
.chart-render {
  padding: 17px 50px;
  max-width: 600px;
  overflow: hidden;
}
</style>
