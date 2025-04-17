import { defineStore, storeToRefs } from 'pinia';
import { ref } from 'vue';
import { ElNotification } from 'element-plus';
import { useAuthStore } from '@/stores/Auth';
import sendRequest from '@/utils/SendRequest';

export const useProgressStore = defineStore('Progress', {
  state: () => ({
    progress: ref<{ [courseName: string]: number }>({}),
  }),
  actions: {
    async setProgress(courseName: string, progress: number) {
      const { isAuthenticated } = storeToRefs(useAuthStore());
      this.progress[courseName] = progress;
      if (!isAuthenticated.value) return;
      try {
        const response = await sendRequest(true, `/api/progress/${courseName}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            progress: progress,
          }),
        });
        const result = await response.json();
        if (result.error) {
          throw new Error(result.error);
        }
      } catch (err) {}
    },
    async fetchProgress(): Promise<void> {
      const { isAuthenticated } = storeToRefs(useAuthStore());
      if (!isAuthenticated.value) return;
      try {
        const response = await sendRequest(true, '/api/progress/all');
        const result = await response.json();
        if (result.error) {
          throw new Error(result.error);
        }
        this.progress = result.progress;
      } catch (err) {
        ElNotification({
          title: '错误',
          message: `获取课程进度时发生错误：${(err as Error).message}`,
          type: 'error',
        });
      }
    },
    clearProgress() {
      const { isAuthenticated } = storeToRefs(useAuthStore());
      if (!isAuthenticated.value) return;
      this.progress = {};
    },
  },
});
