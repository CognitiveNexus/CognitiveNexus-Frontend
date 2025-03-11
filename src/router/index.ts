import { createRouter, createWebHistory } from 'vue-router'

import ArrayMapGraph from '@/components/ArrayMapGraph.vue';
import ArrayColumnGraph from '@/components/ArrayColumnGraph.vue';
import Temp from '@/components/Temp.vue';

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
        },
        {
            path: '/temp',
            component: Temp,
        }
    ]
});

export default router;