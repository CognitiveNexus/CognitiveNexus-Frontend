<template>
  <div class="audio-controller">
    <ElButton @click="narrationEnabled = !narrationEnabled" :class="{ spinning: narrationEnabled }" :icon="Headset" circle />
    <ElButton @click="bgmEnabled = !bgmEnabled" :class="{ spinning: bgmEnabled }" circle>
      <i class="el-icon">
        <svg t="1744894391248" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2529" width="200" height="200">
          <path
            d="M490.666667 117.333333a32 32 0 0 1 43.221333-29.952l272.128 102.016a138.666667 138.666667 0 0 1 90.026667 129.877334v139.434666a32 32 0 0 1-43.264 29.994667L554.666667 376.917333V746.666667a32.042667 32.042667 0 0 1-0.725334 6.826666c0.469333 4.736 0.725333 9.6 0.725334 14.506667 0 96.426667-97.109333 170.666667-213.333334 170.666667s-213.333333-74.24-213.333333-170.666667 97.109333-170.666667 213.333333-170.666667c57.685333 0 110.677333 18.304 149.418667 48.512L490.666667 117.333333zM341.333333 661.333333c-84.053333 0-149.333333 49.92-149.333333 106.666667s65.28 106.666667 149.333333 106.666667 149.333333-49.92 149.333334-106.666667-65.28-106.666667-149.333334-106.666667z m213.333334-497.834666v145.066666l277.333333 103.978667V319.274667a74.666667 74.666667 0 0 0-48.426667-69.930667L554.666667 163.498667z"></path>
        </svg>
      </i>
    </ElButton>
  </div>
</template>

<script setup lang="ts">
import { watchEffect } from 'vue';
import { storeToRefs } from 'pinia';
import { Headset } from '@element-plus/icons-vue';
import { useAudioStore } from '@/stores/Audio';
import { useCourseStore } from '@/stores/Course';

const { audioEnabled: narrationEnabled, nowPlaying: narrationPlaying } = storeToRefs(useAudioStore('narration'));
const { audioEnabled: bgmEnabled, nowPlaying: bgmPlaying } = storeToRefs(useAudioStore('bgm', 0.2, true));
const { courseName, currentPage } = storeToRefs(useCourseStore());

watchEffect(() => {
  if (currentPage.value && currentPage.value.narration) {
    narrationPlaying.value = `${courseName.value}/${currentPage.value.narration}`;
  } else {
    narrationPlaying.value = null;
  }
});
watchEffect(() => {
  if (currentPage.value && currentPage.value.bgm) {
    bgmPlaying.value = `${courseName.value}/${currentPage.value.bgm}`;
  } else {
    bgmPlaying.value = null;
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
