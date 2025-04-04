import { defineStore } from 'pinia';
import { ref, nextTick } from 'vue';

export const useLog = defineStore('Log', {
  //数据存储
  state: () => ({
    logArray: ref([] as string[]),
  }),
  actions: {
    pushString(newString: string) {
      this.logArray.push(newString);
    },
    popString() {
      this.logArray.splice(this.logArray.length - 1, 1);
    },
  },
});
