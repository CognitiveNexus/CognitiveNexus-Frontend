import { defineStore } from 'pinia';
import { ref, nextTick } from 'vue';

export const useLog = defineStore('Log', {
  //数据存储
  state: () => ({
    logArray: ref([] as string[]),
    scrollRef: ref(),
  }),
  actions: {
    pushString(newString: string) {
      this.logArray.push(newString);
    },
    popString() {
      this.logArray.splice(this.logArray.length - 1, 1);
    },
    bindScrollbar(el: any) {
      try {
        this.scrollRef = el;
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(`bindScrollbar: ${error.message}`);
        } else {
          throw new Error('bindScrollbar: An unknown error occurred');
        }
      }
    },
  },
});
