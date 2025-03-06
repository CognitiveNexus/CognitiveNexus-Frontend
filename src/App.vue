<template>
  <!-- 顶部 -->
  <div class="Header">
    <Header/>
    <Player/>
  </div>
  <!-- 导航区 -->
  <div class="navigate">
    <RouterLink to="/array_column_graph" active-class="mouse_hover">1</RouterLink>
    <RouterLink to="/array_map_graph" active-class="mouse_hover">2</RouterLink>
  </div>
  <!-- 展示区 -->
  <div class="Visualizer">
    <!-- <ArrayColumnGraph :array="array_list" /> -->
     <RouterView></RouterView>
  </div>
</template>

<script setup lang="ts" name="App">
import { RouterView, RouterLink } from 'vue-router';
import { type array_list } from '@/types';
import { reactive } from 'vue';
import ArrayColumnGraph from './components/ArrayColumnGraph.vue';
import Header from './components/Header.vue';
import Player from './components/Player.vue';

let array_list = reactive<array_list>([
  { index: 1, value: Math.ceil(Math.random() * 10) },
  { index: 2, value: Math.ceil(Math.random() * 10) },
  { index: 3, value: Math.ceil(Math.random() * 10) },
  { index: 4, value: Math.ceil(Math.random() * 10) },
  { index: 5, value: Math.ceil(Math.random() * 10) },
  { index: 6, value: Math.ceil(Math.random() * 10) },
  { index: 7, value: Math.ceil(Math.random() * 10) },
  { index: 8, value: Math.ceil(Math.random() * 10) },
  { index: 9, value: Math.ceil(Math.random() * 10) },
])
</script>

<style scoped>
.navifate{
  display: flex;
  flex-direction: column;
  background-color: #393939;
  height: 100%;
  width: 33%;
}

.navigate a{
  display: block;
  height: 40px;
  width: 60px;
  background-color: #2E2E2E;
  border: 1px  solid #BBBBBB;
  color: #BBBBBB;
  font-size: 15px;
  padding: 0px 5px;
  align-content: center;
}

.navigate a.mouse_hover{
  background-color: #252525;
}
</style>