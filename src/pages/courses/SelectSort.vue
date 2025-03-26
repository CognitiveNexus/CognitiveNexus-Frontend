<template>
  <el-container class="main">
    <el-main class="chart-render">
      <ColumnChart/>
      <Console/>
    </el-main>
    <el-divider direction="vertical" class="vertical-divider" />
    <el-aside class="reader-render">
      <TextReader/>
    </el-aside>
  </el-container>
</template>

<script setup lang="ts" name="Display">
</script>

<style scoped>
.main {
  display: flex;
  overflow: hidden;
  height: calc(100vh - 110px);
}

.vertical-divider {
  height: 100%;
}

.chart-render {
  padding: 17px 70px;
  flex: 0 0 40%;
  max-width: 600px;
  width: 30%;
  overflow: hidden;
  margin-bottom: 30px;
}

.reader-render {
  flex: 1;
  min-width: 30%;
  height: 100%;
  display: flex;
}
</style>
