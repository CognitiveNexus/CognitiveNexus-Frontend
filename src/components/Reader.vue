<template>
  <div class="reader-container">
    <el-scrollbar class="reader">
      <el-text v-for="items in context" :class=items.type>{{ items.value }}<br /></el-text>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts" name="Reader">
import { useReader } from '@/store/Reader';
import { storeToRefs } from 'pinia';

const store = useReader();
const { context } = storeToRefs(store);
</script>

<style scoped>
.reader-container{
  padding: 30px 20%;
  height: 80vh;
  width: 100%;
  overflow: hidden;
}
.reader{
  display: flex;
  justify-content: center;
  align-content: center;
}
.title{
  font-size: 40px;
  font-weight: 700;
  margin-bottom: 10px;
  line-height: 3.0;
  color: #3C3C43;
}
.content{
  font-size: 18px;
  font-weight: 500;
  line-height: 2.2;
  color: #3C3C43;
}
.highlight{
  background-color: rgb(197.7, 225.9, 255);
  border-radius: 10px;
  padding: 15px 20px;
  font-size: 25px;
  font-weight: 600;
  line-height: 2.5;
  display: inline;
  color: #3C3C43;
}
</style>
