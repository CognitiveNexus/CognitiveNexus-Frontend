import { createRouter, createWebHistory } from 'vue-router'

import ColumnChart from '@/components/visualize/ColumnChart.vue';
import Home from '@/pages/Home.vue';
import Display from '@/pages/Display.vue';
import TextReader from '@/components/ui/TextReader.vue';
import CodeEditor from '@/components/CodeEditor.vue';
import Console from '@/components/ui/Console.vue';

//创建路由器
const router = createRouter({
    //路由器工作模式
    history: createWebHistory(),
    //路由器工作规则
    routes: [
      {
        //网页演示（课程）部分
        name: "display",
        path: "/display",
        component: Display,
        children: [
          {
            path: "part1",
            components: {
              visualizer: ColumnChart,
              console: Console,
              reader: TextReader,
            }
          },
          {
            path: "part2",
            components: {
              reader: CodeEditor,
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
        path: "/",
        redirect: "/home",
      }
    ]
});

export default router;