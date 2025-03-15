<template>
  <div>
    <el-main class="chart-render" width="30%">
      <RouterView name="visualizer"></RouterView>
    </el-main>
    <el-divider direction="vertical" class="vertical-divider" />
    <el-aside class="reader-render">
      <RouterView name="reader"></RouterView>
    </el-aside>
  </div>
</template>

<script setup lang="ts" name="Display">

</script>

<style scoped>
.vertical-divider {
  height: 100%;
}
.chart-render {
  padding: 17px 70px;
  max-width: 600px;
  overflow: hidden;
}
.reader-render{
  min-width: 30%;
  display: flex;
}
</style>
