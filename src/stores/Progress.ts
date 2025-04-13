import { defineStore } from 'pinia';
import { ref } from 'vue';
import { ElNotification } from 'element-plus';
import sendRequest from '@/utils/SendRequest';

export const useProgressStore = defineStore('Progress', {
  state: () => ({
    progress: ref<{ [courseName: string]: number }>({}),
  }),
  actions: {
    async setProgress(courseName: string, progress: number) {
      this.progress[courseName] = progress;
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
      this.progress = {};
    },
  },
});
