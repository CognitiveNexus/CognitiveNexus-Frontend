import { useBubbleSortStore } from './BubbleSort';
import { useSelectSortStore } from './SelectSort';
import { useIfStore } from './If';
import { useForStore } from './For';
import { useProgressStore } from '../Progress';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { CourseName, CourseMeta, CourseDiff, DiffProgress, DiffProgressDetail } from '@/types/CoursesNameType';

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
      const progress = useProgressStore();
      progress.setProgress(this.currentCourse, page);
    },
    //根据Course页数翻页判断，是否前方有未完成的练习
    isPracticeSolved(page: number) {
      const store = useProgressStore();
      const practiceForward = this.currentStore.map.find((p) => p.page === page) ?? -1;
      if (practiceForward === -1) {
        return true;
      }
      const progress = store.progress[this.currentCourse] ?? -1;
      return progress >= practiceForward.practice;
      // const target = this.currentStore.map.find((item) => item.page === page);
      // return !target || target.solved ? true : false;
    },
    //获取diff难度课程完成信息
    getDiffProgress(diff: CourseDiff): DiffProgress {
      const targetCourses = Object.entries(this.courseMeta)
        .filter(([_, meta]) => meta.diff === diff)
        .map(([name]) => name as CourseName);

      let total = 0;
      let solved = 0;
      let detail = [] as DiffProgressDetail[];

      targetCourses.forEach((coursename) => {
        const course = this.course[coursename];
        const courseMetaName = this.courseMeta[coursename].title;
        const courseTotal = course.map.length;
        const courseSolved = course.map.filter((p) => p.solved).length;
        total += courseTotal;
        solved += courseSolved;
        detail.push({
          name: courseMetaName,
          percent: courseTotal === 0 ? 0 : Math.round((courseSolved / courseTotal) * 100),
        });
      });

      const totalPercent = total === 0 ? 0 : Math.round((solved / total) * 100);
      return { diff, totalPercent, detail };
    },
  },
});
