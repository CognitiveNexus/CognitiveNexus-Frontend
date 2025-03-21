import { createRouter, createWebHistory } from 'vue-router'

import ColumnChart from '@/components/ColumnChart.vue';
import Home from '@/pages/Home.vue';
import Display from '@/pages/Display.vue';
import Reader from '@/components/Reader.vue';
import CodeEditor from '@/components/CodeEditor.vue';

//创建路由器
const router = createRouter({
    //路由器工作模式
    history: createWebHistory(),
    //路由器工作规则
    routes: [
      {
        name: "display",
        path: "/display",
        component: Display,
        children: [
          {
            path: "part1",
            components: {
              visualizer: ColumnChart,
              reader: Reader,
            }
          },
          {
            path: "part2",
            components: {
              visualizer: ColumnChart,
              reader: CodeEditor,
            }
          }
        ]
      },
      {
        name: "home",
        path: "/home",
        component: Home,
      },
      {
        path: "/",
        redirect: "/home",
      }
    ]
});

export default router;