import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/pages/Home.vue';
import Course from '@/pages/Course.vue';
import Default from '@/pages/courses/Default.vue';
import BubbleSort from '@/pages/courses/BubbleSort.vue';
import Practice from '@/pages/Practice.vue';

//创建路由器
const router = createRouter({
    //路由器工作模式
    history: createWebHistory(),
    //路由器工作规则
    routes: [
      {
        //网页演示（课程）部分
        name: "course",
        path: "/course",
        component: Course,
        children: [
          {
            path: "bubble-sort",
            component: BubbleSort, 
            meta: {
              store: 'BubbleSort'
            }
          },
          {
            path: "select-sort",
            component: Default,
            meta: {
              store: 'SelectSort'
            }
          }
        ]
      },
      {
        //主页重定向至/home，指向网页主页
        name: "home",
        path: "/home",
        component: Home,
      },
      {
        name: "practice",
        path: "/practice",
        component: Practice,
      },
      {
        path: "/",
        redirect: "/home",
      }
    ]
});

export default router;