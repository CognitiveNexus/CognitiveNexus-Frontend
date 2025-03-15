<template>
  <div class="canvas-render">
    <v-chart :option="option_column" :autoresize="true" style="height: 400px" ref="chartRef" />
    <div class="button-group">
      <el-button type="primary" class="left-button" @click="prevPage()">
        <el-icon :size="20">
          <CaretLeft />
        </el-icon>
      </el-button>
      <div class="progress-visualizer">
        <el-text>{{ current_page }} / {{ total_page }}</el-text>
      </div>
      <el-button type="primary" class="right-button" @click="nextPage()">
        <el-icon :size="20">
          <CaretRight />
        </el-icon>
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts" name="ColumnChart">
import { computed, ref } from 'vue';

const steps = [
  { type: "swap", index1: 0, index2: 1 },
  { type: "swap", index1: 1, index2: 2 },
  { type: "swap", index1: 2, index2: 3 },
  { type: "swap", index1: 3, index2: 4 },
  { type: "swap", index1: 5, index2: 6 },
  { type: "swap", index1: 6, index2: 7 },
  { type: "swap", index1: 0, index2: 1 },
  { type: "swap", index1: 4, index2: 5 },
  { type: "swap", index1: 3, index2: 4 },
  { type: "swap", index1: 2, index2: 3 },
  { type: "swap", index1: 1, index2: 2 },
]

const current_page = ref(1);
const total_page = ref(steps.length + 1);

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

const data = ref([
  { index: '7', value: 7 },
  { index: '4', value: 4 },
  { index: '1', value: 1 },
  { index: '4', value: 4 },
  { index: '5', value: 5 },
  { index: '9', value: 9 },
  { index: '2', value: 2 },
  { index: '8', value: 8 },
]);

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
      data: data.value.map((d) => {
        return d.index
      }),
    },
    yAxis: {},
    series: [
      {
        name: 'value',
        type: 'bar',
        data: data.value.map((d) => {
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

//数据合法性检测
function isAvailbleIndex(index: number): boolean {
  return index >= 0 && index <= data.value.length;
}
function isAvailblePage(page: number): boolean {
  return page >= 1 && page <= total_page.value;
}

function swap(a: number, b: number) {
  if (isAvailbleIndex(a) && isAvailbleIndex(b)) {
    [data.value[a], data.value[b]] = [data.value[b], data.value[a]];
  }
  console.log(a, b, "@swap");
}

// 切换高亮
const highlightIndex = ref(-1);
function toggleHighlight(index: number) {
  index--;
  if (isAvailbleIndex(index)) {
    colorScheme.value[index] == '#529B2E'
      ? colorScheme.value[index] = '#5470C6'
      : colorScheme.value[index] = '#529B2E'
    chartRef.value.setOption(option_column.value, {
      replaceMerge: ['series']
    })
  }
}

//按钮响应
function nextPage() {
  if (isAvailblePage(current_page.value + 1)) {
    const command_index = current_page.value - 1;
    const command = steps[command_index];
    swap(command.index1, command.index2);
    current_page.value++;
  }
}
function prevPage() {
  if (isAvailblePage(current_page.value - 1)) {
    const command_index = current_page.value - 1;
    const command = steps[command_index - 1];
    swap(command.index1, command.index2);
    current_page.value--;
  }
}

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