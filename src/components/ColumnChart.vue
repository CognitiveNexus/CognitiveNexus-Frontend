<template>
  <div class="canvas-render">
    <v-chart 
      :option="option_column" 
      :autoresize="true" 
      style="height: 400px" 
      ref="chartRef" 
    />
  </div>
</template>

<script setup lang="ts" name="ColumnChart">
import { computed, ref } from 'vue';

const colorScheme = ref([
    '#5470C6',
    '#5470C6',
    '#5470C6',
    '#5470C6',
    '#5470C6',
    '#5470C6',
    '#5470C6',
    '#5470C6',
])

//手动获取一下v-charts对象，方便一些强制更改option的操作
const chartRef = ref();

const data = ref([
    { index: '1', value: 1 },
    { index: '2', value: 2 },
    { index: '3', value: 3 },
    { index: '4', value: 4 },
    { index: '5', value: 5 },
    { index: '6', value: 6 },
    { index: '7', value: 7 },
    { index: '8', value: 8 },
]);

const option_column = computed(() => {
    return {
        title: {
            text: "可视化柱状图"
        },
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


const isAvailble = (index: number) => {
    return index >= 0 && index <= data.value.length;
}

let a = 0;
let b = 0;
const swap = () => {
    if (isAvailble(a) && isAvailble(b)) {
        [data.value[a], data.value[b]] = [data.value[b], data.value[a]];
    }
}

// 切换高亮  (不知道为什么computed不更新？？)
const highlightIndex = ref(-1);
const toggleHighlight = (index: number) => {
    index--;
    if (isAvailble(index)) {
        colorScheme.value[index] == '#529B2E' 
            ? colorScheme.value[index] = '#5470C6'
            : colorScheme.value[index] = '#529B2E' 
        chartRef.value.setOption(option_column.value, {
            replaceMerge: ['series']
        })
    }
}

</script>

<style scoped>
.canvas-render {
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.151);
  border-radius: 15px;
  padding: 10px 0px 0px 0px;
}
</style>