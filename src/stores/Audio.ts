import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

export const useAudioStore = defineStore('Audio', () => {
  const audioEnabled = ref<boolean>(true);
  const nowPlaying = ref<string | null>(null);
  const audio = ref<HTMLAudioElement | null>(null);

  watch(audioEnabled, (newValue) => {
    if (audio.value) {
      if (newValue) {
        audio.value.play();
      } else {
        audio.value.pause();
      }
    }
  });

  watch(nowPlaying, (newValue) => {
    if (audio.value) {
      audio.value.pause();
      audio.value = null;
    }
    if (newValue) {
      audio.value = new Audio(`/audio/${newValue}`);
      if (audioEnabled.value) {
        audio.value.play();
      }
    }
  });

  return { audioEnabled, nowPlaying };
});
