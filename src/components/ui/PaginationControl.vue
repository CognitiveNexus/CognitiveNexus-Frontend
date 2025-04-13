<template>
  <div class="pagination-container">
    <button class="fliper" @click="$emit('prev')" :disabled="current === 0">
      <el-icon :size="40" color="gray">
        <ArrowLeft />
      </el-icon>
    </button>
    <div class="main-column">
      <slot></slot>
      <div class="page-counter">
        <el-text>{{ current + 1 }}/{{ total }}</el-text>
      </div>
    </div>
    <button class="fliper" @click="$emit('next')" :disabled="current === total - 1">
      <el-icon :size="40" color="gray">
        <ArrowRight />
      </el-icon>
    </button>
  </div>
</template>

<script setup lang="ts" name="PaginationControl">
defineProps({
  current: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
});
defineEmits(['prev', 'next']);
</script>

<style scoped>
.fliper {
  margin: 0;
  padding: 0;
  border: none;
  background: none;
  transition: background-color 0.3s ease;
  background-color: rgba(255, 255, 255, 0);
  min-width: 40px;
  width: 20%;
  max-width: 100px;
  height: 99%;
}
.fliper:hover {
  background-color: rgba(245, 245, 245, 0.226);
}
.fliper:active {
  background-color: rgba(230, 230, 230, 0.322);
}
.main-container {
  position: relative;
  padding-top: 10px;
  display: flex;
  height: calc(100vh-120px);
  width: 100%;
  overflow: hidden;
}
.main-column {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.main-column .page-counter {
  display: flex;
  justify-content: center;
  text-align: center;
  margin-top: 10px;
  height: 30px;
}
.main-column .page-counter .el-text {
  background-color: rgb(240, 240, 240);
  margin-bottom: 15px;
  padding: 10px;
  border-radius: 5px;
}
</style>
