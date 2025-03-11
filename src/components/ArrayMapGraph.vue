<template>
    <div id="main" style="width: 100%;height:300px;">
    </div>
    <input type="number" v-model="a">
    <input type="number" v-model="b">
    <button @click="">Click to swap</button>
</template>

<script setup lang="ts" name="ArrayMapGraph">
import * as echarts from 'echarts';
import { onMounted, ref } from 'vue';

let a = 0, b = 0, c = 0;


onMounted(() => {

    const data = ref([
        { index: 'A', value: 1 },
        { index: 'B', value: 2 },
        { index: 'C', value: 3 },
        { index: 'D', value: 4 },
        { index: 'E', value: 5 },
        { index: 'F', value: 6 },
        { index: 'G', value: 7 },
        { index: 'H', value: 8 },
    ]);

    // 基于准备好的dom，初始化echarts实例
    const myChart = echarts.init(document.getElementById('main'));

    let options = {
        //标题
        title: {
            text: "Column Chart"
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
            },
        ],
    }

    // 绘制图表
    myChart.setOption(options);

    //监视窗口变化
    window.addEventListener('resize', function () {
        const myChart = echarts.init(document.getElementById('main'));
        myChart.resize();
    });

    function swap() {
        const temp = data.value[a];
        data.value[a] = data.value[b];
        data.value[b] = temp;
        options.series[0].data = data.value.map((d) => {
            return d.value
        })
        myChart.setOption(options);
    }
})


</script>
    
<style scoped>

</style>