import { defineStore, storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import courses from '@/courses/index';
import { useProgressStore } from '@/stores/Progress';

export const useCourseStore = defineStore('Course', () => {
  const route = useRoute();
  const pageIndex = computed(() => Math.max(0, parseInt(route.params.pageIndex as string) - 1));

  const courseName = computed(() => route.params.courseName as string);
  const currentCourse = computed(() => courses[courseName.value]);
  const currentPage = computed(() => currentCourse.value.pages[pageIndex.value]);

  const progressStore = useProgressStore();
  const { progress } = storeToRefs(progressStore);

  const currentProgress = computed(() => progress.value[courseName.value] ?? 0);
  const pageFinished = computed(() => currentProgress.value - 1 >= pageIndex.value);

  return { courseName, pageIndex, currentCourse, currentPage, currentProgress, pageFinished };
});
