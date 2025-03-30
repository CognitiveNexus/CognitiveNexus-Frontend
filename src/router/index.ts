import { createRouter, createWebHistory } from 'vue-router';

import Home from '@/pages/Home.vue';
import Course from '@/pages/Course.vue';
import CourseSelection from '@/pages/CourseSelection.vue';
import Playground from '@/pages/Playground.vue';
import Practice from '@/pages/Practice.vue';

// 创建路由器
const router = createRouter({
  // 路由器工作模式
  history: createWebHistory(),
  // 路由器工作规则
  routes: [
    {
      //选择课程页面
      name: 'select',
      path: '/course',
      component: CourseSelection,
    },
    //课程部分地址配置
    {
      name: 'course',
      path: '/course/:courseName/:pageIndex(\\d+)',
      component: Course,
      props: true,
      meta: {
        requiresCourseData: true,
      },
    },
    {
      name: 'practice',
      path: '/course/:courseName/p/:practiceIndex',
      component: Practice,
      props: true,
      meta: {
        requiresCourseData: true,
      },
    },
    {
      // 主页重定向至/home，指向网页主页
      name: 'home',
      path: '/home',
      component: Home,
    },
    {
      name: 'playground',
      path: '/playground',
      component: Playground,
    },
    {
      path: '/',
      redirect: '/home',
    },
  ],
});

export default router;
