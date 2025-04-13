<template>
  <div class="canvas-render" :class="{ warmtheme: props.index === 1, darktheme: props.index === 2 }">
    <v-chart :option="option" :autoresize="true" style="height: 300px; width: 700px" ref="chartRef" />
    <div class="button-group">
      <el-button type="primary" class="left-button" :class="{ warmbuttom: props.index === 1, darkbuttom: props.index === 2 }" @click="store.prevPage()">
        <el-icon :size="20">
          <CaretLeft />
        </el-icon>
      </el-button>
      <div class="progress-visualizer" :class="{ warmbar: props.index === 1, darkbar: props.index === 2 }">
        <el-text>{{ current_page }} / {{ total_page }}</el-text>
      </div>
      <el-button type="primary" class="right-button" :class="{ warmbuttom: props.index === 1, darkbuttom: props.index === 2 }" @click="store.nextPage()">
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
import { useWeaponStoreChartStore } from '@/stores/WeaponStoreChart';
import { useFinalBossChartStore } from '@/stores/FinalBossChart';
import { storeToRefs } from 'pinia';
import { MdPreview } from 'md-editor-v3';
import { weaponStoreContent } from '@/courses/weaponStoreChart';
import { finalBossContent } from '@/courses/finalBossChart';

const props = defineProps({
  index: Number,
});

const store = props.index === 1 ? useWeaponStoreChartStore() : useFinalBossChartStore();
const content = props.index === 1 ? weaponStoreContent : finalBossContent;

const { current_page, total_page, colorScheme } = storeToRefs(store);

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
  margin-top: 50px;
  padding: 10px 0px 0px 0px;
  border-radius: 5px;
}
.warmtheme {
  background-color: #fdf8ec;
  border: solid 10px #672917;
}
.darktheme {
  background-color: #ecf8fd;
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

.watmbuttom {
  background-color: #975538 !important;
}
.darkbuttom {
  background-color: #21242c !important;
}
.warmbar {
  background-color: #fff3d6;
}
.darkbar {
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
