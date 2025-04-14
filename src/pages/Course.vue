<template>
  <div class="course" v-loading="imageLoading">
    <div
      class="background-layer"
      v-for="image in [...new Set(backgroundImages.filter((image) => image))]"
      :key="image ?? 'blank'"
      :style="{
        backgroundImage: `url(${image})`,
        opacity: backgroundImages[pageIndex] === image ? 1 : 0,
        zIndex: backgroundImages[pageIndex] === image ? -1 : -2,
      }"></div>
    <template v-if="currentPage.type === 'story'">
      <div class="story-content-container">
        <PaginationControl :current="pageIndex" :total="currentCourse.pages.length" class="pagination" @prev="gotoPage(-1, true)" @next="gotoPage(1, true)">
          <CourseContent class="story-content" :contents="currentPage.contents" @goto="gotoPage" />
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
    </template>
    <div v-else class="course-practice">
      <div class="practice-content-container">
        <CourseContent class="practice-content" :contents="currentPage.contents" :solved="pageFinished" @goto="gotoPage" />
      </div>
      <div class="practice-judger-container">
        <CodeJudger
          :tests="currentPage.judge"
          :generateTests="currentPage.randomJudge"
          :defaultCode="currentPage.defaultCode"
          :defaultLine="currentPage.defaultLine"
          @accomplished="updateProgress()" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="Course">
import { computed, ref, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { ElNotification } from 'element-plus';

import ColumnChart from '@/components/visualize/ColumnChart.vue';
import courses from '@/courses/index';
import { useProgressStore } from '@/stores/Progress';
import type { ImageConfig } from '@/types/CourseTypes';

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
      if (!(field in page)) return null;
      const config: string | ImageConfig = page[field as keyof typeof page] as string | ImageConfig;
      if (!config) return null;

      try {
        const name = typeof config === 'string' ? config : config.name;
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
  flex: 1;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: relative;
  background-size: cover;
  background-repeat: no-repeat;
}
.story-character {
  height: 100%;
  width: 40%;
}
.story-content-container {
  padding: 8vh 12px 10vh;
  height: 90vh;
  width: 75vh;
  overflow: hidden;
  background-image: url(@/assets/img/page.png);
  background-repeat: no-repeat;
  background-size: 90%;
  background-position: center;
}
.story-chart {
  margin-right: 6vh;
}
.course-practice {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.75);
}
.practice-content-container {
  height: 92vh;
  width: 33%;
  padding: 20px;
}
.practice-judger-container {
  width: 67%;
  background-color: #ffffff;
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
.background-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  transition: opacity 0.5s ease;
  transition-delay: 0s;
  z-index: -2;
}
.background-layer[style*='opacity: 0'] {
  transition-delay: 0.5s;
}
</style>
