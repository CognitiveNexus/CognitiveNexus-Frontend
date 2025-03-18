<template>
  <el-header>
    <RouterLink to="/home" class="router-link-custom">
      <span class="title-name">思维脉络</span>
    </RouterLink>
    <div class="user-tool">
      <el-avatar></el-avatar>
    </div>
  </el-header>
</template>

<script setup lang="ts" name="Header">


</script>

<style scoped>
.el-header {
  border-bottom: 2px solid #DCDFE6;
  padding: 8px 30px;
  user-select: none;
  color: #409EFF;
  display: flex;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.151);
}
.el-button{
  margin-top: 5px;
  margin-left: 20px;
  border-radius: 50%;
  width: 30px;
  height: 30px;
}
.title-name {
  font-family: 'ChuangKeTieJin', sans-serif;
  font-size: 30px;
}
.user-tool{
  display: flex;
  margin-right: 0px;
  margin-left: auto;
}
</style>
