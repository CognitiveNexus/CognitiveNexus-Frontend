<template>
  <el-carousel :autoplay="false" type="card" height="400px">
    <el-carousel-item v-for="item in items" :key="item.index">
      <img :src="item.path" alt="" style="width: 100%; height: 100%; object-fit: cover;">
    </el-carousel-item>
  </el-carousel>
</template>

<script setup lang="ts" name="Carousel">
import { getImage } from '@/utils';
import bubbleSort from '@/assets/carousel/bubble-sort.png'

const items = [
  { index: 1, path: bubbleSort },
  { index: 2, path: getImage("@/assets/carousel/bubble-sort.png") },
  { index: 3, path: getImage("@/assets/carousel/bubble-sort.png") },
  { index: 4, path: getImage("@/assets/carousel/bubble-sort.png") },
  { index: 5, path: getImage("@/assets/carousel/bubble-sort.png") },
  { index: 6, path: getImage("@/assets/carousel/bubble-sort.png") },
]
</script>

<style scoped>
.el-carousel{
  margin: 20px 10%;
}

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
