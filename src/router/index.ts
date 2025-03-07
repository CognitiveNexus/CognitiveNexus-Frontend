import { createRouter, createWebHistory } from 'vue-router'

import ArrayColumnGraph from '@/components/ArrayColumnGraph.vue';
import ArrayMapGraph from '@/components/ArrayMapGraph.vue';

//创建路由器
const router = createRouter({
    //路由器工作模式
    history: createWebHistory(),
    //路由器工作规则
    routes: [
        {
            path:'/array-column-graph',
            component: ArrayColumnGraph,
        },
        {
            path: '/array-map-graph',
            component: ArrayMapGraph,
        }
    ]
});

export default router;