import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useWeaponStoreChartStore = defineStore('WeaponStoreChart', {
  //数据存储
  state: () => ({
    colorScheme: '#75321E',
    //默认数据组
    data: ref([{ value: 7 }, { value: 4 }, { value: 1 }, { value: 4 }, { value: 5 }, { value: 9 }, { value: 2 }, { value: 8 }]),
    //默认操作组
    command: [
      { type: 'compare', index1: 0, index2: 1 },
      { type: 'swap', index1: 0, index2: 1 },
      { type: 'compare', index1: 1, index2: 2 },
      { type: 'swap', index1: 1, index2: 2 },
      { type: 'compare', index1: 2, index2: 3 },
      { type: 'swap', index1: 2, index2: 3 },
      { type: 'compare', index1: 3, index2: 4 },
      { type: 'swap', index1: 3, index2: 4 },
      { type: 'compare', index1: 4, index2: 5 },
      { type: 'compare', index1: 5, index2: 6 },
      { type: 'swap', index1: 5, index2: 6 },
      { type: 'compare', index1: 6, index2: 7 },
      { type: 'swap', index1: 6, index2: 7 },
    ],
    //动画页数控制
    current_page: ref(1),
  }),
  //计算属性
  getters: {
    total_page: (state) => {
      return state.command.length;
    },
    current_data: (state) => {
      return state.data;
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
        if (command.type == 'swap') {
          this.swap(command.index1, command.index2);
        }
        this.current_page++;
      }
    },
    prevPage() {
      if (this.isAvailblePage(this.current_page - 1)) {
        const command_index = this.current_page;
        const command = this.command[command_index - 1];
        if (command.type == 'swap') {
          this.swap(command.index1, command.index2);
        }
        this.current_page--;
      }
    },
  },
});
