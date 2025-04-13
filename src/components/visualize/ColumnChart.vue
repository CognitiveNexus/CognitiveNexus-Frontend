<template>
  <div class="canvas-render">
    <v-chart :option="option" :autoresize="true" style="height: 300px; width: 700px" ref="chartRef" />
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
    <el-divider></el-divider>
    <div class="text-render">
      <MdPreview :modelValue="content[current_page]" previewTheme="github" class="text" />
    </div>
  </div>
</template>

<script setup lang="ts" name="ColumnChart">
import { computed, ref } from 'vue';
import { useColumnChartStore } from '@/stores/ColumnChart';
import { storeToRefs } from 'pinia';
import { MdPreview } from 'md-editor-v3';

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

const content = [
  ``,
  `## Step 01

【操作】比较a[0]与a[1]的大小： a[0] > a[1]

【结论】所以下一步要让a[0]与a[1]互换位置，这样**大的数**就会到偏后的位置！

【当前数组】
| 序号 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
| :-----: | :------: | :-----: | :-----: | :-----: | :------: | :-----: | :-----: | :-----: |
| 内容 | 7 | 4 | 1 | 4 | 5 | 9 | 2 | 8 |
`,
  `## Step 02

【操作】交换a[0]与a[1]的位置

【当前数组】
| 序号 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
| :-----: | :------: | :-----: | :-----: | :-----: | :------: | :-----: | :-----: | :-----: |
| 内容 | 4 | 7 | 1 | 4 | 5 | 9 | 2 | 8 |`,
  `## Step 03

【操作】比较a[1]与a[2]的大小： a[1] > a[2]

【结论】所以下一步要让a[1]与a[2]互换位置，这样**大的数**就会到偏后的位置！

【当前数组】
| 序号 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
| :-----: | :------: | :-----: | :-----: | :-----: | :------: | :-----: | :-----: | :-----: |
| 内容 | 4 | 7 | 1 | 4 | 5 | 9 | 2 | 8 |
`,
  `## Step 04

【操作】交换a[1]与a[2]的位置

【当前数组】
| 序号 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
| :-----: | :------: | :-----: | :-----: | :-----: | :------: | :-----: | :-----: | :-----: |
| 内容 | 4 | 1 | 7 | 4 | 5 | 9 | 2 | 8 |
`,
  `## Step 05

【操作】比较a[2]与a[3]的大小： a[2] > a[3]

【结论】所以下一步要让a[2]与a[3]互换位置，这样**大的数**就会到偏后的位置！

【当前数组】
| 序号 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
| :-----: | :------: | :-----: | :-----: | :-----: | :------: | :-----: | :-----: | :-----: |
| 内容 | 4 | 1 | 7 | 4 | 5 | 9 | 2 | 8 |
`,
  `## Step 06

【操作】交换a[2]与a[3]的位置

【当前数组】
| 序号 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
| :-----: | :------: | :-----: | :-----: | :-----: | :------: | :-----: | :-----: | :-----: |
| 内容 | 4 | 1 | 4 | 7 | 5 | 9 | 2 | 8 |
`,
  `## Step 07

【操作】比较a[3]与a[4]的大小： a[3] > a[4]

【结论】所以下一步要让a[3]与a[4]互换位置，这样**大的数**就会到偏后的位置！

【当前数组】
| 序号 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
| :-----: | :------: | :-----: | :-----: | :-----: | :------: | :-----: | :-----: | :-----: |
| 内容 | 4 | 1 | 4 | 7 | 5 | 9 | 2 | 8 |
`,
  `## Step 08

【操作】交换a[3]与a[4]的位置

【当前数组】
| 序号 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
| :-----: | :------: | :-----: | :-----: | :-----: | :------: | :-----: | :-----: | :-----: |
| 内容 | 4 | 1 | 4 | 5 | 7 | 9 | 2 | 8 |
`,
  `## Step 09

【操作】比较a[4]与a[5]的大小： a[4] < a[5]

【结论】右侧的数比左边的数更大，不需要交换了！

【当前数组】
| 序号 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
| :-----: | :------: | :-----: | :-----: | :-----: | :------: | :-----: | :-----: | :-----: |
| 内容 | 4 | 1 | 4 | 5 | 7 | 9 | 2 | 8 |
`,
  `## Step 10

【操作】比较a[5]与a[6]的大小： a[5] > a[6]

【结论】所以下一步要让a[5]与a[6]互换位置，这样**大的数**就会到偏后的位置！

【当前数组】
| 序号 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
| :-----: | :------: | :-----: | :-----: | :-----: | :------: | :-----: | :-----: | :-----: |
| 内容 | 4 | 1 | 4 | 5 | 7 | 9 | 2 | 8 |
`,
  `## Step 11

【操作】交换a[5]与a[6]的位置

【当前数组】
| 序号 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
| :-----: | :------: | :-----: | :-----: | :-----: | :------: | :-----: | :-----: | :-----: |
| 内容 | 4 | 1 | 4 | 5 | 7 | 2 | 9 | 8 |
`,
  `## Step 12

【操作】比较a[6]与a[7]的大小： a[6] > a[7]

【结论】所以下一步要让a[6]与a[7]互换位置，这样**大的数**就会到偏后的位置！

【当前数组】
| 序号 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
| :-----: | :------: | :-----: | :-----: | :-----: | :------: | :-----: | :-----: | :-----: |
| 内容 | 4 | 1 | 4 | 5 | 7 | 2 | 9 | 8 |
`,
  `## Step 13

【操作】交换a[6]与a[7]的位置

【当前数组】
| 序号 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
| :-----: | :------: | :-----: | :-----: | :-----: | :------: | :-----: | :-----: | :-----: |
| 内容 | 4 | 1 | 4 | 5 | 7 | 2 | 8 | 9 |

【结果】最大的数已经在最右边了！
`,
];
</script>

<style scoped>
.canvas-render {
  margin-top: 50px;
  padding: 10px 0px 0px 0px;
  border-radius: 5px;
  background-color: #fdf8ec;
  border: solid 10px #672917;
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

.progress-visualizer {
  background-color: var(--el-color-primary-light-9);
  width: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
  background-color: #fff3d6;
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
