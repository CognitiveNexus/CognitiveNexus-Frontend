<template>
  <div class="course">
    <el-container class="course-main" v-loading="imageLoading">
      <template v-if="currentPage.type === 'story'">
        <el-main class="story-main-container" :style="{ backgroundImage: `url(${backgroundImages[pageIndex]})` }">
          <div class="story-content-container">
            <PaginationControl :current="pageIndex" :total="currentCourse.pages.length" class="pagination" @prev="gotoPage(-1, true)" @next="gotoPage(1, true)">
              <CourseContent :contents="currentPage.contents" @goto="gotoPage" />
            </PaginationControl>
          </div>
          <div
            class="story-character"
            v-if="characterImages[pageIndex]"
            :style="typeof currentPage.character === 'string' || !currentPage.character?.style ? {} : currentPage.character.style">
            <BlurEntrance>
              <InfiniteMoving>
                <img :src="characterImages[pageIndex]!" />
              </InfiniteMoving>
            </BlurEntrance>
          </div>
          <ColumnChart
            class="story-chart"
            v-if="currentPage?.columnChart"
            :useStore="currentPage.columnChart.store"
            :content="currentPage.columnChart.content"
            :theme="currentPage.columnChart.theme" />
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
    <div class="course-comments">
      <Comments :courseName="courseName" />
    </div>
  </div>
</template>

<script setup lang="ts" name="Course">
import { computed, ref, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { ElNotification } from 'element-plus';

import ColumnChart from '@/components/visualize/ColumnChart.vue';
import Comments from '@/components/Comments.vue';
import courses from '@/courses/index';
import { useProgressStore } from '@/stores/Progress';

const route = useRoute();
const router = useRouter();
const pageIndex = computed(() => Math.max(0, parseInt(route.params.pageIndex as string) - 1));
const courseName = computed(() => route.params.courseName as string);
const imageLoading = ref<boolean>(true);

const currentCourse = computed(() => courses[courseName.value]);
const currentPage = computed(() => currentCourse.value.pages[pageIndex.value]);

const backgroundImages = ref<(string | null)[]>([]);
const characterImages = ref<(string | null)[]>([]);

const progressStore = useProgressStore();
const { setProgress } = progressStore;
const { progress } = storeToRefs(progressStore);

const currentProgress = computed(() => progress.value[courseName.value] ?? 0);
const pageFinished = computed(() => currentProgress.value - 1 >= pageIndex.value);

const updateProgress = (page?: number) => {
  if (!page) page = pageIndex.value;
  if (page + 1 >= currentProgress.value) {
    setProgress(courseName.value, page + 1);
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

const loadImages = async (field: 'background' | 'character') => {
  const pages = currentCourse.value?.pages || [];
  return await Promise.all(
    pages.map(async (page) => {
      if (page.type !== 'story' || !page[field]) return null;

      try {
        const name = typeof page[field] === 'string' ? page[field] : page[field].name;
        const module = await import(`@/assets/${field}/${name}.png`);
        await preloadImage(module.default);
        return module.default;
      } catch (error) {
        ElNotification({
          title: '错误',
          message: (error as Error).message,
          type: 'error',
        });
        return null;
      }
    })
  );
};
const preloadImage = (src: string) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.onload = resolve;
    img.onerror = reject;
  });

watchEffect(async () => {
  const [bgResults, charResults] = await Promise.all([loadImages('background'), loadImages('character')]);

  backgroundImages.value = bgResults;
  characterImages.value = charResults;

  imageLoading.value = false;
});
</script>

<style scoped>
.course {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 100vh;
  width: 100%;
}
.course-main {
  flex: 1;
  min-height: calc(100vh - 60px);
}
.course-comments {
  width: 100%;
  border-top: 1px solid #e5e7eb;
}
.story-main-container {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  background-size: cover;
  background-repeat: no-repeat;
}
.story-character {
  height: 100%;
  width: 40%;
}
.story-content-container {
  padding-top: 30px;
  padding-right: 70px;
  width: 40%;
  height: 99%;
  overflow: hidden;
  background-image: url(@/assets/img/page.png);
  background-repeat: no-repeat;
  background-size: 90%;
}
.story-emblem-container {
  padding: 0px;
  width: 60%;
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
