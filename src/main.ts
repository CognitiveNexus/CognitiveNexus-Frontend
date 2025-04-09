import { createApp } from 'vue';
import { createPinia } from 'pinia';
import 'echarts'; // 全局引入ECharts，不建议，后面要改
import ECharts from 'vue-echarts';

import App from '@/App.vue';
import router from '@/router';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';

import 'element-plus/dist/index.css';
import 'md-editor-v3/lib/style.css';
import '@lumino/widgets/style/index.css';
import '@lumino/default-theme/style/index.css';

import '@/assets/css/reset-router-link.css';
import '@/assets/css/fonts.css';
import '@/assets/css/notification-keep-line-break.css';
import '@/assets/css/md-list-style.css';
import '@/assets/css/tailwind.css';

const app = createApp(App);
const pinia = createPinia();
app.use(router).use(pinia).component('v-chart', ECharts);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.mount('#app');
