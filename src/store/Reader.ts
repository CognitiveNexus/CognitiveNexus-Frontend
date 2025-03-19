import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useReader = defineStore("Reader", {
  //数据存储
  state: () => ({
    context: [
      { page: 1,type: "title", value: "Bubble Sort" },
      { page: 1, type: "highlight", value:"冒泡排序（Bubble Sort）"},
      { page: 1, type: "content", value: `这是第一页` },
      { page: 2, type: "content", value: `这是第二页` },
      { page: 3, type: "content", value: `这是第三页` },
    ],
    current_page: ref(1),
    total_page: 3
  }),
  getters: {
  },
  actions: {
    isAvailblePage(page: number): boolean {
      return page >= 1 && page <= this.total_page;
    },
    //按钮响应
    nextPage() {
      if (this.isAvailblePage(this.current_page + 1)) {
        this.current_page++;
      }
    },
    prevPage() {
      if (this.isAvailblePage(this.current_page - 1)) {
        this.current_page--;
      }
    }
  }
})