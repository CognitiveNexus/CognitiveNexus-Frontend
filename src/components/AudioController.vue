<template>
  <ElButton @click="audioEnabled = !audioEnabled" class="audio-controller" :class="{ spinning: audioEnabled }" :icon="Headset" circle />
</template>

<script setup lang="ts">
import { watch } from 'vue';
import { storeToRefs } from 'pinia';
import { Headset } from '@element-plus/icons-vue';
import { useAudioStore } from '@/stores/Audio';
import { useCourseStore } from '@/stores/Course';

const { audioEnabled, nowPlaying } = storeToRefs(useAudioStore());
const { currentPage } = storeToRefs(useCourseStore());

watch(currentPage, (newPage) => {
  if (newPage) {
    nowPlaying.value = newPage.audio ?? null;
  }
});
</script>

<style scoped>
.audio-controller {
  position: absolute;
  top: 80px;
  right: 20px;
}

.spinning {
  animation: spin 2.5s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
