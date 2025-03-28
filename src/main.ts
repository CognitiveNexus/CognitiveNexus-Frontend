import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import ECharts from 'vue-echarts';
import 'element-plus/dist/index.css';

// 全局引入ECharts，不建议，后面要改
// https://vue-echarts.dev/
// 精确import
import 'echarts';
import { createPinia } from 'pinia';

import '@/assets/css/reset-router-link.css';
import '@/assets/css/fonts.css';

import '@lumino/widgets/style/index.css';
import '@lumino/default-theme/style/index.css';

const app = createApp(App);
const pinia = createPinia();
app.use(router).use(pinia).component('v-chart', ECharts);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}
app.mount('#app');
