import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCodeStore = defineStore('Code', {
  state: () => ({
    code: ref<string>(''),
  }),
  actions: {
    setCode(code: string) {
      this.code = code;
    },
    clearCode() {
      this.code = '';
    },
  },
});
