<template>
    <v-chart 
        :option="option_column" 
        :autoresize="true"
        style="height: 400px"
    />
    <input type="number" v-model="a">
    <input type="number" v-model="b">
    <button @click="swap()">Click to swap</button>
    <br>
    <input type="number" v-model="highlightIndex">
    <button @click="toggleHighlight(3)">Click to highlight</button>
</template>

<script setup lang="ts" name="Temp">
import { computed, ref } from 'vue';

const highlightIndex = ref(3);

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
            text: "Column Chart"
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
                    color: (params: any) => params.dataIndex === highlightIndex.value
                            ? '#529B2E'
                            : '#5470C6'
                    
                }
            },
        ],
    }
});

let a = 0;
let b = 0;
function swap(){
    const temp = data.value[a];
    data.value[a] = data.value[b];
    data.value[b] = temp;
}

// 切换高亮
const toggleHighlight = (index: number) => {
    highlightIndex.value = highlightIndex.value === index ? -1 : index
}


</script>