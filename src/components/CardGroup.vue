<template>
  <div class="cards">
    <ElCard class="course-category" :header="category.name">
      <template v-for="(course, index) in category.courses">
        <ElDivider v-if="index > 0" />
        <div class="course-item">
          <span>{{ course.name }}</span>
          <el-button type="success" :icon="Promotion" @click="handleClick(course.id)" round>Go</el-button>
        </div>
        <template v-if="category.name === '知识点详解' && index === category.courses.length - 1">
          <ElDivider />
          <div class="course-item">
            <span>想学习更多知识点？点击“AI导师”问问吧~</span>
          </div>
        </template>
      </template>
    </ElCard>
  </div>
</template>

<script setup lang="ts" name="CardGroup">
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { ElMessageBox } from 'element-plus';
import { Promotion } from '@element-plus/icons-vue';
import { useAuthStore } from '@/stores/Auth';
import { useProgressStore } from '@/stores/Progress';
import type { CourseCategory } from '@/types/CourseTypes';

const { category } = defineProps<{
  category: CourseCategory;
}>();

const images = import.meta.glob('@/assets/course/*.png', { eager: true });
const thumbnails = Object.entries(images).reduce((acc, [path, module]) => {
  const name = path.match(/([^\/]+)\.png$/)![1];
  if (name) acc[name] = (module as any).default;
  return acc;
}, {} as { [courseId: string]: string });

const router = useRouter();
const { isAuthenticated, showLoginDialog } = storeToRefs(useAuthStore());
const { progress } = storeToRefs(useProgressStore());

async function handleClick(name: string) {
  if (!isAuthenticated.value) {
    try {
      await ElMessageBox.confirm('登录后可以享受完整高级功能（如AI导师、小练习等）。\n要现在登录或注册吗？', '用户未登录', {
        confirmButtonText: '好的',
        cancelButtonText: '稍后再说',
        type: 'info',
      });
      showLoginDialog.value = true;
      return;
    } catch (err) {}
  }
  router.push(`/course/${name}/${progress.value[name] ?? 0}`);
}
</script>

<style scoped>
.course-category {
  width: 100%;
}
.course-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 32px;
  padding: 0 8px;
}
.el-divider {
  margin: 12px 0;
}
</style>
