<template>
  <div class="main-container">
    <button class="left" @click="store.prevPage()">
      <el-icon :size="40" color="gray"><ArrowLeft/></el-icon>
    </button>
    <div class="main-column">
      <el-scrollbar class="reader-container">
        <div v-for="item in content_map[current_page]">
          <!-- 图片 -->
          <img v-if="item.type === 'image'" :src="item.src" :alt="item.alt" width="200px">
          <!-- 文本 -->
          <el-text v-else-if="item.type === 'text'" :class="item.class">{{ item.content }}</el-text>
          <!-- 链接 -->
          <a v-else-if="item.type === 'link'" :href="item.url">{{ item.text }}</a>
          <!-- 换行 -->
          <div v-else-if="item.type === 'break'"><br/></div>
        </div>
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
const { content_map, current_page, total_page } = storeToRefs(store);

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
.main-container{
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
.main-column .reader-container{
  padding: 0px 20px;
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
  width: auto;
  font-size: 40px;
  font-weight: 1000;
  margin-bottom: 10px;
  line-height: 3.0;
  padding: 18px 0px;
  border-bottom: 1px solid black;
  background-image: linear-gradient(90deg, #46a2ff,
          #9554ff);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
.content{
  font-size: 18px;
  font-weight: 500;
  line-height: 2.2;
  letter-spacing: 1px;
  color: #3C3C43;
}
.highlight{
  font-size: 18px;
  font-weight: 600;
  line-height: 2.2;
  letter-spacing: 1px;
  color: #3C3C43;
  background-color: #ECECEC;
}
.tips{
  font-size: 18px;
  font-weight: 500;
  line-height: 2.2;
  letter-spacing: 1px;
  color: #3C3C43;
  background-color: rgb(216.8, 235.6, 255);
}
.code{
  background-color: #F6F8FA;
}
</style>
