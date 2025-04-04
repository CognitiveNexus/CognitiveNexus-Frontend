<template>
  <div class="log-render">
    <div class="title">操作记录</div>
    <el-scrollbar height="300px" ref="scrollRef">
      <div class="info" v-for="item in logArray">{{ item }}<br /></div>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts" name="Log">
import { useLog } from '@/stores/Log';
import { storeToRefs } from 'pinia';
import { ref, nextTick, watch } from 'vue';
import type { ElScrollbar } from 'element-plus';

const store = useLog();
const { logArray } = storeToRefs(store);

const scrollRef = ref();

const scrollToBottom = async (force?: boolean) => {
  const wrap = scrollRef.value.wrapRef;
  const isAtBottom = wrap.scrollTop + wrap.clientHeight >= wrap.scrollHeight - 40;
  await nextTick();
  if (isAtBottom || force) {
    wrap.scrollTo({
      top: wrap.scrollHeight,
      behavior: 'smooth',
    });
  }
};

watch(
  () => logArray.value,
  () => {
    scrollToBottom();
  },
  { deep: true }
);
</script>

<style scoped>
.log-render {
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.151);
  padding: 0;
  border-radius: 5px;
  width: 50%;
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
