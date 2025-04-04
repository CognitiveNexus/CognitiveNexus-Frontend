<template>
  <div class="canvas-render">
    <v-chart :option="option" :autoresize="true" style="height: 300px; width: 290px" ref="chartRef" />
    <div class="button-group">
      <el-button type="primary" class="left-button" @click="store.prevPage()">
        <el-icon :size="20">
          <CaretLeft />
        </el-icon>
      </el-button>
      <div class="progress-visualizer">
        <el-text>{{ current_page }} / {{ total_page }}</el-text>
      </div>
      <el-button type="primary" class="right-button" @click="store.nextPage()">
        <el-icon :size="20">
          <CaretRight />
        </el-icon>
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts" name="ColumnChart">
import { computed, ref } from 'vue';
import { useColumnChartStore } from '@/stores/ColumnChart';
import { storeToRefs } from 'pinia';

const store = useColumnChartStore();
const { current_page, total_page, colorScheme } = storeToRefs(store);

const props = defineProps({
  width: Number,
  height: Number,
});

//手动获取一下v-charts对象，方便一些强制更改option的操作
const chartRef = ref();

const option = computed(() => {
  return {
    toolbox: {
      show: 'true',
      feature: {
        magicType: { type: ['line', 'bar'] },
      },
    },
    tooltip: {
      trigger: 'item',
      position: 'top',
      formatter: function (params: any) {
        return `${params.data}`;
      },
    },
    xAxis: {
      data: store.data.map((d) => {
        return d.value;
      }),
    },
    yAxis: {},
    series: [
      {
        name: 'value',
        type: 'bar',
        data: store.data.map((d) => {
          return d.value;
        }),
        itemStyle: {
          color: (params: { dataIndex: number }) => colorScheme.value[params.dataIndex],
        },
      },
    ],
  };
});
</script>

<style scoped>
.canvas-render {
  padding: 10px 0px 0px 0px;
  border-radius: 5px;
  background-color: #fff;
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
}

.right-button {
  position: absolute;
  right: 0;
  width: 50px;
}

.progress-visualizer {
  background-color: var(--el-color-primary-light-9);
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
</style>
