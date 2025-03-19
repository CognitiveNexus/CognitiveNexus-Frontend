<template>
  <div class="reader-container">
    <button class="left" @click="store.prevPage()">
      <el-icon :size="40" color="gray"><ArrowLeft/></el-icon>
    </button>
    <div class="main-column">
      <el-scrollbar class="reader">
        <el-text 
          v-for="items in context" 
          v-show="items.page == current_page"
          :class=items.type
        >
          {{ items.value }}<br />
        </el-text>
      </el-scrollbar>
      <div class="page-counter">
        <el-text>{{ current_page }}/{{ total_page }}</el-text>
      </div>
    </div>
    <button class="right" @click="store.nextPage()">
      <el-icon :size="40" color="gray"><ArrowRight/></el-icon>
    </button>
  </div>
</template>

<script setup lang="ts" name="Reader">
import { useReader } from '@/store/Reader';
import { storeToRefs } from 'pinia';

const store = useReader();
const { context,current_page,total_page } = storeToRefs(store);

</script>

<style scoped>
button{
  margin: 0;
  padding: 0;
  border: none;
  background: none;
  transition: background-color 0.3s ease;
  background-color: white;
  min-width: 40px;
  width: 20%;
  max-width: 100px;
  height: 99%;
}
button:hover{
  background-color: rgb(245, 245, 245);
}
button:active{
  background-color: rgb(230, 230, 230);
}
.left{
  position: relative;
  left: 0;
  margin-right: 10px;
}
.right{
  position: relative;
  right: 0;
  margin-left: 10px;
}
.reader-container{
  position: relative;
  padding-top: 10px;
  display: flex;
  height: calc(100vh-120px);
  width: 100%;
  overflow: hidden;
}
.main-column{
  width: 100%;
  display: flex;
  flex-direction: column;
}
.main-column .reader{
  align-content: center;
}
.main-column .page-counter{
  display: flex;
  justify-content: center;
  text-align: center;
  margin-top: 10px;
  height: 30px;
}
.main-column .page-counter .el-text{
  background-color: rgb(240, 240, 240);
  margin-bottom: 15px;
  padding: 10px;
  border-radius: 5px;
}

/* 文字样式部分 */
.title{
  font-size: 40px;
  font-weight: 700;
  margin-bottom: 10px;
  line-height: 3.0;
  padding: 18px 0px;
  color: #3C3C43;
  border-bottom: 1px solid black;
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
