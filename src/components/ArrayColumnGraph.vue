<template>
  <div class="array_render_monitor">
    <canvas ref="graph" :width="graph_width_px" :height="graph_height_px"
      style="flex: auto;display: block;"></canvas>
  </div>

  <button @click="change_color_to(0, Color.getHighlight())">change_color</button>
</template>

<script setup lang="ts" name="ArrayColumnGraph">
import { type array_list,color } from '@/types';
import { computed, onMounted, ref } from 'vue';

//颜色对象
class Color {
  r: number
  g: number
  b: number

  constructor(r: number, g: number, b: number) {
    this.r = r;
    this.g = g;
    this.b = b;
  }

  setDefault() {
    this.r = color.default_color_r;
    this.g = color.default_color_g;
    this.b = color.default_color_b;
  }

  setHighlight() {
    this.r = color.highlight_color_r;
    this.g = color.highlight_color_g;
    this.b = color.highlight_color_b;
  }

  setDim() {
    this.r = color.dim_color_r;
    this.g = color.dim_color_g;
    this.b = color.dim_color_b;
  }

  static getDefault() {
    const res = new Color(0, 0, 0);
    res.setDefault();
    return res;
  }

  static getHighlight() {
    const res = new Color(0, 0, 0);
    res.setHighlight();
    return res;
  }

  static getDim() {
    const res = new Color(0, 0, 0);
    res.setDim();
    return res;
  }

  static isSame(a: Color, b: Color): boolean{
    return a.r == b.r && a.g == b.g && a.b == b.b;
  }
}

//柱图对象
class Column{

  ctx: CanvasRenderingContext2D;
  x: number
  y: number
  height: number
  width: number
  color: Color

  constructor(ctx: CanvasRenderingContext2D, x: number, y: number, height: number, width:number) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
    this.color = Color.getDefault();
  }

  //清除
  clear() {
    this.ctx.clearRect(this.x-1, this.y-1, this.width+2, this.height);
  }

  //渲染
  render() {
    this.clear();
    this.ctx.fillStyle = `rgb(${this.color.r},${this.color.g},${this.color.b})`;
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
  return Math.round((graph_width - 2 * graph_border) / array_size) ;
})
const column_width = computed(() => {
  return Math.round(unit_width.value * 0.8);
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
    let column_value = Math.round(props.array[i].value * graph_scale.value);
    let start_y = graph_height - graph_border - column_value;
    let column: Column = new Column(ctx, start_x, start_y, column_value, column_width.value);
    column_array.push(column);
    column.render();
    start_x = start_x + unit_width.value;
  }
}

/* ==========================动画部分======================= */

//交换动画
const swapColumn = (a: number, b: number) => {
  if (a < 0 || a >= column_array.length || b < 0 || b >= column_array.length) {
    return console.error("Array index out of bounds:swapColumn()");
  }
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

//通用变色动画
let select_column: Column;
let start_color: Color;
let target_color: Color;

function change_color_to(a: number,color: Color) {
  select_column = column_array[a];
  start_color = select_column.color;
  target_color = color;
  requestAnimationFrame(change_color_animation);
}

function change_color_animation() {
  color_update();
  select_column.render();
  if (!Color.isSame(target_color, select_column.color)) {
    requestAnimationFrame(change_color_animation);
  }
}

function color_update() {
  select_column.color.r += (target_color.r - start_color.r) / 50;
  select_column.color.g += (target_color.g - start_color.g) / 50;
  select_column.color.b += (target_color.b - start_color.b) / 50;
}

//挂载完毕  生命周期钩子函数
onMounted(() => {
  initColumnGraph();
})

</script>

<style scoped>
canvas{
  transform: translateZ(0);
}
</style>
