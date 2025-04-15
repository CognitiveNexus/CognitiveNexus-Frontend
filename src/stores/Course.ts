import { defineStore, storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import courses from '@/courses/index';
import { useProgressStore } from '@/stores/Progress';
import type { Course, CoursePage } from '@/types/CourseTypes';

export const useCourseStore = defineStore('Course', () => {
  const route = useRoute();
  const pageIndex = computed<number | null>(() => {
    const index = parseInt(route.params.pageIndex as string);
    return isNaN(index) ? null : Math.max(0, index - 1);
  });

  const courseName = computed<string | null>(() => (route.params.courseName as string | undefined) ?? null);
  const currentCourse = computed<Course | null>(() => (courseName.value ? courses[courseName.value] : null));
  const currentPage = computed<CoursePage | null>(() => (currentCourse.value && pageIndex.value !== null ? currentCourse.value.pages[pageIndex.value] : null));
  const currentChapter = computed<string | null>(() => (currentPage.value ? currentPage.value.chapter : null));

  const progressStore = useProgressStore();
  const { progress } = storeToRefs(progressStore);

  const currentProgress = computed<number | null>(() => (courseName.value ? progress.value[courseName.value] ?? 0 : null));
  const pageFinished = computed<boolean | null>(() =>
    currentProgress.value !== null && pageIndex.value !== null ? currentProgress.value - 1 >= pageIndex.value : null
  );

  return { courseName, pageIndex, currentCourse, currentPage, currentChapter, currentProgress, pageFinished };
});
