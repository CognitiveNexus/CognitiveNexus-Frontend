<template>
  <div class="progress">
    <el-progress type="dashboard" :percentage="solvedPercentage" :color="colorScheme">
      <template #default="{ percentage }">
        <span class="percentage-value">{{ percentage }}%</span>
        <span class="percentage-label">{{ name }}</span>
      </template>
    </el-progress>
  </div>
</template>

<script setup lang="ts" name="CourseProgressCircle">
const { name, solvedPercentage } = defineProps({
  name: String,
  solvedPercentage: {
    type: Number,
    default: 0,
    required: true,
  },
});

const colorScheme = [
  { color: '#909399', percentage: 20 },
  { color: '#F56C6C', percentage: 40 },
  { color: '#E6A23C', percentage: 60 },
  { color: '#409EFF', percentage: 80 },
  { color: '#67C23A', percentage: 100 },
];
</script>

<style scoped>
.progress {
  margin: 10px;
  height: 150px;
  width: 150px;
}
.progress .el-progress--line {
  margin-bottom: 15px;
  max-width: 600px;
}
.percentage-value {
  display: block;
  font-size: 28px;
}
.percentage-label {
  font-size: 12px;
}
</style>
