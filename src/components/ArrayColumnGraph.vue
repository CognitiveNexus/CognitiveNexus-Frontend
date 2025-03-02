<template>
  <div class="array_render_monitor">
    <span class="title">Array Monitor</span>
    <canvas class="graph " ref="graph" :width="graph_width_px" :height="graph_height_px"
      style="flex: auto;display: block;border: 1px solid black;"></canvas>
  </div>
  <input type="number" name="highlighter" placeholder="请输入高亮序号" v-model="inputValue">
  <button @click="highlight()">Click to highlight</button>
  <br>
  <input type="number" v-model="a">
  <input type="number" v-model="b">
  <button @click="swapColumn(a, b)">Click to swap</button>
</template>

<script setup lang="ts" name="ArrayColumnGraph">
import { type array_list } from '@/types';
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
    //console.log(this);
  }

  clear() {
    this.ctx.clearRect(this.x-1, this.y-1, this.width+2, this.height);
  }

  render() {
    this.ctx.fillStyle = "#34314C";
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
    //console.log("render called");
  }

  highlight() {
    this.ctx.fillStyle = "#47B8E0";
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
  array: () => [{ index: 1, value: 0 }]
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

//获取canvas元素
const graph = ref<HTMLCanvasElement>();

//初始化column数组
let column_array:Column[] = [];

//绘图
const initColumnGraph = () => {
  if (!graph.value) return console.error("Cannot get Canvas element!");
  const canvas = graph.value;
  const ctx = canvas.getContext("2d");
  if (!ctx) return console.error("Cannot get CanvasRenderingContext2D");
  var start_x = graph_border;
  for (var i = 0; i < array_size; i++){
    var column_value = props.array[i].value * graph_scale.value;
    var start_y = graph_height - graph_border - column_value;
    let column: Column = new Column(ctx, start_x, start_y, column_value, column_width.value);
    column_array.push(column);
    column.render();
    start_x = start_x + unit_width.value;
  }
  console.log(column_array);
}

//交换
let a = 0, b = 0;
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
  console.log("NEW");
  console.log(column_array);
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
