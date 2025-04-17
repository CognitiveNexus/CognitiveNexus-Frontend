import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

export const useAudioStore = defineStore('Audio', () => {
  const audioEnabled = ref<boolean>(localStorage.getItem('audioEnabled') !== 'false');
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
    localStorage.setItem('audioEnabled', newValue.toString());
  });

  watch(nowPlaying, (newValue) => {
    if (audio.value) {
      audio.value.pause();
      audio.value = null;
    }
    if (newValue) {
      audio.value = new Audio(`/audio/${newValue}.mp3`);
      if (audioEnabled.value) {
        audio.value.play();
      }
    }
  });

  return { audioEnabled, nowPlaying };
});
