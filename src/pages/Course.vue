<template>
  <el-container>
    <template v-if="currentPage.type === 'story'">
      <el-aside class="story-emblem-container">
        <Emblem :emblem="currentPage.emblem" />
      </el-aside>
      <el-divider direction="vertical" class="vertical-divider" />
      <el-main class="story-content-container">
        <PaginationControl :current="pageIndex" :total="currentCourse.pages.length" class="pagination" @prev="gotoPage(-1, true)" @next="gotoPage(1, true)">
          <CourseContent :contents="currentPage.contents" @goto="gotoPage" />
        </PaginationControl>
      </el-main>
    </template>
    <template v-else>
      <el-aside class="practice-content-container">
        <CourseContent :contents="currentPage.contents" :solved="pageFinished" @goto="gotoPage" />
      </el-aside>
      <el-divider direction="vertical" class="vertical-divider"></el-divider>
      <el-main class="practice-judger-container">
        <CodeJudger
          :tests="currentPage.judge"
          :generateTests="currentPage.randomJudge"
          :defaultCode="currentPage.defaultCode"
          :defaultLine="currentPage.defaultLine"
          @accomplished="updateProgress()" />
      </el-main>
    </template>
  </el-container>
</template>

<script setup lang="ts" name="Course">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import Emblem from '@/components/animation/Emblem.vue';
import courses from '@/courses/index';
import { useProgressStore } from '@/stores/Progress';

const route = useRoute();
const router = useRouter();
const pageIndex = computed(() => Math.max(0, parseInt(route.params.pageIndex as string) - 1));
const courseName = computed(() => route.params.courseName as string);

const currentCourse = computed(() => courses[courseName.value]);
const currentPage = computed(() => currentCourse.value.pages[pageIndex.value]);

const progressStore = useProgressStore();
const { setProgress } = progressStore;
const { progress } = storeToRefs(progressStore);

const currentProgress = computed(() => progress.value[courseName.value]);
const pageFinished = computed(() => currentProgress.value - 1 >= pageIndex.value);

const updateProgress = (page?: number) => {
  if (!page) page = pageIndex.value;
  if (currentProgress.value - 1 >= page) {
    setProgress(courseName.value, page);
  }
};

const gotoPage = (page: number, relative?: boolean) => {
  if (relative) page += pageIndex.value;
  if (currentCourse.value.pages[page].type === 'story') {
    updateProgress(page);
  }

  router.push({
    name: 'course',
    params: {
      courseName: courseName.value,
      pageIndex: page + 1,
    },
  });
};
</script>

<style scoped>
.story-content-container {
  padding: 0px;
  width: 70%;
  height: 99%;
  overflow: hidden;
}
.story-emblem-container {
  width: 30%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
.practice-content-container {
  height: 100%;
  width: 33%;
  padding: 20px;
}
.practice-judger-container {
  height: 100%;
  width: 67%;
}
.pagination {
  flex: 1;
  min-width: 30%;
  height: 100%;
  display: flex;
}
.vertical-divider {
  height: 100%;
}
</style>
