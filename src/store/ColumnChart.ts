import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useColumnChartStore = defineStore("ColumnChart", {
  //数据存储
  state() {
    return {
      //默认数据组
      data: ref([
        { value: 7 },
        { value: 4 },
        { value: 1 },
        { value: 4 },
        { value: 5 },
        { value: 9 },
        { value: 2 },
        { value: 8 },
      ]),
      //默认操作组
      command: [
        { type: "swap", index1: 0, index2: 1 },
        { type: "swap", index1: 1, index2: 2 },
        { type: "swap", index1: 2, index2: 3 },
        { type: "swap", index1: 3, index2: 4 },
        { type: "swap", index1: 5, index2: 6 },
        { type: "swap", index1: 6, index2: 7 },
        { type: "swap", index1: 0, index2: 1 },
        { type: "swap", index1: 4, index2: 5 },
        { type: "swap", index1: 3, index2: 4 },
        { type: "swap", index1: 2, index2: 3 },
        { type: "swap", index1: 1, index2: 2 },
      ],
      //动画页数控制
      current_page: ref(1),
    }
  },
  //计算属性
  getters: {
    total_page: (state) => {
      return state.command.length + 1;
    }
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
    // 切换高亮
    highlight(index: number) {
      /*index--;
      if (isAvailbleIndex(index)) {
        colorScheme.value[index] == '#529B2E'
          ? colorScheme.value[index] = '#5470C6'
          : colorScheme.value[index] = '#529B2E'
        chartRef.value.setOption(option_column.value, {
          replaceMerge: ['series']
        })
      }*/
    },
    //按钮响应
    nextPage() {
      if (this.isAvailblePage(this.current_page + 1)) {
        const command_index = this.current_page - 1;
        const command = this.command[command_index];
        this.swap(command.index1, command.index2);
        this.current_page++;
      }
    },
    prevPage() {
      if (this.isAvailblePage(this.current_page - 1)) {
        const command_index = this.current_page - 1;
        const command = this.command[command_index - 1];
        this.swap(command.index1, command.index2);
        this.current_page--;
      }
    }
  }
})