<template>
  <div class="canvas-render">
    <v-chart :option="option_column" :autoresize="true" style="height: 400px" ref="chartRef" />
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
import { useColumnChartStore } from '@/store/ColumnChart';
import { storeToRefs } from 'pinia';

const store = useColumnChartStore();
const { current_page, total_page } = storeToRefs(store);

const colorScheme = ref([
  '#409EFF',
  '#409EFF',
  '#409EFF',
  '#409EFF',
  '#409EFF',
  '#409EFF',
  '#409EFF',
  '#409EFF'
])

//手动获取一下v-charts对象，方便一些强制更改option的操作
const chartRef = ref();

const option_column = computed(() => {
  return {
    toolbox: {
      show: 'true',
      feature: {
        magicType: { type: ['line', 'bar'] },
      }
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
          return d.value
        }),
        itemStyle: {
          color: (params: any) =>
            colorScheme.value[params.dataIndex]
        },
      },
    ],
  }
});

</script>

<style scoped>
.canvas-render {
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.151);
  padding: 10px 0px 0px 0px;
  border-radius: 5px;
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
}

.right-button {
  position: absolute;
  right: 0;
}

.progress-visualizer {
  background-color: var(--el-color-primary-light-9);
  width: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
}

.el-text {
  user-select: none;
}
</style>