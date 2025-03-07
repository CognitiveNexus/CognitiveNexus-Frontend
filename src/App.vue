<template>
  <el-container class="main-container">

    <el-header>
      <h2>CognitiveNexus</h2>
    </el-header>

    <el-container>

      <el-aside width="200px">
        <el-scrollbar height="700px">
          <h3 class="menu-title">课程选择</h3>
          <el-menu class="el-menu-vertical" :router="true" :unique-opened="true">
            <el-sub-menu index="1">
              <template #title>
                <span class="menu-text">
                  <el-icon>
                    <Compass />
                  </el-icon>基础知识
                </span>
              </template>
              <el-menu-item index="/array-column-graph">数组柱状图展示</el-menu-item>
              <el-menu-item index="/array-map-graph">数组方框图展示</el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="2">
              <template #title>
                <span class="menu-text"><el-icon>
                    <Notebook />
                  </el-icon>进阶知识</span>
              </template>
              <el-menu-item index="2-1">2-1</el-menu-item>
              <el-menu-item index="2-2">2-2</el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="3">
              <template #title>
                <span class="menu-text"><el-icon><TrophyBase /></el-icon>较难知识</span>
              </template>
              <el-menu-item index="3-1">3-1</el-menu-item>
              <el-menu-item index="3-2">3-2</el-menu-item>
            </el-sub-menu>
          </el-menu>
        </el-scrollbar>
      </el-aside>

      <el-main>
        <RouterView></RouterView>
      </el-main>

    </el-container>

  </el-container>
</template>

<script setup lang="ts" name="App">
import { RouterView, RouterLink } from 'vue-router';
</script>

<style scoped>
.main-container{
  font-family: Inter, 'Helvetica Neue', Helvetica, 'PingFang SC',
      'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
}

.el-aside{
  user-select: none;
}

.el-header{
  background-color: rgb(121.3, 187.1, 255);
  text-align: left;
}

.menu-title{
  font-size: large;
  margin: 18px 10px;
}

</style>