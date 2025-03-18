<template>
  <div class="console-render">
    <div class="title">操作记录</div>
    <el-scrollbar height="300px">
      <el-text v-for="item in consoleArray">{{ item }}<br/></el-text>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts" name="Console">
import { useConsole } from '@/store/Console';
import { storeToRefs } from 'pinia';

const store = useConsole();
const { consoleArray } = storeToRefs(store)
</script>

<style scoped>
.console-render{
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.151);
  padding: 0;
  border-radius: 5px;
  height: 40%;
}
.title{
  color: white;
  background-color: #409EFF;
  width: 100%;
  height: 30px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  text-align: center;
  padding: 5px 0px 0px 0px;
  user-select: none;
}
.el-text{
  font-size: 15px;
  line-height: 1.5;
}
</style>
