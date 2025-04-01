<template>
  <div class="main">
    <div class="bubble" v-if="current_course === 'bubble'">
      <EnterAnimation :src="magicbook" alt="魔法书" v-if="current_page === 1" />
      <EnterAnimation :src="parchment" alt="羊皮卷" v-if="current_page === 2" />
      <EnterAnimation :src="shields" alt="盾牌" v-if="current_page === 3 || current_page === 4" />
    </div>
  </div>
</template>

<script setup lang="ts" name="Animation">
import { useRoute } from 'vue-router';
import { ref, watch } from 'vue';
import parchment from '@/assets/animation/parchment.png';
import magicbook from '@/assets/animation/magicbook.png';
import shields from '@/assets/animation/shields.png';
import type { CourseName } from '@/types/CoursesNameType';

const route = useRoute();

const current_page = ref(parseInt(route.params.pageIndex as string, 10));
const current_course = ref(route.params.courseName as CourseName);

watch(
  () => route.params.pageIndex,
  () => {
    current_page.value = parseInt(route.params.pageIndex as string, 10);
  }
);
watch(
  () => route.params.courseName as CourseName,
  () => {
    current_course.value = route.params.courseName as CourseName;
  }
);
</script>

<style scoped>
.main {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
</style>
