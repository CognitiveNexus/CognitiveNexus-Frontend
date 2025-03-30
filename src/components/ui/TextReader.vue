<template>
  <div class="main-container">
    <button class="fliper" @click="prevPage()" :disabled="current_page === 1">
      <el-icon :size="40" color="gray">
        <ArrowLeft />
      </el-icon>
    </button>
    <div class="main-column">
      <el-scrollbar class="reader-container" height="700px">
        <div v-for="item in current_store.content[current_page]">
          <!-- 图片 -->
          <img
            v-if="item.type === 'image'"
            :src="item.src"
            :alt="item.alt"
            :style="{
              width: item.width ? `${item.width}px` : 'auto',
              height: item.height ? `${item.height}px` : 'auto',
            }"
          />
          <!-- 文本 -->
          <el-text v-else-if="item.type === 'text'" :class="item.class">{{
            item.content
          }}</el-text>
          <!-- 链接 -->
          <a v-else-if="item.type === 'link'" :href="item.url">{{
            item.text
          }}</a>
          <!-- 换行 -->
          <div v-else-if="item.type === 'break'"><br /></div>
          <!-- Tag标签群， 一般用于表明前置知识点 -->
          <div v-else-if="item.type === 'tag'" class="tag">
            <el-text>前置知识点：</el-text>
            <el-tag
              v-for="tag in item.content"
              :type="tag.tagtype"
              :effect="tag.effect"
              :size="tag.size"
              >{{ tag.text }}</el-tag
            >
          </div>
          <!-- 跳跃到练习界面的按钮 -->
          <div class="warp-button" v-else-if="item.type === 'button'">
            <el-button
              :type="item.buttontype"
              :size="item.size"
              :icon="Flag"
              @click="toPractice(item.practiceIndex)"
              >{{ item.content }}
            </el-button>
          </div>
        </div>
      </el-scrollbar>
      <div class="page-counter">
        <el-text>{{ current_page }}/{{ total_page }}</el-text>
      </div>
    </div>
    <button
      class="fliper"
      @click="nextPage()"
      :disabled="current_page === store.total_page"
    >
      <el-icon :size="40" color="gray">
        <ArrowRight />
      </el-icon>
    </button>
  </div>
</template>

<script setup lang="ts" name="Reader">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import { useCourseStoreManager } from '@/stores/courses/index';
import { storeToRefs } from 'pinia';
import type { CourseName } from '@/types/CoursesNameType';
import { Flag } from '@element-plus/icons-vue';

const route = useRoute();
const router = useRouter();

const current_page = ref(parseInt(route.params.pageIndex as string, 10));
const store = useCourseStoreManager();
const { current_store, total_page } = storeToRefs(store);
const coursesName = ref(route.params.courseName as CourseName);

store.selectCourse(coursesName.value);

function nextPage() {
  if (!store.isAvailblePage(current_page.value + 1)) return;
  router.push({
    params: {
      courseName: coursesName.value,
      pageIndex: current_page.value + 1,
    },
  });
}

function prevPage() {
  if (!store.isAvailblePage(current_page.value - 1)) return;
  router.push({
    params: {
      courseName: coursesName.value,
      pageIndex: current_page.value - 1,
    },
  });
}

watch(
  () => route.params.pageIndex,
  () => {
    current_page.value = parseInt(route.params.pageIndex as string, 10);
  }
);

function toPractice(practiceIndex: number) {
  router.push({
    name: 'practice',
    params: {
      courseName: coursesName.value,
      practiceIndex: practiceIndex,
    },
  });
}
</script>

<style scoped>
.fliper {
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
.fliper:hover {
  background-color: rgb(245, 245, 245);
}
.fliper:active {
  background-color: rgb(230, 230, 230);
}
.left {
  position: relative;
  left: 0;
  margin-right: 10px;
}
.right {
  position: relative;
  right: 0;
  margin-left: 10px;
}
.main-container {
  position: relative;
  padding-top: 10px;
  display: flex;
  height: calc(100vh-120px);
  width: 100%;
  overflow: hidden;
}
.main-column {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.main-column .reader-container {
  padding: 0px 20px;
}
.main-column .page-counter {
  display: flex;
  justify-content: center;
  text-align: center;
  margin-top: 10px;
  height: 30px;
}
.main-column .page-counter .el-text {
  background-color: rgb(240, 240, 240);
  margin-bottom: 15px;
  padding: 10px;
  border-radius: 5px;
}

/* 文字样式部分 */
.title {
  width: auto;
  font-size: 40px;
  font-weight: 1000;
  margin-bottom: 10px;
  line-height: 3;
  padding: 18px 0px;
  border-bottom: 1px solid black;
  background-image: linear-gradient(90deg, #46a2ff, #9554ff);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
.content {
  font-size: 18px;
  font-weight: 500;
  line-height: 2.2;
  letter-spacing: 1px;
  color: #3c3c43;
}
.highlight {
  font-size: 18px;
  font-weight: 500;
  line-height: 2.2;
  letter-spacing: 1px;
  background-color: #ececec;
  color: black;
  padding: 3px;
}
.tips {
  font-size: 18px;
  font-weight: 500;
  line-height: 2.2;
  letter-spacing: 1px;
  color: #3c3c43;
  background-color: rgb(216.8, 235.6, 255);
}
.code {
  background-color: #f6f8fa;
}
.tag {
  gap: 10px;
  margin-bottom: 10px;
}
.el-tag {
  margin-right: 10px;
}
.warp-button {
  margin-top: 50px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
