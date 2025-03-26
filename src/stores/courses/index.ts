import { useBubbleSortStore } from './BubbleSort'
import { useSelectSortStore } from './SelectSort'
import { defineStore } from 'pinia'
import { ref } from 'vue'

type Courses = "bubble" | "select"

/**
 * 这是所有课程内容的管理文件
 * 通过控制current_course来利用current_store返回正确的课程的store
 * 并且集成了页码切换，方便外部控制
 * 
 * 若要添加课程，先增加上方Courses类型中的课程名，后在stores中加入如下格式：
 * [Courses中的课程名]： use....Store();
 * 即可
 * 
 * 如何在外部使用？
 * const store = useCourseStoreManager();
 * store.selectCourse([coursename])；实现切换课程
 * const { current_store, current_page, total_page} = storeToRefs(store);
 * 获得必要的显示元素
 */

export const useCourseStoreManager = defineStore("CourseStore", {
  state: () => ({
    //所有课程的集合
    stores : {
      bubble: useBubbleSortStore(),
      select: useSelectSortStore(),
    },
    current_course: ref<Courses>("bubble"),
    current_page: ref(1)
  }),
  getters: {
    current_store: (state) => {
      return state.stores[state.current_course];
    },
    total_page: (state) => {
      return Object.keys(state.stores[state.current_course].content).length;
    }
  },
  actions: {
    //切换课程并将页码调至1
    selectCourse(course: Courses) {
      this.current_course = course;
      this.current_page = 1;
    },
    //页码合法检测
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