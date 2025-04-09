<template>
  <el-container>
    <el-aside>
      <ContentRender :content="currentContent" :solved="solved" @link="toCourse" />
    </el-aside>
    <el-divider direction="vertical"></el-divider>
    <el-main><CodeJudger :tests="currentJudge" :generateTests="currentRandomJudge" :defaultCode="defaultCode" @accomplished="handleAccomplished" /></el-main>
  </el-container>
</template>

<script setup lang="ts" name="Practice">
import { useCourseStoreManager } from '@/stores/courses';
import { useProgressStore } from '@/stores/Progress';
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
const progress = useProgressStore();
const { currentStore } = storeToRefs(store);
const coursesName = computed(() => {
  return route.params.courseName as CourseName;
});
const currentContent = computed(() => currentStore.value.practice[currentPage.value] || []);
const currentJudge = computed(() => currentStore.value.judge[currentPage.value] || []);
const currentRandomJudge = computed(() => (currentStore.value.randomJudge as Record<number, () => CodeTest>)[currentPage.value] || []);
const solved = computed(() => {
  const target = progress.progress[coursesName.value] ? progress.progress[coursesName.value] : 0;
  return target >= currentPage.value;
});
const defaultCode = currentStore.value.defaultCode[currentPage.value];

function toCourse(pageIndex: number) {
  const prevPageIndex = currentStore.value.map.find((p) => p.practice === currentPage.value)?.page;
  if (!prevPageIndex) {
    console.error(`${coursesName.value}: map not found`);
  }
  if (pageIndex > (prevPageIndex ?? -1)) {
    store.markAsSolved(currentPage.value);
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

function handleAccomplished() {
  store.markAsSolved(currentPage.value);
}
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
