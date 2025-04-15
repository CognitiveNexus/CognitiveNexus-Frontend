<template>
  <div class="canvas-render" :class="{ [`${theme}Theme`]: true }">
    <v-chart :option="option" :autoresize="true" style="height: 300px; width: 100%" ref="chartRef" />
    <div class="button-group">
      <el-button type="primary" class="left-button" :class="{ [`${theme}Button`]: true }" @click="store.prevPage()">
        <el-icon :size="20">
          <CaretLeft />
        </el-icon>
      </el-button>
      <div class="progress-visualizer" :class="{ [`${theme}Bar`]: true }">
        <el-text>{{ current_page }} / {{ total_page }}</el-text>
      </div>
      <el-button type="primary" class="right-button" :class="{ [`${theme}Button`]: true }" @click="store.nextPage()">
        <el-icon :size="20">
          <CaretRight />
        </el-icon>
      </el-button>
    </div>
    <el-divider></el-divider>
    <div class="text-render">
      <MdPreview :modelValue="content[current_page]" previewTheme="github" class="text" />
    </div>
  </div>
</template>

<script setup lang="ts" name="ColumnChart">
import { computed, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { MdPreview } from 'md-editor-v3';
import type { ChartStore } from '@/types/ChartStoreTypes';

const {
  useStore,
  content,
  theme: themeName,
} = defineProps<{
  useStore: ChartStore;
  content: string[];
  theme?: string;
}>();
const store = useStore();
const theme = themeName ?? 'warm';
const { current_page, total_page, colorScheme } = storeToRefs(store);

// 手动获取一下v-charts对象，方便一些强制更改option的操作
const chartRef = ref();

const option = computed(() => {
  return {
    tooltip: {
      trigger: 'item',
      position: 'top',
      formatter: function (params: any) {
        return `${params.data}`;
      },
    },
    xAxis: {
      data: store.current_data.map((d) => {
        return d.value;
      }),
    },
    yAxis: {},
    series: [
      {
        name: 'value',
        type: 'bar',
        data: store.current_data.map((d) => {
          return d.value;
        }),
        itemStyle: {
          color: colorScheme.value,
        },
      },
    ],
  };
});
</script>

<style scoped>
.canvas-render {
  padding: 0 12px;
  border-radius: 5px;
  height: fit-content;
}
.warmTheme {
  background-color: rgba(253, 248, 236, 0.8);
  border: solid 10px #672917;
}
.darkTheme {
  background-color: rgba(236, 248, 253, 0.8);
  border: solid 10px #15171a;
}

.button-group {
  width: 100%;
  height: 32px;
  display: flex;
  position: relative;
}

.left-button {
  position: absolute;
  left: 0;
  width: 50px;
  background-color: #975538 !important;
  border: 0px;
}

.right-button {
  position: absolute;
  right: 0;
  width: 50px;
  background-color: #975538 !important;
  border: 0px;
}

.warmButton {
  background-color: #975538 !important;
}
.darkButton {
  background-color: #21242c !important;
}
.warmBar {
  background-color: #fff3d6;
}
.darkBar {
  background-color: #d9e5eb;
}

.progress-visualizer {
  width: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
  border-radius: 5px;
  padding: 0 10px;
  flex: 1 1 auto;
}

.el-text {
  user-select: none;
  font-weight: bold;
}
.text-render {
  height: 300px;
  padding: 0px 40px;
}
.text {
  background-color: #ffffff00;
}
</style>
