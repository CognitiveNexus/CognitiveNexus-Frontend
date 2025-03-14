<template>
  <el-aside width="200px">
    <el-scrollbar height="100%">
      <h3 class="menu-title">课程选择</h3>
      <el-menu class="el-menu-vertical" :router="true" :unique-opened="false">
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
    </el-scrollbar>
  </el-aside>
</template>

<script setup lang="ts" name="SideMenu">
//基础知识部分menu项目
const menuItemBasic = [
  { path: "/display/part1", name: "第一部分" },
  { path: "/display/part2", name: "第二部分" },
  { path: "/display/part3", name: "第三部分" }
]

//进阶知识部分menu项目
const menuItemAdvanced = [
  { path: "/display/part4", name: "第四部分" },
  { path: "/display/part5", name: "第五部分" },
  { path: "/display/part6", name: "第六部分" }
]

//较难知识部分menu项目
const menuItemMaster = [
  { path: "/display/part7", name: "第七部分" },
  { path: "/display/part8", name: "第八部分" },
  { path: "/display/part9", name: "第九部分" }
]
</script>

<style scoped>
.el-menu-vertical{
  overflow: hidden;
}
.menu-title {
  font-size: large;
  margin: 18px 10px;
}
</style>
