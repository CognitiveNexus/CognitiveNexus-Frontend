<template>
  <el-menu
    :default-active="'1'"
    mode="horizontal"
    :router="true" 
  >
    <el-menu-item index="0">
      <span class="title">思维脉络</span>
    </el-menu-item>
    <el-menu-item index="/course">课程</el-menu-item>
    <el-menu-item index="/practice">练习场</el-menu-item>
  </el-menu>
</template>

<script setup lang="ts" name="AppHeader">

</script>

<style scoped>
.el-menu{
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.151);
}
.title {
  font-family: 'ChuangKeTieJin', sans-serif;
  font-size: 30px;
  /** 文字渐变实现 */
  background-image: linear-gradient(90deg, #60afff,
      #b180ff);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
