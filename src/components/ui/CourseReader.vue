<template>
  <PaginationControl :current="currentPage" :total="totalPage" @prev="prevPage" @next="nextPage">
    <ContentRender :content="currentContent" :practice="false" @link="toPractice" />
  </PaginationControl>
</template>

<script setup lang="ts" name="CourseReader">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import { useCourseStoreManager } from '@/stores/courses/index';
import { storeToRefs } from 'pinia';
import type { CourseName } from '@/types/CoursesNameType';

const route = useRoute();
const router = useRouter();

const store = useCourseStoreManager();

const currentPage = computed(() => {
  return parseInt(route.params.pageIndex as string, 10);
});

const { currentStore, totalPage } = storeToRefs(store);
const coursesName = computed(() => {
  return route.params.courseName as CourseName;
});
const currentContent = computed(() => currentStore.value.content[currentPage.value] || []);

store.selectCourse(coursesName.value);

function nextPage() {
  if (!store.isAvailblePage(currentPage.value + 1)) return;
  if (!store.isPracticeSolved(currentPage.value)) {
    console.log('not solved');
    return;
  }
  if (currentStore.value.map)
    router.push({
      params: {
        courseName: coursesName.value,
        pageIndex: currentPage.value + 1,
      },
    });
}

function prevPage() {
  if (!store.isAvailblePage(currentPage.value - 1)) return;
  router.push({
    params: {
      courseName: coursesName.value,
      pageIndex: currentPage.value - 1,
    },
  });
}

function toPractice(targetIndex: number) {
  router.push({
    name: 'practice',
    params: {
      courseName: coursesName.value,
      practiceIndex: targetIndex,
    },
  });
}
</script>

<style scoped></style>
