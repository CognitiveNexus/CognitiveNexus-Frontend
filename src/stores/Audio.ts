import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

export const useAudioStore = (name: string, volume: number = 1, loop: boolean = false) =>
  defineStore(`Audio-${name}`, () => {
    const audioEnabled = ref<boolean>(localStorage.getItem(`audioEnabled-${name}`) !== 'false');
    const nowPlaying = ref<string | null>(null);
    const audio = ref<HTMLAudioElement | null>(null);

    const tryAutoPlay = () => {
      audioEnabled.value = false;
      const interactionTypes = ['click', 'touchstart', 'keydown'];
      interactionTypes.forEach((type) => {
        document.addEventListener(
          type,
          () => {
            audioEnabled.value = true;
          },
          {
            once: true,
          }
        );
      });
    };

    watch(audioEnabled, (newValue) => {
      if (audio.value) {
        if (newValue) {
          audio.value.play().catch(tryAutoPlay);
        } else {
          audio.value.pause();
        }
      }
      localStorage.setItem(`audioEnabled-${name}`, newValue.toString());
    });

    watch(nowPlaying, (newValue) => {
      if (audio.value) {
        audio.value.pause();
        audio.value = null;
      }
      if (newValue) {
        audio.value = new Audio(`/audio/${newValue}.mp3`);
        audio.value.volume = volume;
        audio.value.loop = loop;
        if (audioEnabled.value) {
          audio.value.play().catch(tryAutoPlay);
        }
      }
    });

    return { audioEnabled, nowPlaying };
  })();
