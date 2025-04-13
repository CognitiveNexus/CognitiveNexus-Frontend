import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useFinalBossChartStore = defineStore('FinalBossChart', {
  //数据存储
  state: () => ({
    colorScheme: '#296D73',
    //默认数据组
    data: ref([
      [{ value: 7 }, { value: 4 }, { value: 1 }, { value: 4 }, { value: 5 }, { value: 9 }, { value: 2 }, { value: 8 }],
      [{ value: 4 }, { value: 1 }, { value: 4 }, { value: 5 }, { value: 7 }, { value: 2 }, { value: 8 }, { value: 9 }],
      [{ value: 4 }, { value: 1 }, { value: 4 }, { value: 5 }, { value: 7 }, { value: 2 }, { value: 8 }],
      [{ value: 1 }, { value: 4 }, { value: 4 }, { value: 5 }, { value: 2 }, { value: 7 }, { value: 8 }],
      [{ value: 1 }, { value: 4 }, { value: 4 }, { value: 5 }, { value: 2 }, { value: 7 }],
      [{ value: 1 }, { value: 4 }, { value: 4 }, { value: 2 }, { value: 5 }, { value: 7 }],
      [{ value: 1 }, { value: 4 }, { value: 4 }, { value: 2 }, { value: 5 }],
      [{ value: 1 }, { value: 4 }, { value: 2 }, { value: 4 }, { value: 5 }],
      [{ value: 1 }, { value: 4 }, { value: 2 }, { value: 4 }],
      [{ value: 1 }, { value: 2 }, { value: 4 }, { value: 4 }],
      [{ value: 1 }, { value: 2 }, { value: 4 }],
      [{ value: 1 }, { value: 2 }, { value: 4 }],
      [{ value: 1 }, { value: 2 }],
      [{ value: 1 }, { value: 2 }],
      [{ value: 1 }],
    ]),
    //默认操作组
    command: [],
    //动画页数控制
    current_page: ref(1),
  }),
  //计算属性
  getters: {
    total_page: (state) => {
      return state.data.length;
    },
    current_data: (state) => {
      return state.data[state.current_page - 1];
    },
  },
  //动作方法
  actions: {
    //数据合法性检测
    isAvailbleIndex(index: number): boolean {
      return index >= 0 && index <= this.data.length;
    },
    isAvailblePage(page: number): boolean {
      return page >= 1 && page <= this.total_page;
    },
    //交换
    swap(a: number, b: number) {
      if (this.isAvailbleIndex(a) && this.isAvailbleIndex(b)) {
        [this.data[a], this.data[b]] = [this.data[b], this.data[a]];
      }
    },
    //按钮响应
    nextPage() {
      if (this.isAvailblePage(this.current_page + 1)) {
        const command_index = this.current_page;
        const command = this.command[command_index];
        this.current_page++;
      }
    },
    prevPage() {
      if (this.isAvailblePage(this.current_page - 1)) {
        const command_index = this.current_page;
        const command = this.command[command_index - 1];
        this.current_page--;
      }
    },
  },
});
