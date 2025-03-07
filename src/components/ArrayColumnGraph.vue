<template>
  <div class="array_render_monitor">
    <canvas ref="graph" :width="graph_width_px" :height="graph_height_px"
      style="flex: auto;display: block;"></canvas>
  </div>
</template>

<script setup lang="ts" name="ArrayColumnGraph">
import { type array_list,color } from '@/types';
import { computed, onMounted, ref } from 'vue';

//柱图对象
class Column{
  ctx: CanvasRenderingContext2D;
  x: number
  y: number
  height: number
  width: number

  constructor(ctx: CanvasRenderingContext2D, x: number, y: number, height: number, width:number) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
  }

  //清除
  clear() {
    this.ctx.clearRect(this.x-1, this.y-1, this.width+2, this.height);
  }

  //渲染
  render() {
    this.ctx.fillStyle = color.deault_color;
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  //高亮
  highlight() {
    this.ctx.fillStyle = color.highlight_color_1;
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
  }

}

//画布大小
const graph_width = 300;
const graph_height = 300;
const graph_border = 20;
const graph_width_px = computed(() => {
  return graph_width + 'px';
})
const graph_height_px = computed(() => {
  return graph_height + 'px';
})

//数组导入
const props = withDefaults(defineProps<{ array: array_list }>(), {
  array: () => [
    { index: 1, value: 1 },
    { index: 2, value: 2 },
    { index: 3, value: 3 },
    { index: 4, value: 4 },
    { index: 5, value: 5 },
    { index: 6, value: 6 },
    { index: 7, value: 7 },
    { index: 8, value: 8 },
  ]
})
const array_size: number = props.array.length;
var max_value = props.array[0].value;
for (var i = 0; i < array_size; i++){
  max_value = Math.max(max_value, props.array[i].value);
}

//数据计算
const unit_width = computed<number>(() => {
  return (graph_width - 2 * graph_border) / array_size ;
})
const column_width = computed(() => {
  return unit_width.value * 0.8;
})
const graph_scale = computed(() => {
  return (graph_height - 3 * graph_border) / max_value;
})

//创建一个graph，用于存储ref标记内容，即获取canvas元素
const graph = ref<HTMLCanvasElement>();

//初始化column数组
let column_array:Column[] = [];

//初始化柱状图
const initColumnGraph = () => {
  //获取Context2D
  if (!graph.value) return console.error("Cannot get Canvas element!");
  const canvas = graph.value;
  const ctx = canvas.getContext("2d");
  if (!ctx) return console.error("Cannot get CanvasRenderingContext2D");

  //创建对象
  let start_x = graph_border;
  for (let i = 0; i < array_size; i++){
    let column_value = props.array[i].value * graph_scale.value;
    let start_y = graph_height - graph_border - column_value;
    let column: Column = new Column(ctx, start_x, start_y, column_value, column_width.value);
    column_array.push(column);
    column.render();
    start_x = start_x + unit_width.value;
  }
}

//交换
const swapColumn = (a: number, b: number) => {
  if (a < 0 || a >= column_array.length || b < 0 || b >= column_array.length) {
    return console.error("Array index out of bounds:swapColumn()");
  }
  //擦除原来的
  column_array[a].clear();
  column_array[b].clear();
  //交换height
  const height = column_array[a].height;
  column_array[a].height = column_array[b].height;
  column_array[b].height = height;
  //交换y
  const y = column_array[a].y;
  column_array[a].y = column_array[b].y;
  column_array[b].y = y;
  //渲染
  column_array[a].render();
  column_array[b].render();
}

var inputValue = 0;
var last_inputValue = -1;

function highlight() {
  if (last_inputValue != -1) {
    column_array[last_inputValue].render();
  }
  column_array[inputValue].highlight();
  last_inputValue = inputValue;
}

//挂载完毕  生命周期钩子函数
onMounted(() => {
  initColumnGraph();
})

</script>

<style scoped>
.title{
  padding: 4px 6px;
  position: relative;
  left: 0px;
  top: 0px;
  float: left;
  font-size: 13px;
  font-weight: bold;
  color: #BBBBBB;
  background-color: #505050 ;
  display: block;
}
</style>
