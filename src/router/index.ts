import { createRouter, createWebHistory } from 'vue-router';

import Home from '@/pages/Home.vue';
import Course from '@/pages/Course.vue';
import CourseSelection from '@/pages/CourseSelection.vue';
import Playground from '@/pages/Playground.vue';
import Profile from '@/pages/Profile.vue';

// 创建路由器
const router = createRouter({
  // 路由器工作模式
  history: createWebHistory(),
  // 路由器工作规则
  routes: [
    {
      // 选择课程页面
      name: 'select',
      path: '/course',
      component: CourseSelection,
    },
    // 课程部分地址配置
    {
      name: 'course',
      path: '/course/:courseName/:pageIndex(\\d+)',
      component: Course,
      props: true,
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
      name: 'profile',
      path: '/profile',
      component: Profile,
    },
    {
      path: '/',
      redirect: '/home',
    },
  ],
});

export default router;
