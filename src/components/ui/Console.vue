<template>
  <div class="console-render">
    <div class="title">操作记录</div>
    <el-scrollbar height="300px">
      <div class="info" v-for="item in consoleArray">{{ item }}<br /></div>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts" name="Console">
import { useConsole } from '@/stores/Console';
import { storeToRefs } from 'pinia';

const store = useConsole();
const { consoleArray } = storeToRefs(store);
</script>

<style scoped>
.console-render {
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.151);
  margin: 0px 80px;
  padding: 0;
  border-radius: 5px;
  height: 40%;
  transition: all 0.3s ease;
}
.console-render:hover {
  box-shadow: 0 0 20px rgba(33, 150, 243, 0.8);
  transform: scale(1.01);
}
.title {
  color: white;
  background-color: #409eff;
  width: 100%;
  height: 30px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  text-align: center;
  padding: 5px 0px 0px 0px;
  user-select: none;
}
.info {
  background-color: rgb(216.8, 235.6, 255);
  line-height: 2;
  border-radius: 10px;
  padding: 5px;
  margin: 10px;
  font-size: 15px;
  line-height: 1.5;
}
</style>
