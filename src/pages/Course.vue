<template>
  <div class="course" v-loading="imageLoading">
    <div
      class="background-layer"
      v-for="image in [...new Set(backgroundImages.filter((image) => image))]"
      :key="image ?? 'blank'"
      :style="{
        backgroundImage: `url(${image})`,
        opacity: backgroundImages[pageIndex!] === image ? 1 : 0,
        zIndex: backgroundImages[pageIndex!] === image ? -1 : -2,
      }"></div>
    <div class="story-content-container">
      <PaginationControl :current="pageIndex" :total="currentCourse!.pages.length" class="pagination" @prev="gotoPage(-1, true)" @next="gotoPage(1, true)">
        <CourseContent class="story-content" :contents="currentPage!.contents" @goto="gotoPage" />
      </PaginationControl>
    </div>
    <div
      class="story-character"
      v-if="characterImages[pageIndex!]"
      :style="typeof currentPage!.character === 'string' || !currentPage!.character?.style ? {} : currentPage!.character.style"
      :key="pageIndex!">
      <BlurEntrance>
        <InfiniteMoving>
          <img :src="characterImages[pageIndex!]!" />
        </InfiniteMoving>
      </BlurEntrance>
    </div>
    <ColumnChart
      class="story-chart"
      v-if="currentPage?.columnChart"
      :useStore="currentPage.columnChart.store"
      :content="currentPage.columnChart.content"
      :theme="currentPage.columnChart.theme"
      :key="pageIndex!" />
    <component
      v-if="currentPage?.component"
      :is="currentPage?.component"
      v-bind="currentPage?.componentProps ?? {}"
      class="course-custom-component"
      :style="currentPage?.componentStyle ?? {}"
      @accomplished="updateProgress()" />
    <div v-if="currentPage?.codeJudge" class="practice-judger-container" :key="pageIndex!">
      <CodeJudger
        :tests="currentPage.codeJudge.judge"
        :generateTest="currentPage.codeJudge.randomJudge"
        :defaultCode="currentPage.codeJudge.defaultCode"
        :defaultLine="currentPage.codeJudge.defaultLine"
        @accomplished="updateProgress()" />
    </div>
  </div>
</template>

<script setup lang="ts" name="Course">
import { ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { ElMessageBox, ElNotification } from 'element-plus';

import ColumnChart from '@/components/visualize/ColumnChart.vue';
import { useCourseStore } from '@/stores/Course';
import { useProgressStore } from '@/stores/Progress';
import type { ImageConfig } from '@/types/CourseTypes';

const { courseName, pageIndex, currentCourse, currentPage, currentProgress, pageFinished } = storeToRefs(useCourseStore());

const router = useRouter();
const imageLoading = ref<boolean>(true);

const backgroundImages = ref<(string | null)[]>([]);
const characterImages = ref<(string | null)[]>([]);

const progressStore = useProgressStore();
const { setProgress } = progressStore;
const updateProgress = (page?: number) => {
  if (!page) page = pageIndex.value!;
  if (page + 1 >= currentProgress!.value!) {
    setProgress(courseName.value!, page + 1);
  }
};

const gotoPage = async (page: number, relative?: boolean) => {
  if (relative) page += pageIndex.value!;
  if (!pageFinished.value && page > pageIndex.value!) {
    try {
      await ElMessageBox.confirm('你还没有解决当前难题！确认前往下一步吗？', '确认前进', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      });
    } catch {
      return;
    }
  }

  if (currentCourse.value!.pages[page].type === 'story') {
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
  flex: 1;
  margin-right: 6vh;
}
.course-practice {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.75);
}
.practice-judger-container {
  flex: 1;
  height: 80vh;
  margin: 20px 48px 20px 0;
  border: solid 10px #672917;
  border-radius: 5px;
  background-color: #ffffff;
}
.course-custom-component {
  flex: 1;
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
