<template>
  <el-aside width="250px">
    <h3 class="menu-title">课程选择</h3>
    <el-menu 
      class="el-menu-vertical" 
      :router="true" 
      :unique-opened="false"
      :collapse="isCollapse"
      >
      <el-sub-menu index="1">
        <template #title>
          <span class="menu-text">
            <el-icon>
              <Compass />
            </el-icon>基础知识
          </span>
        </template>
        <el-menu-item v-for="item in menuItemBasic" :index="`${item.path}`">{{ item.name }}</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="2">
        <template #title>
          <span class="menu-text">
            <el-icon>
              <Notebook />
            </el-icon>进阶知识</span>
        </template>
        <el-menu-item v-for="item in menuItemAdvanced" :index="`${item.path}`">{{ item.name }}</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="3">
        <template #title>
          <span class="menu-text">
            <el-icon>
              <TrophyBase />
            </el-icon>较难知识
          </span>
        </template>
        <el-menu-item v-for="item in menuItemMaster" :index="`${item.path}`">{{ item.name }}</el-menu-item>
      </el-sub-menu>
    </el-menu>
  </el-aside>
</template>

<script setup lang="ts" name="SideMenu">
import { ref } from 'vue';
//基础知识部分menu项目
//注意！！！！el-menu的index采用的是绝对路径，不会继承父路由地址！！！
const menuItemBasic = [
  { path: "/course/bubble-sort", name: "冒泡排序" },
  { path: "/course/select-sort", name: "选择排序" },
  { path: "/course/part3", name: "第三部分" }
]

//进阶知识部分menu项目
const menuItemAdvanced = [
  { path: "part4", name: "第四部分" },
  { path: "part5", name: "第五部分" },
  { path: "part6", name: "第六部分" }
]

//较难知识部分menu项目
const menuItemMaster = [
  { path: "part7", name: "第七部分" },
  { path: "part8", name: "第八部分" },
  { path: "part9", name: "第九部分" }
]

const isCollapse = ref(false);
</script>

<style scoped>
.el-menu-vertical {
  overflow: hidden;
  height: calc(100vh-60px-50px);
}

.menu-title {
  font-size: large;
  margin: 18px 10px;
}

.el-aside {
  user-select: none;
  overflow: auto;
}
</style>
