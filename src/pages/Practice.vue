<template>
  <el-container>
    <el-aside>
      <ContentRender :content="currentContent" @link="toCourse" />
    </el-aside>
    <el-divider direction="vertical"></el-divider>
    <el-main><CodeJudger :tests="currentJudge" :generateTests="currentRandomJudge" /></el-main>
  </el-container>
</template>

<script setup lang="ts" name="Practice">
import { useCourseStoreManager } from '@/stores/courses';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import type { CourseName } from '@/types/CoursesNameType';
import type { CodeTest } from '@/types/TextReaderTypes';

const route = useRoute();
const router = useRouter();

const currentPage = computed(() => {
  return parseInt(route.params.practiceIndex as string, 10);
});

const store = useCourseStoreManager();
const { currentStore } = storeToRefs(store);
const coursesName = computed(() => {
  return route.params.courseName as CourseName;
});
const currentContent = computed(() => currentStore.value.practice[currentPage.value] || []);
const currentJudge = computed(() => currentStore.value.judge[currentPage.value] || []);
const currentRandomJudge = computed(() => (currentStore.value.randomJudge as Record<number, () => CodeTest>)[currentPage.value] || []);

function toCourse(pageIndex: number) {
  if (pageIndex > currentPage.value) {
    store.markAsSolved(pageIndex - 1);
  }
  router.push({
    name: 'course',
    params: {
      courseName: coursesName.value,
      pageIndex: pageIndex,
    },
  });
}
store.selectCourse(coursesName.value);
</script>

<style scoped>
.el-container {
  height: 100%;
}
.el-divider {
  height: 100%;
}
.el-aside {
  height: 100%;
  width: 33%;
  padding: 20px;
}
.el-main {
  height: 100%;
  width: 67%;
}
</style>
