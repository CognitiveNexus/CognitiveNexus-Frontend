<template>
  <ContentRender :content="currentContent" @link="toCourse" />
</template>

<script setup lang="ts" name="PracticeReader">
import { useCourseStoreManager } from '@/stores/courses';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import type { CourseName } from '@/types/CoursesNameType';

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

<style scoped></style>
