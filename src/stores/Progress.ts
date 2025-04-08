import { defineStore } from 'pinia';
import sendRequest from '@/utils/SendRequest';
import { ElNotification } from 'element-plus';

export const useProgressStore = defineStore('Progress', {
  state: () => ({}),
  actions: {
    async setProgress(courseName: string, progress: number): Promise<boolean> {
      const storedProgress = JSON.parse(sessionStorage.getItem('progress') ?? '{}');
      storedProgress[courseName] = progress;
      sessionStorage.setItem('progress', JSON.stringify(storedProgress));
      const result = await sendRequest(true, `/api/progress/${courseName}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          progress: progress,
        }),
      });
      const response = await result.json();
      return response.status === 200;
    },
    async getProgress(courseName: string): Promise<number> {
      const storedProgress = JSON.parse(sessionStorage.getItem('progress') ?? '{}');
      let progress = storedProgress[courseName];
      if (progress === undefined) {
        const response = await sendRequest(true, `/api/progress/${courseName}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const result = await response.json();
        if (result.status === 200) {
          progress = result.progress;
          storedProgress[courseName] = progress;
          sessionStorage.setItem('progress', JSON.stringify(storedProgress));
        } else {
          ElNotification({
            title: '获取进度失败',
            message: result.error,
            type: 'error',
          });
          progress = 0;
        }
      }
      return progress;
    },
  },
});
