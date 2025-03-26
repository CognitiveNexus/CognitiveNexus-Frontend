import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useConsole = defineStore("Console", {
  //数据存储
  state: () => ({
    consoleArray: ref([] as string[])
  }),
  actions: {
    pushString(newString: string) {
      this.consoleArray.push(newString)
    },
    popString() {
      this.consoleArray.splice(this.consoleArray.length-1, 1);
      console.log("popString called")
    }
  }
})