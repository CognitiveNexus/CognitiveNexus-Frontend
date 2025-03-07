<template>
  <!-- 顶部 -->
  <div class="Header">
    <Header/>
    <Player/>
  </div>

  <div class="main_container">
    <!-- 导航区 -->
    <div class="navigate">
      <RouterLink to="/array_column_graph" active-class="mouse_hover">Para1</RouterLink>
      <RouterLink to="/array_map_graph" active-class="mouse_hover">Para2</RouterLink>
    </div>
    <!-- 展示区 -->
     <div class="visualizer">
        <RouterView></RouterView>
     </div>
   </div>

</template>

<script setup lang="ts" name="App">
import { RouterView, RouterLink } from 'vue-router';
import Header from './components/Header.vue';
import Player from './components/Player.vue';
</script>

<style scoped>
.main_container{
  display: flex;
  flex-direction: row;
}

.main_container .navigate{
  display: flex;
  flex-direction: column;
  background-color: #393939;
  height: 100%;
  width: 15%;
  user-select: none;
}

.main_container .navigate a{
  display: flex;
  height: 40px;
  width: 100%;
  background-color: #2E2E2E;
  color: #BBBBBB;
  font-size: 15px;
  align-items: center;
  justify-content: center;
  text-decoration: none;
}

.main_container .navigate a.mouse_hover{
  background-color: #252525;
}

.main_container .visualizer{
  display: flex;
  flex-direction: column;
  width: 55%;
}
</style>