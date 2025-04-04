import { useBubbleSortStore } from './BubbleSort';
import { useSelectSortStore } from './SelectSort';
import { useIfStore } from './If';
import { useForStore } from './For';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { CourseName, CourseMeta } from '@/types/CoursesNameType';

/**
 * 这是所有课程内容的管理文件
 * 通过控制current_course来利用current_store返回正确的课程的store
 * 并且集成了页码切换，方便外部控制
 *
 * 若要添加课程，先增加上方CourseName类型中的课程名，后在stores中加入如下格式：
 * [Courses中的课程名]： use....Store();
 * 即可
 *
 * courseMeta：课程的额外信息，比如名字（title），路径（path）等
 * 考虑向meta中加入图片路径，直接将多种元素与课程本身绑定
 *
 * 如何在外部使用？
 * const store = useCourseStoreManager();
 * store.selectCourse([coursename])；实现切换课程
 * const { current_store, current_page, total_page} = storeToRefs(store);
 * 获得必要的显示元素
 */

export const useCourseStoreManager = defineStore('CourseStore', {
  state: () => ({
    //所有课程的集合
    course: {
      bubble: useBubbleSortStore(),
      select: useSelectSortStore(),
      if: useIfStore(),
      for: useForStore(),
    },
    courseMeta: {
      bubble: {
        title: '冒泡排序算法',
        diff: 'normal',
      },
      select: {
        title: '选择排序算法',
        diff: 'normal',
      },
      if: {
        title: 'if判断语句',
        diff: 'basic',
      },
      for: {
        title: 'for循环',
        diff: 'basic',
      },
    } as Record<CourseName, CourseMeta>,
    currentCourse: ref<CourseName>('bubble'),
  }),
  getters: {
    currentStore: (state) => {
      return state.course[state.currentCourse];
    },
    totalPage: (state) => {
      return Object.keys(state.course[state.currentCourse].content).length;
    },
    courseList: (state) => {
      return Object.entries(state.courseMeta).map(([name, meta]) => ({
        name: name as CourseName,
        title: meta.title,
        diff: meta.diff,
      }));
    },
    allCoursesProgress(): { name: String; percent: number }[] {
      return Object.entries(this.course).map(([courseName, store]) => {
        const total = store.map.length;
        const solved = store.map.filter((p) => p.solved).length;
        return {
          name: this.courseMeta[courseName as CourseName].title,
          percent: total === 0 ? 0 : Math.round((solved / total) * 100),
        };
      });
    },
  },
  actions: {
    //切换课程
    selectCourse(course: CourseName) {
      this.currentCourse = course;
    },
    //页码合法检测
    isAvailblePage(page: number): boolean {
      return page >= 1 && page <= this.totalPage;
    },
    //完成练习标记
    markAsSolved(page: number) {
      const target = this.currentStore.map.find((item) => item.page === page);
      if (target) {
        target.solved = true;
      }
    },
    //是否有练习？是否完成练习？
    isPracticeSolved(page: number) {
      const target = this.currentStore.map.find((item) => item.page === page);
      return !target || target.solved ? true : false;
    },
    //是否完成整章练习
    isFullySolved() {
      return this.currentStore.map.every((item) => item.solved);
    },
    //完成百分比(%)
    isSolvedPercent() {
      const solvedCount = this.currentStore.map.filter((item) => item.solved).length;
      const totalCount = this.currentStore.map.length;
      return Math.round((solvedCount / totalCount) * 100);
    },
  },
});
